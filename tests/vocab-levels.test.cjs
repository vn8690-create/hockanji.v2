const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const nodes = new Map(), saved = new Map();
function node(id) {
    if (!nodes.has(id)) nodes.set(id, {value:'',innerHTML:'',textContent:'',disabled:false,
        style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},scrollIntoView(){}});
    return nodes.get(id);
}
let pending = null, fail = false;
const ctx = vm.createContext({console,
    localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,v)},
    document:{getElementById:node,querySelector:node,querySelectorAll:()=>[],addEventListener(){}},
    window:{addEventListener(){}},speechSynthesis:{getVoices:()=>[]},setTimeout,clearTimeout,
    fetch:async url=>{
        if (pending) return new Promise(resolve=>pending.push({url,resolve}));
        if (fail) return {ok:false};
        const file=url.split('/').pop().split('?')[0];
        return {ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'))};
    }
});
const run = s => vm.runInContext(s,ctx);
run(fs.readFileSync(path.join(root,'script.js'),'utf8'));
run("ChuyenTab = id => {globalThis.screen = id}; CongDiemXP = () => {};");
(async()=>{
    const counts={};
    for (const level of ['n5','n4','n3','n2','n1']) {
        node('n2-vocab-search').value='old filter';node('n2-vocab-status').value='mastered';
        await run(`MoKhoTuVungJLPT('${level}')`);
        const data=run('n2VocabData'); counts[level]=data.length;
        assert(data.length>=10);assert.equal(node('vocab-level-select').value,level);
        assert.equal(node('n2-vocab-search').value,'');assert.equal(node('n2-vocab-status').value,'all');
        assert.equal(node('vocab-level-title').textContent,`Kho từ vựng ${level.toUpperCase()}`);
        assert(!node('n2-vocab-list').innerHTML.includes('undefined'));
        run('DanhDauNhoTuVung(n2VocabData[0].id)');
        assert.equal(JSON.parse(saved.get(`${level}_vocab_mastered`)).length,1);
        data.forEach((item,index)=>{
            ctx.item=item;ctx.index=index;
            const q=run('TaoCauHoiTuVung(item,index)');
            assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
            assert(q.answer>=0&&q.answer<4);assert(q.prompt&&!q.prompt.includes('undefined'));
            if(!item.example&&!item.cloze) assert.notEqual(q.type,'context');
        });
    }
    // A slow earlier fetch must not replace the newly selected level.
    pending=[];
    const older=run("MoKhoTuVungJLPT('n5')");
    const newer=run("MoKhoTuVungJLPT('n1')");
    const respond=(i,file)=>pending[i].resolve({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'))});
    respond(1,'n1_moji_goi.json');await newer;
    respond(0,'n5_moji_goi.json');await older;
    assert.equal(run('vocabStudyLevel'),'n1');assert.equal(run('n2VocabData.length'),counts.n1);
    pending=null;fail=true;
    await run("MoKhoTuVungJLPT('n4')");
    assert.equal(run('n2VocabData.length'),0);
    assert(node('n2-vocab-list').innerHTML.includes('Thử lại'));
    fail=false;await run("MoKhoTuVungJLPT('n4')");
    assert.equal(run('n2VocabData.length'),counts.n4);
    run('MoMenuTuVung()');assert.equal(ctx.screen,'man-vocab-levels');
    console.log('PASS: five levels',counts,'; filters; isolated progress; four-option quizzes; missing examples; latest request wins; load failure/retry; menu navigation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
