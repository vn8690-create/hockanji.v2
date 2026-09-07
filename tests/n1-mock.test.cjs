// Run with: node tests/n1-mock.test.cjs (requires Playwright Chromium).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const bank = JSON.parse(fs.readFileSync(path.join(root, 'n1_mock_01.json'), 'utf8'));
const quotas = [6,7,6,6,10,5,4,4,9,3,2,4,2];
assert.deepEqual(bank.sections.map(s => s.groups.flatMap(g => g.questions).length), quotas);
const questions = bank.sections.flatMap(s => s.groups.flatMap(g => g.questions));
assert.equal(questions.length, 68);
assert.equal(new Set(questions.map(q => q[0])).size, 68);
questions.forEach(([q, opts, a, explanation]) => {
    assert(q && explanation); assert.equal(opts.length, 4);
    assert.equal(new Set(opts).size, 4); assert(Number.isInteger(a) && a >= 0 && a < 4);
});
// Independently reconstructed ★ orders, zero-based indices.
const orders = [[3,1,0,2],[1,2,3,0],[2,1,3,0],[2,3,1,0],[3,1,0,2]];
questions.slice(35,40).forEach((q,i) => {
    assert.equal(q[2], orders[i][2]);
    assert.equal((q[0].match(/＿＿＿/g) || []).length, 3);
    assert.equal((q[0].match(/★/g) || []).length, 1);
});
let browser;
const server = http.createServer((req,res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (rel === '/' ? '/index.html' : rel));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const type = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'}[path.extname(file)] || 'application/octet-stream';
    fs.readFile(file, (error, data) => {res.writeHead(error ? 404 : 200, {'Content-Type':type + '; charset=utf-8'});res.end(error ? '' : data);});
});
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({headless:true});
    const page = await browser.newPage({viewport:{width:390,height:844}});
    await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin);
    await page.evaluate(() => ChonCapDoTest('n1'));
    assert(await page.locator('#n5-mock-test-button').isVisible());
    assert.match(await page.locator('#n5-mock-test-button').textContent(), /N1 Beta 01/);
    await page.locator('#n5-mock-test-button').click();
    await page.waitForFunction(() => mangCauHoiTest.length === 68 && tongThoiGianTest === 6600);
    assert.equal(await page.locator('.n1-exam-review').count(), 0);
    assert.equal(await page.locator('#test-cau-hoi-text u').textContent(), '懸念');
    const before = await page.evaluate(() => mangCauHoiTest.map(q => [q.key, q.luaChon]));
    await page.locator('.nut-option-test').nth(0).click();
    await page.locator('.nut-option-test').nth(1).click();
    assert.equal(await page.evaluate(() => mangCauHoiTest[0].selectedAnswer), await page.locator('.nut-option-test').nth(1).innerText());
    assert.equal(await page.locator('.test-answer-explanation').count(), 0);
    await page.evaluate(() => { thoiGianTestConLai = 6512; TamDungThiThu(); });
    await page.reload();
    await page.evaluate(() => ChonCapDoTest('n1'));
    assert(await page.locator('#resume-mock-test-button').isVisible());
    await page.locator('#resume-mock-test-button').click();
    assert.deepEqual(await page.evaluate(() => mangCauHoiTest.map(q => [q.key,q.luaChon])), before);
    assert(await page.evaluate(() => thoiGianTestConLai <= 6512 && thoiGianTestConLai > 6505));
    assert.equal(await page.locator('.exam-selected-answer').count(), 1);
    const progress = await page.evaluate(() => {
        clearInterval(boDemDuongDuaTest);
        while(indexTestHienTai < 57) {
            const q = mangCauHoiTest[indexTestHienTai];
            const chosen = indexTestHienTai === 0 ? q.luaChon.find(x => x !== q.dung) : q.dung;
            const button = [...document.querySelectorAll('.nut-option-test')].find(b => b.innerText === chosen);
            KiemTraKetQuaTest(button, chosen, q.dung); CauTestTiepTheo();
        }
        return {index:indexTestHienTai, passage:mangCauHoiTest[indexTestHienTai].passageId};
    });
    assert.deepEqual(progress, {index:57,passage:'L01'});
    assert.equal(await page.locator('.n1-exam-passage').count(), 1);
    assert((await page.locator('.n1-exam-passage').textContent()).length > 1000);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({path:path.join(root,'tmp/n1-mock-mobile.png'),fullPage:true});
    await page.evaluate(() => {
        while(indexTestHienTai < mangCauHoiTest.length) {
            const q = mangCauHoiTest[indexTestHienTai];
            const button = [...document.querySelectorAll('.nut-option-test')].find(b => b.innerText === q.dung);
            KiemTraKetQuaTest(button,q.dung,q.dung); CauTestTiepTheo();
        }
    });
    assert.match(await page.locator('#test-cau-hoi-text').innerText(), /Đúng 67\/68/);
    assert.equal(await page.locator('.n1-exam-review > details').count(), 68);
    assert.equal(await page.evaluate(() => LayTienDoThiThu('n1')), null);
    assert.equal(await page.evaluate(() => LaySoCauSai('n1').length), 1);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('n1_test_stats'))['thi-thu'].attempts),1);
    await page.evaluate(() => BatDauThiThu('n1'));
    await page.evaluate(() => {thoiGianTestConLai=0; HetGioLamTest();});
    assert.equal(await page.locator('.n1-exam-review > details').count(),68);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('n1_test_stats'))['thi-thu'].attempts),2);
    assert.equal(await page.evaluate(() => LayTienDoThiThu('n1')),null);
    // Returning to other levels must restore their original button label.
    await page.evaluate(() => ChonCapDoTest('n4'));
    assert.equal(await page.locator('#n5-mock-test-button').textContent(),'🏁 Thi thử tổng hợp');
    // Repeated answer shuffles preserve the correct text, IDs, and passage order.
    await page.evaluate(bank => {
        const expected = bank.sections.flatMap(s=>s.groups.flatMap(g=>g.questions.map(q=>q[1][q[2]])));
        for(let round=0;round<100;round++) {
            const exam=TaoDeN1TuBoCoDinh(bank);
            if(exam.some((q,i)=>q.dung!==expected[i]||!q.luaChon.includes(q.dung))) throw Error('Answer remapping');
            if(new Set(exam.map(q=>q.key)).size!==68) throw Error('Duplicate IDs');
        }
        const broken=structuredClone(bank); broken.sections[0].groups[0].questions.pop();
        let rejected=false; try{TaoDeN1TuBoCoDinh(broken)}catch{rejected=true} if(!rejected)throw Error('Quota accepted');
    },bank);
    assert.deepEqual(errors,[]);
    console.log('PASS: 68 questions / 13 sections; ★ keys; 100 shuffles; mobile fit; change answer; reload/resume; 67/68 grading; mistakes; full Vietnamese review; timeout; N4 button regression.');
})().catch(e => {console.error(e);process.exitCode=1;}).finally(async () => {if(browser)await browser.close();server.close();});
