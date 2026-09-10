// No browser dependency: exercises the actual app code against a minimal DOM/storage adapter.
// This verifies state transitions, not visual layout. Browser QA: n1-mock.test.cjs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const source = fs.readFileSync(path.join(root,'script.js'),'utf8');
const setNumber = process.argv[2] || '01';
assert(['01','02','03','04','05'].includes(setNumber));
const banks = Object.fromEntries(['01','02','03','04','05'].map(n=>[n,JSON.parse(fs.readFileSync(path.join(root,`n1_mock_${n}.json`),'utf8'))]));
const bank = banks[setNumber];
const store = new Map();
const storage = {getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
const clean = x => JSON.parse(JSON.stringify(x));
function environment() {
    const nodes = new Map();
    function element() {
        const classes = new Set(); let html='';
        return {children:[],hidden:false,disabled:false,innerText:'',textContent:'',
            get innerHTML(){return html;},set innerHTML(value){html=value;this.children=[];},
            classList:{add:(...v)=>v.forEach(x=>classes.add(x)),remove:(...v)=>v.forEach(x=>classes.delete(x)),contains:v=>classes.has(v),toggle:v=>classes.has(v)?classes.delete(v):classes.add(v)},
            style:{setProperty(){}},setAttribute(){},closest(){return null;},appendChild(e){this.children.push(e);},
            insertAdjacentHTML(position,value){html+=value;}};
    }
    const get = id => {if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);};
    const document = {getElementById:get,createElement:element,addEventListener(){},querySelectorAll:selector=>selector==='.nut-option-test'?get('test-danh-sach-dap-an').children:[]};
    get('n1-exam-set').value=setNumber;
    const ctx = vm.createContext({console,localStorage:storage,document,window:{addEventListener(){}},speechSynthesis:{getVoices:()=>[]},setInterval:()=>1,clearInterval(){},setTimeout:()=>1,clearTimeout(){},confirm:()=>true,alert(){},fetch:async url=>{
        const requested = /n1_mock_(\d{2})\.json/.exec(url)?.[1];
        return {ok:!!banks[requested],json:async()=>clean(banks[requested])};
    }});
    vm.runInContext(source,ctx);
    return {run:code=>vm.runInContext(code,ctx),ctx,get};
}
(async()=>{
    assert.deepEqual(bank.sections.map(s=>s.groups.flatMap(g=>g.questions).length),[6,7,6,6,10,5,4,4,9,3,2,4,2]);
    const raw=bank.sections.flatMap(s=>s.groups.flatMap(g=>g.questions));
    assert.equal(raw.length,68);assert.equal(new Set(raw.map(q=>q[0])).size,68);
    const starOrders={
        '01':[[3,1,0,2],[1,2,3,0],[2,1,3,0],[2,3,1,0],[3,1,0,2]],
        '02':[[1,0,3,2],[1,3,2,0],[0,2,3,1],[3,2,1,0],[1,3,0,2]],
        '03':[[2,1,3,0],[2,3,0,1],[2,3,1,0],[3,1,0,2],[1,3,0,2]],
        '04':[[1,3,0,2],[1,2,0,3],[1,3,0,2],[3,1,0,2],[3,1,0,2]],
        '05':[[3,1,0,2],[3,1,0,2],[2,0,3,1],[2,0,1,3],[2,0,1,3]]
    }[setNumber];
    raw.slice(35,40).forEach((q,i)=>assert.equal(q[2],starOrders[i][2]));
    let env=environment();env.ctx.bank=bank;
    for(let round=0;round<100;round++){
        const qs=env.run('TaoDeN1TuBoCoDinh(bank)');
        assert.equal(qs.length,68);assert.equal(new Set(qs.map(q=>q.key)).size,68);
        qs.forEach((q,i)=>{assert.equal(q.dung,raw[i][1][raw[i][2]]);assert(q.luaChon.includes(q.dung));assert.equal(new Set(q.luaChon).size,4);});
        const mediumIds=bank.sections[8].groups.flatMap(g=>g.questions.map(()=>g.id));
        assert.deepEqual(clean(qs.slice(48,57).map(q=>q.passageId)),mediumIds);
        assert(qs.every(q=>q.key.startsWith(`n1-beta${setNumber}-q`)));
    }
    env.run("ChonCapDoTest('n1')");assert.equal(env.get('n5-mock-test-button').hidden,false);
    await env.run("BatDauThiThu('n1')");
    assert.equal(env.run('maDeThiThuHienTai'),bank.code);
    assert.equal(env.run('mangCauHoiTest.length'),68);assert.equal(env.run('tongThoiGianTest'),6600);
    assert.equal(env.run('HtmlLoiGiaiN1()'),'');
    env.run('KiemTraKetQuaTest(document.querySelectorAll(".nut-option-test")[0],mangCauHoiTest[0].luaChon[0],mangCauHoiTest[0].dung)');
    env.run('KiemTraKetQuaTest(document.querySelectorAll(".nut-option-test")[1],mangCauHoiTest[0].luaChon[1],mangCauHoiTest[0].dung)');
    assert.equal(env.run('mangCauHoiTest[0].selectedAnswer'),env.run('mangCauHoiTest[0].luaChon[1]'));
    const before=clean(env.run('mangCauHoiTest'));
    env.run('thoiGianTestConLai=6512;TamDungThiThu()');
    env=environment();env.run("ChonCapDoTest('n1');TiepTucThiThuDaLuu()");
    assert.deepEqual(clean(env.run('mangCauHoiTest')),before);
    assert.equal(env.run('thoiGianTestConLai'),6512);
    env.run(`while(indexTestHienTai<mangCauHoiTest.length){
        const q=mangCauHoiTest[indexTestHienTai];
        const answer=indexTestHienTai===0?q.luaChon.find(x=>x!==q.dung):q.dung;
        const button=document.querySelectorAll('.nut-option-test').find(b=>b.innerText===answer);
        KiemTraKetQuaTest(button,answer,q.dung);CauTestTiepTheo();
    }`);
    assert.equal(env.run('soCauDungTest'),67);
    assert.equal(env.run("LaySoCauSai('n1').length"),1);
    assert.equal(env.run("LayTienDoThiThu('n1')"),null);
    assert.match(env.get('test-cau-hoi-text').innerHTML,/Đúng 67\/68/);
    assert.equal((env.run('HtmlLoiGiaiN1()').match(/<summary>Câu /g)||[]).length,68);
    assert.equal(JSON.parse(storage.getItem('n1_test_stats'))['thi-thu'].attempts,1);
    await env.run("BatDauThiThu('n1')");
    assert.equal(env.run('HtmlLoiGiaiN1()'),'');
    env.run('thoiGianTestConLai=0;HetGioLamTest()');
    assert.equal(env.run('testDaHetGio'),true);
    assert.equal(env.run("LayTienDoThiThu('n1')"),null);
    assert.equal(JSON.parse(storage.getItem('n1_test_stats'))['thi-thu'].attempts,2);
    assert.match(env.get('test-cau-hoi-text').innerHTML,/Đúng 0\/68/);
    env.run("ChonCapDoTest('n4')");
    assert.equal(env.get('n5-mock-test-button').textContent,'🏁 Thi thử tổng hợp');
    const broken=clean(bank);broken.sections[0].groups[0].questions.pop();env.ctx.bank=broken;
    assert.throws(()=>env.run('TaoDeN1TuBoCoDinh(bank)'),/quota/);
    // All five sets use independent IDs and retain their own passage/question order.
    const ids=new Set();
    for(const current of Object.values(banks)){
        env.ctx.bank=current;
        for(const q of env.run('TaoDeN1TuBoCoDinh(bank)')) {assert(!ids.has(q.key));ids.add(q.key);}
    }
    assert.equal(ids.size,340);
    assert.equal(env.get('n1-exam-picker').hidden,true);
    console.log(`${bank.code} PASS: quota 68/13; five ★ keys; 100 answer shuffles; intact passages; correct selected set; answer changes; reload/resume; 67/68 grading; mistakes; review gating; expiry; N4 regression; invalid quota rejected; 340 distinct IDs.`);
    console.log('NOT RUN: real-browser layout tests (Chromium is unavailable).');
})().catch(e=>{console.error(e);process.exitCode=1;});
