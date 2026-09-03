// =========================================================================
// BIẾN TOÀN CỤC & TRẠNG THÁI APP
// =========================================================================
let diemXP = parseInt(localStorage.getItem('kanji_pure_xp')) || 0;
let duLieuHienTai = []; 
let indexHienTai = 0;   
let loaiHocHienTai = ''; 
let boDemStep2 = null; // Quản lý thời gian hiện Step 2
let boDemStep34 = null; // Quản lý thời gian hiện Step 3 & 4
let boDemTuDongChuyen = null; 

// Trạng thái cấu hình học tập
let hienThiYomi = true;
let tuDongChuyenBai = false;
let isMuted = false; 

// Biến phục vụ cho Đấu Trường Test
let capDoTestChon = '';     
let theLoaiTestChon = ''; 
let mangCauHoiTest = [];   
let indexTestHienTai = 0;
let daBamDapAn = false;
let tenFileHienTai = ''; 
let boDemDuongDuaTest = null;
let tongThoiGianTest = 0;
let thoiGianTestConLai = 0;
let testDaHetGio = false;
let soCauDungTest = 0;
let cheDoOnCauSai = false;
let cheDoThiThuChuan = false;
let maDeThiThuHienTai = '';
let lanLuuTienDoThiThu = 0;
const DINH_MUC_DE_N5 = {
    '文字・語彙｜問題1　漢字の読み方': 7,
    '文字・語彙｜問題2　漢字表記': 5,
    '文字・語彙｜問題3　文脈規定': 6,
    '文字・語彙｜問題4　言い換え類義': 3,
    '文法｜問題1　文の文法': 9,
    '文法｜問題2　文の組み立て': 4,
    '文法｜問題3　文章の文法': 4,
    '読解｜問題4　内容理解（短文）': 2,
    '読解｜問題5　内容理解（中文）': 2,
    '読解｜問題6　情報検索': 1
};
const DINH_MUC_DE_N4 = {
    '文字・語彙｜問題1　漢字の読み方': 7,
    '文字・語彙｜問題2　漢字表記': 5,
    '文字・語彙｜問題3　文脈規定': 8,
    '文字・語彙｜問題4　言い換え類義': 4,
    '文字・語彙｜問題5　用法': 4,
    '文法｜問題1　文の文法': 13,
    '文法｜問題2　文の組み立て': 4,
    '文法｜問題3　文章の文法': 4,
    '読解｜問題4　内容理解（短文）': 3,
    '読解｜問題5　内容理解（中文）': 3,
    '読解｜問題6　情報検索': 2
};
const DINH_MUC_DE_N3_A = {
    '文字・語彙｜問題1　漢字の読み方': 7,
    '文字・語彙｜問題2　漢字表記': 6,
    '文字・語彙｜問題3　文脈規定': 11,
    '文字・語彙｜問題4　言い換え類義': 5,
    '文字・語彙｜問題5　用法': 6,
    '文法｜問題1　文の文法': 13,
    '文法｜問題2　文の組み立て': 5,
    '文法｜問題3　文章の文法': 5,
    '読解｜問題4　内容理解（短文）': 4,
    '読解｜問題5　内容理解（中文）': 6,
    '読解｜問題6　内容理解（長文）': 4,
    '読解｜問題7　情報検索': 2
};
const DINH_MUC_DE_N3_B = {...DINH_MUC_DE_N3_A, '文字・語彙｜問題5　用法': 5};
const N3_MOJI_BANK = [
    ['情報','じょうほう','thông tin','必要な情報をインターネットで調べた。'],['現在','げんざい','hiện tại','兄は現在、海外で働いている。'],['丸い','まるい','tròn','丸いテーブルを窓の近くに置いた。'],['有名','ゆうめい','nổi tiếng','この町は古い寺で有名だ。'],['角','かど','góc','次の角を右に曲がってください。'],['包む','つつむ','gói','割れないように新聞紙で包んだ。'],['計算','けいさん','tính toán','旅行に必要なお金を計算した。'],
    ['記録','きろく','ghi chép','毎日の気温をノートに記録している。'],['広告','こうこく','quảng cáo','駅で新しい店の広告を見た。'],['冷える','ひえる','trở lạnh','夜になると急に空気が冷えた。'],['検査','けんさ','kiểm tra','病院で詳しい検査を受けた。'],['確か','たしか','chắc chắn','鍵をかけたかどうか確かめた。'],['絵画','かいが','hội họa','美術館で日本の絵画を見た。'],['資源','しげん','tài nguyên','限られた資源を大切に使う。'],
    ['悔しい','くやしい','tiếc, cay cú','一点差で負けてとても悔しかった。'],['予約','よやく','đặt trước','週末のホテルを予約した。'],['防ぐ','ふせぐ','phòng tránh','事故を防ぐために標識を増やした。'],['乾く','かわく','khô, khát','運動したのでのどが乾いた。'],['別々','べつべつ','riêng biệt','帰りは別々に家へ帰った。'],['相談','そうだん','trao đổi, tư vấn','進路について先生に相談した。'],['整理','せいり','sắp xếp','机の引き出しを整理した。'],
    ['交流','こうりゅう','giao lưu','地域の人との交流を深めたい。'],['諦める','あきらめる','từ bỏ','雨が強くなり、登山を諦めた。'],['参加','さんか','tham gia','来週の説明会に参加する。'],['盛ん','さかん','thịnh hành','この町では国際交流が盛んだ。'],['通過','つうか','đi qua','電車は小さな駅を通過した。'],['普段','ふだん','thường ngày','普段は自転車で会社へ行く。'],['短気','たんき','nóng tính','父は短気だが、すぐに謝る。'],
    ['詳しい','くわしい','chi tiết, am hiểu','詳しい説明を読んでから申し込んだ。'],['急激','きゅうげき','đột ngột','気温が急激に下がった。'],['積極的','せっきょくてき','tích cực','会議では積極的に意見を言う。'],['適切','てきせつ','thích hợp','状況に応じて適切に判断する。'],['確認','かくにん','xác nhận','出発前に時間を確認してください。'],['完成','かんせい','hoàn thành','新しい橋が来月完成する。'],['改善','かいぜん','cải thiện','働き方を改善する方法を考えた。'],
    ['影響','えいきょう','ảnh hưởng','睡眠不足は仕事に影響する。'],['増加','ぞうか','tăng lên','外国人の利用者が増加している。'],['減少','げんしょう','giảm xuống','この地域では人口が減少した。'],['原因','げんいん','nguyên nhân','事故の原因を詳しく調べる。'],['結果','けっか','kết quả','試験の結果は来週発表される。'],['提案','ていあん','đề xuất','会議で新しい計画を提案した。'],['協力','きょうりょく','hợp tác','町の人に調査への協力を頼んだ。'],
    ['責任','せきにん','trách nhiệm','自分の仕事に責任を持つ。'],['判断','はんだん','phán đoán','情報を集めてから判断した。'],['準備','じゅんび','chuẩn bị','発表の準備に二週間かかった。'],['経験','けいけん','kinh nghiệm','海外で働いた経験がある。'],['技術','ぎじゅつ','kỹ thuật','新しい技術を仕事に生かす。'],['環境','かんきょう','môi trường','子どもが学びやすい環境を作る。'],['制度','せいど','chế độ','会社は新しい休暇制度を始めた。']
];
const N3_SYNONYM_BANK = [
    ['普段','いつも'],['詳しい','細かい'],['急激','急に'],['確認する','確かめる'],['諦める','やめる'],
    ['適切','ふさわしい'],['増加する','増える'],['減少する','減る'],['提案する','案を出す'],['協力する','力を合わせる'],
    ['判断する','決める'],['完成する','出来上がる'],['参加する','加わる'],['改善する','よくする'],['有名','よく知られている']
];
const DINH_MUC_DE_N2 = {
    '文字・語彙｜問題1　漢字の読み方': 5,
    '文字・語彙｜問題2　漢字表記': 5,
    '文字・語彙｜問題3　語形成': 3,
    '文字・語彙｜問題4　文脈規定': 7,
    '文字・語彙｜問題5　言い換え類義': 5,
    '文字・語彙｜問題6　用法': 5,
    '文法｜問題7　文の文法': 12,
    '文法｜問題8　文の組み立て': 5,
    '文法｜問題9　文章の文法': 4,
    '読解｜問題10　内容理解（短文）': 5,
    '読解｜問題11　内容理解（中文）': 8,
    '読解｜問題12　統合理解': 2,
    '読解｜問題13　主張理解（長文）': 3,
    '読解｜問題14　情報検索': 2
};

// Trạng thái khu luyện viết Kanji
let kanjiDangLuyen = '';
let manHinhTruocLuyenViet = 'man-hoc-chi-tiet';
let cacNetDaViet = [];
let netDangViet = null;
let writingCanvas = null;
let writingCtx = null;
let strokePaths = [];
let strokeStep = 0;
let strokeAnimationTimer = null;
let cheDoThuThachViet = false;
let duLieuThuThachViet = [];
let mucThuThachHienTai = null;
let kanjiThuThachTruoc = '';
let daChamDiemThuThach = false;
let chuMauDaMo = false;
let soCauThiViet = 10;
let indexThiViet = 0;
let tongDiemThiViet = 0;
let soChuDatThiViet = 0;
let xpThiViet = 0;
let danhSachThiViet = [];
let capDoThiViet = 'n5';

// Đọc hiểu được tải theo từng level để không làm nặng lần mở app đầu tiên
let readingCache = {};
let readingLevel = 'n5';
let readingLesson = null;
let readingAnswered = new Set();
let avatarDangChon = '🦊';

// Kho 文字・語彙 N2 được tải riêng khi người học mở, không làm nặng trang đầu.
let n2VocabData = [];
let n2VocabSessionIds = null;
let n2VocabQuiz = [];
let n2VocabQuizIndex = 0;
let n2VocabQuizScore = 0;
let n2VocabQuizAnswered = false;
let vocabStudyLevel = 'n2';

function KhoaNgayHienTai(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function TaoIdHocVien() {
    const bytes = new Uint8Array(4);
    if (globalThis.crypto?.getRandomValues) crypto.getRandomValues(bytes);
    else bytes.forEach((_, i) => { bytes[i] = Math.floor(Math.random() * 256); });
    return `JLPT-${[...bytes].map(n => n.toString(16).padStart(2, '0')).join('').slice(0, 6).toUpperCase()}`;
}

function LayHoSoNguoiHoc() {
    try {
        const daLuu = JSON.parse(localStorage.getItem('jlpt_user_profile') || 'null');
        if (daLuu?.id) return daLuu;
    } catch {}
    const profile = { id: TaoIdHocVien(), nickname: 'Học viên JLPT', avatar: '🦊', publicNickname: false };
    localStorage.setItem('jlpt_user_profile', JSON.stringify(profile));
    return profile;
}

function LayNhiemVuHomNay() {
    const today = KhoaNgayHienTai();
    try {
        const state = JSON.parse(localStorage.getItem('jlpt_daily_mission') || 'null');
        if (state?.date === today) return state;
    } catch {}
    const state = { date: today, xp: 0, questions: 0, reviews: 0 };
    localStorage.setItem('jlpt_daily_mission', JSON.stringify(state));
    return state;
}

function GhiNhanHoatDong(type, amount = 1) {
    const state = LayNhiemVuHomNay();
    if (type === 'xp') state.xp += amount;
    if (type === 'questions') state.questions += amount;
    if (type === 'reviews') state.reviews += amount;
    localStorage.setItem('jlpt_daily_mission', JSON.stringify(state));

    const today = KhoaNgayHienTai();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    let streak = { lastDate: '', count: 0 };
    try { streak = JSON.parse(localStorage.getItem('jlpt_learning_streak') || 'null') || streak; } catch {}
    if (streak.lastDate !== today) {
        streak.count = streak.lastDate === KhoaNgayHienTai(yesterday) ? streak.count + 1 : 1;
        streak.lastDate = today;
        localStorage.setItem('jlpt_learning_streak', JSON.stringify(streak));
    }
    CapNhatNhiemVuHomNay();
}

function CapNhatNhiemVuHomNay() {
    const profile = LayHoSoNguoiHoc();
    const state = LayNhiemVuHomNay();
    let streak = { count: 0 };
    try { streak = JSON.parse(localStorage.getItem('jlpt_learning_streak') || 'null') || streak; } catch {}
    const soCauDenHan = ['n5', 'n4', 'n3', 'n2'].flatMap(level => LaySoCauSai(level)).filter(item => !item.nextReviewAt || item.nextReviewAt <= Date.now()).length;
    const mucOnSai = Math.min(3, soCauDenHan);
    const goals = [state.xp >= 30, state.questions >= 10, mucOnSai === 0 || state.reviews >= mucOnSai];
    const completed = goals.filter(Boolean).length;
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText('home-user-avatar', profile.avatar); setText('home-user-name', profile.nickname); setText('home-user-id', profile.id);
    setText('daily-streak', streak.count || 0); setText('daily-complete-count', `${completed}/3 hoàn thành`); setText('daily-percent', `${Math.round(completed / 3 * 100)}%`);
    setText('mission-xp-text', `${Math.min(state.xp, 30)}/30 XP`); setText('mission-question-text', `${Math.min(state.questions, 10)}/10 câu`);
    setText('mission-review-title', mucOnSai ? `Ôn lại ${mucOnSai} câu sai` : 'Giữ sạch sổ câu sai');
    setText('mission-review-text', mucOnSai ? `${Math.min(state.reviews, mucOnSai)}/${mucOnSai} câu` : 'Không có câu đến hạn');
    const bar = document.getElementById('daily-progress-bar'); if (bar) bar.style.width = `${completed / 3 * 100}%`;
    [['mission-xp-check', goals[0]], ['mission-question-check', goals[1]], ['mission-review-check', goals[2]]].forEach(([id, done]) => {
        const el = document.getElementById(id); if (!el) return; el.textContent = done ? '✓' : '○'; el.closest('div')?.classList.toggle('done', done);
    });
}

function MoHoSoNguoiHoc() {
    const profile = LayHoSoNguoiHoc(); avatarDangChon = profile.avatar;
    document.getElementById('profile-avatar-preview').textContent = profile.avatar;
    document.getElementById('profile-nickname').value = profile.nickname;
    document.getElementById('profile-id').value = profile.id;
    document.getElementById('profile-public-name').checked = !!profile.publicNickname;
    document.querySelectorAll('.avatar-picker button').forEach(button => button.classList.toggle('active', button.textContent === profile.avatar));
    ChuyenTab('man-profile');
}

function ChonAvatar(avatar, button) {
    avatarDangChon = avatar; document.getElementById('profile-avatar-preview').textContent = avatar;
    document.querySelectorAll('.avatar-picker button').forEach(item => item.classList.toggle('active', item === button));
}

function LuuHoSoNguoiHoc() {
    const old = LayHoSoNguoiHoc();
    const nickname = document.getElementById('profile-nickname').value.trim().slice(0, 18) || 'Học viên JLPT';
    const profile = { ...old, nickname, avatar: avatarDangChon, publicNickname: document.getElementById('profile-public-name').checked };
    localStorage.setItem('jlpt_user_profile', JSON.stringify(profile));
    CapNhatNhiemVuHomNay(); ChuyenTab('man-home');
}

// --- BIẾN PHỤC VỤ CHIA NGÀY HỌC DÙNG CHUNG ---
const WORDS_PER_DAY = 10;       // Mỗi ngày học 10 từ
let dangHocTheoNgay = false;   // Trạng thái kiểm tra có đang học theo ngày không
let duLieuCuaNgayHoc = [];     // Chứa mảng 10 từ sau khi cắt
let mảngDữLiệuGốcĐãTải = [];  // Lưu tạm dữ liệu sau khi fetch về để cắt mảng

// Kho từ nhiễu dự phòng chuẩn Nhật ngữ phòng khi file gốc quá ngắn
const KHO_NHIEU_DU_PHONG = ["上手", "下手", "元気", "安全", "水分", "時間", "先生", "学生", "会社"];

// Một số chữ thường xuất hiện chéo cấp độ. Phần còn lại được lấy tự động
// từ chính dữ liệu Kanji đang học nên không cần tải thêm tệp nặng.
const HAN_VIET_BO_SUNG = {
    地: 'ĐỊA', 鉄: 'THIẾT', 電: 'ĐIỆN', 車: 'XA', 学: 'HỌC', 校: 'HIỆU',
    生: 'SINH', 先: 'TIÊN', 会: 'HỘI', 社: 'XÃ', 時: 'THỜI', 間: 'GIAN',
    曜: 'DIỆU', 日: 'NHẬT', 月: 'NGUYỆT', 年: 'NIÊN', 国: 'QUỐC',
    語: 'NGỮ', 人: 'NHÂN', 大: 'ĐẠI', 小: 'TIỂU', 中: 'TRUNG',
    正: 'CHÍNH'
};
let BANG_HAN_VIET_TOAN_CUC = null;

function LayAmHanVietTuNghia(nghia = '') {
    const phanDau = nghia.split('(')[0].trim();
    const trongNgoac = nghia.match(/\(([^)]+)\)/)?.[1]?.trim() || '';
    const amHan = phanDau && phanDau === phanDau.toUpperCase() ? trongNgoac : phanDau;
    return amHan.split(/[,;\/]/)[0].trim().toUpperCase();
}

function TaoBangAmHanViet() {
    const bang = { ...HAN_VIET_BO_SUNG, ...(BANG_HAN_VIET_TOAN_CUC || {}) };
    const nguon = [...mảngDữLiệuGốcĐãTải, ...duLieuHienTai];
    nguon.forEach(item => {
        const chu = item.kanji || item.chu;
        if (chu?.length === 1) bang[chu] = (item.han_viet || LayAmHanVietTuNghia(item.meaning || item.nghia)).toUpperCase();
    });
    return bang;
}

async function NapBangHanVietToanCuc() {
    if (BANG_HAN_VIET_TOAN_CUC) return;
    try {
        const response = await fetch('./han_viet_map.json?v=1');
        if (!response.ok) throw new Error('Không tải được bảng Hán Việt');
        BANG_HAN_VIET_TOAN_CUC = { ...HAN_VIET_BO_SUNG, ...await response.json() };
    } catch (error) {
        BANG_HAN_VIET_TOAN_CUC = { ...HAN_VIET_BO_SUNG };
    }
}

function DinhDangTuGhep(viDu = '') {
    const bangAmHan = TaoBangAmHanViet();
    return viDu.split(/[,，、]/).map(muc => {
        const khop = muc.trim().match(/^([^\s(（]+)\s*[（(]?([^）)]*)[）)]?$/);
        if (!khop) return '';
        const tuNhat = khop[1];
        const nghia = khop[2] || '';
        let amTruoc = '';
        let thieuAmHan = false;
        const cacAmHan = [...tuNhat].map(chu => {
            if (chu === '々') return amTruoc;
            if (!/\p{Script=Han}/u.test(chu)) return '';
            const am = bangAmHan[chu] || '';
            if (!am) thieuAmHan = true;
            if (am) amTruoc = am;
            return am;
        }).filter(Boolean);
        // Không hiển thị một nửa âm Hán Việt vì dễ khiến người học hiểu sai.
        const amHan = thieuAmHan ? '' : cacAmHan.join(' ');
        return `<div class="compound-item"><b class="compound-kanji">${tuNhat}</b>${amHan ? `<strong>${amHan}</strong>` : ''}${nghia ? `<span>- ${nghia.toUpperCase()}</span>` : ''}</div>`;
    }).filter(Boolean).join('');
}

// =========================================================================
// ĐIỀU HƯỚNG MENU TAB
// =========================================================================
function ClearAllTimers() {
    clearTimeout(boDemStep2);
    clearTimeout(boDemStep34);
    clearTimeout(boDemTuDongChuyen);
    clearTimeout(strokeAnimationTimer);
    clearInterval(boDemDuongDuaTest);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function ChuyenTab(idManHinh) {
    const dangLamThiThu = document.getElementById('man-lam-bai-test')?.classList.contains('active');
    if (dangLamThiThu && idManHinh !== 'man-lam-bai-test' && cheDoThiThuChuan && !testDaHetGio) LuuTienDoThiThu();
    ClearAllTimers();

    document.querySelectorAll('.man-hinh').forEach(man => man.classList.remove('active'));
    const manChon = document.getElementById(idManHinh);
    if (manChon) manChon.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (idManHinh === 'man-home') document.getElementById('btn-nav-home')?.classList.add('active');
    if (['man-study-hub', 'man-n5-path', 'man-n4-path', 'man-kanji', 'man-grammar-levels', 'man-hinh-chon-ngay', 'man-hoc-chi-tiet', 'man-luyen-viet', 'man-writing-test-levels', 'man-writing-results', 'man-n2-vocab', 'man-n2-vocab-quiz'].includes(idManHinh)) document.getElementById('btn-nav-study')?.classList.add('active');
    if (idManHinh === 'man-test-levels') document.getElementById('btn-nav-test')?.classList.add('active');
    if (['man-reading-levels', 'man-reading-lessons', 'man-reading-detail'].includes(idManHinh)) document.getElementById('btn-nav-reading')?.classList.add('active');
}

function ChonCapDoTest(capDo) {
    capDoTestChon = capDo;
    const tieuDeLevel = document.getElementById('tieu-de-level-test');
    if (tieuDeLevel) tieuDeLevel.innerText = `ĐANG CHỌN: TEST ${capDo.toUpperCase()}`;
    const mockButton = document.getElementById('n5-mock-test-button');
    if (mockButton) mockButton.hidden = !['n5', 'n4', 'n3', 'n2'].includes(capDo);
    CapNhatNutTiepTucThi(capDo);
    ChuyenTab('man-test-the-loai');
}

function CapNhatCaiDatHoc() {
    const chkYomi = document.getElementById('chk-hien-yomi');
    const chkAuto = document.getElementById('chk-auto-next');
    
    if (chkYomi) hienThiYomi = chkYomi.checked;
    if (chkAuto) tuDongChuyenBai = chkAuto.checked;
    
    const step3 = document.getElementById('step-yomi') || document.getElementById('step-giai-thich');
    const step4 = document.getElementById('step-tu-ghep');
    
    if (step3) step3.style.setProperty('display', hienThiYomi ? 'block' : 'none', 'important');
    if (step4) step4.style.setProperty('display', hienThiYomi ? 'block' : 'none', 'important');

    if (!tuDongChuyenBai) {
        clearTimeout(boDemTuDongChuyen);
    }
}

function ThayDoiTrangThaiMute() {
    isMuted = !isMuted;
    const btnMute = document.getElementById('btn-mute-flashcard');
    if (btnMute) {
        if (isMuted) {
            ClearAllTimers();
            btnMute.innerHTML = "🔇 ĐANG TẮT TIẾNG";
            btnMute.style.borderColor = "#ef4444";
            btnMute.style.color = "#ef4444";
        } else {
            btnMute.innerHTML = "🔊 ĐANG BẬT TIẾNG";
            btnMute.style.borderColor = "#00ffcc";
            btnMute.style.color = "#00ffcc";
            ChayDongThoiGianFlashcard();
        }
    }
}

// =========================================================================
// HÀM MỞ MÀN HÌNH CHỌN NGÀY HỌC (DÙNG CHUNG CHO MỌI CẤP ĐỘ)
// =========================================================================
function MoChonNgay(capDo) {
    // Đổi tiêu đề hiển thị theo cấp độ (Ví dụ: CHỌN NGÀY HỌC N5)
    const txtTieuDe = document.getElementById('tieu-de-chon-ngay');
    if (txtTieuDe) txtTieuDe.innerText = `CHỌN NGÀY HỌC ${capDo.toUpperCase()}`;

    // Chuyển sang màn chọn ngày học
    ChuyenTab('man-hinh-chon-ngay');

    const vungChuaNut = document.getElementById('vung-chua-nut-ngay');
    if (!vungChuaNut) return;
    const nutThuThach = document.getElementById('btn-thu-thach-viet');
    if (nutThuThach) nutThuThach.hidden = capDo.toLowerCase() !== 'n5';
    vungChuaNut.innerHTML = `<div style="color:#00ffcc; grid-column: span 4;">⚡ Đang quét tệp dữ liệu cấp độ...</div>`;

    // Xác định đúng tên file json để tải về giống logic cũ của bro
    let tenFileJson = capDo.toLowerCase(); 

    // Tiến hành tải động file JSON về trước để đếm số lượng từ thực tế
    fetch(`./${tenFileJson}.json?v=${new Date().getTime()}`)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            mảngDữLiệuGốcĐãTải = data; // Lưu mảng gốc vào biến tạm
            if (capDo.toLowerCase() === 'n5') duLieuThuThachViet = data;
            
            const tongSoNgay = Math.ceil(mảngDữLiệuGốcĐãTải.length / WORDS_PER_DAY);
            vungChuaNut.innerHTML = ''; // Xóa chữ loading

            // Sinh nút ngày tự động dựa trên độ dài file JSON thật
            for (let i = 1; i <= tongSoNgay; i++) {
                const nutNgay = document.createElement('button');
                nutNgay.innerText = `Ngày ${i}`;
                nutNgay.style.cssText = `
                    padding: 12px 5px; 
                    background: rgba(0,255,204,0.1); 
                    color: #00ffcc; 
                    border: 1px solid #00ffcc; 
                    cursor: pointer; 
                    border-radius: 5px; 
                    font-weight: bold; 
                    text-shadow: 0 0 5px #00ffcc;
                    box-shadow: 0 0 8px rgba(0,255,204,0.2);
                    transition: all 0.2s;
                `;
                
                nutNgay.onmouseenter = () => { nutNgay.style.background = '#00ffcc'; nutNgay.style.color = '#000'; };
                nutNgay.onmouseleave = () => { nutNgay.style.background = 'rgba(0,255,204,0.1)'; nutNgay.style.color = '#00ffcc'; };
                
                // Sự kiện click học theo ngày
                nutNgay.addEventListener('click', () => {
                    const startIndex = (i - 1) * WORDS_PER_DAY;
                    const endIndex = startIndex + WORDS_PER_DAY;
                    
                    // Cắt lấy 10 từ tương ứng của ngày đó
                    duLieuCuaNgayHoc = mảngDữLiệuGốcĐãTải.slice(startIndex, endIndex);
                    dangHocTheoNgay = true; // Bật cờ đánh chặn học theo ngày
                    
                    // Gọi hàm nạp dữ liệu gốc của bro để khởi tạo màn hình flashcard học chi tiết
                    TaiDuLieuHoc('kanji', tenFileJson);
                    
                    // Đè tên tiêu đề hiển thị
                    setTimeout(() => {
                        const tieuDe = document.getElementById('tieu-de-bai-hoc');
                        if (tieuDe) tieuDe.innerText = `${capDo.toUpperCase()} - KANJI NGÀY ${i}`;
                    }, 150);
                });
                
                vungChuaNut.appendChild(nutNgay);
            }
        })
        .catch(() => {
            vungChuaNut.innerHTML = `<div style="color:#ef4444; grid-column: span 4;">❌ Lỗi: Không quét được file "${tenFileJson}.json"!</div>`;
        });
}

function ThoatHocChiTiet() {
    ClearAllTimers();
    dangHocTheoNgay = false; // Tắt trạng thái học theo ngày khi thoát ra ngoài
    if (loaiHocHienTai === 'grammar') {
        ChuyenTab('man-grammar-levels');
    } else {
        ChuyenTab('man-kanji');
    }
}

// =========================================================================
// TẢI DỮ LIỆU ĐỘNG CHO FLASHCARD HỌC
// =========================================================================
async function TaiDuLieuHoc(loaiHoc, tenFile) {
    loaiHocHienTai = loaiHoc;
    tenFileHienTai = tenFile; 
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (loaiHoc === 'grammar') {
        document.getElementById('btn-nav-study')?.classList.add('active');
    } else {
        document.getElementById('btn-nav-study')?.classList.add('active');
    }

    ChuyenTab('man-hoc-chi-tiet');
    
    const chkYomi = document.getElementById('chk-hien-yomi');
    const chkAuto = document.getElementById('chk-auto-next');
    if (chkYomi) chkYomi.checked = hienThiYomi;
    if (chkAuto) chkAuto.checked = tuDongChuyenBai;
    
    const tieuDe = document.getElementById('tieu-de-bai-hoc');
    const vungChua = document.getElementById('vung-chua-the-dong');
    const nutChuyen = document.getElementById('vung-nut-chuyen-trang');
    
    if (tieuDe) tieuDe.innerText = `ĐANG KẾT NỐI...`;
    if (vungChua) vungChua.innerHTML = `<div class="loading-text">⚡ Đang đồng bộ bộ não dữ liệu...</div>`;
    if (nutChuyen) nutChuyen.classList.add('an-giau');

    // Nạp một lần bảng Hán Việt của toàn bộ N5–N1. Nhờ vậy từ ghép vẫn đủ âm
    // khi một chữ thành phần không nằm trong riêng danh sách Kanji của cấp đang học.
    if (loaiHoc === 'kanji') await NapBangHanVietToanCuc();

    // --- LOGIC ĐÁNH CHẶN THÔNG MINH CHO HỌC THEO NGÀY ---
    if (dangHocTheoNgay) {
        duLieuHienTai = duLieuCuaNgayHoc; // Ép app lấy đúng 10 từ vừa cắt thay vì load toàn bộ file
        indexHienTai = 0; 
        ChayDongThoiGianFlashcard();
        return; // Thoát ra luôn, không chạy xuống đoạn fetch full file ở dưới nữa!
    }

    // Luồng học full toàn bộ file gốc như cũ của bro (không chia ngày)
    fetch(`./${tenFile}.json?v=${new Date().getTime()}`)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            duLieuHienTai = data; 
            let tienDoCu = parseInt(localStorage.getItem(`tien_do_${tenFileHienTai}`)) || 0;

            if (tienDoCu > 0 && tienDoCu < duLieuHienTai.length && vungChua && tieuDe) {
                vungChua.innerHTML = `
                    <div class="the-cyber-card" style="text-align: center; padding: 40px 20px;">
                        <h3 style="color: #00ffcc; margin-bottom: 20px; font-size: 1.4rem;">🎯 PHÁT HIỆN TIẾN ĐỘ CŨ</h3>
                        <p style="color: #cbd5e1; margin-bottom: 30px; font-size: 0.95rem; line-height: 1.6;">
                            Bro đang học dở ở từ thứ <strong>${tienDoCu + 1}</strong> của mục này.<br>
                            Bro muốn tiếp tục hành trình hay muốn cày lại từ đầu?
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <button class="nut-tiep-theo" style="background: linear-gradient(135deg, #00f5a0 0%, #00d9f6 100%); color: #000; font-weight: bold; width: 100%;" onclick="KichHoatTienDo(${tienDoCu})">
                                HỌC TIẾP TỪ THỨ ${tienDoCu + 1} ➡️
                            </button>
                            <button class="nut-quay-lai" style="border: 1px solid #ef4444; color: #ef4444; width: 100%; margin: 0; background: rgba(239, 68, 68, 0.05);" onclick="KichHoatTienDo(0)">
                                🔄 HỌC LẠI TỪ ĐẦU
                            </button>
                        </div>
                    </div>
                `;
                tieuDe.innerText = "LỰA CHỌN TIẾN ĐỘ";
            } else {
                indexHienTai = 0; 
                ChayDongThoiGianFlashcard();
            }
        })
        .catch(() => {
            if (tieuDe) tieuDe.innerText = "LỖI DATA";
            if (vungChua) vungChua.innerHTML = `<p class="bao-loi">❌ Không tải được file "${tenFile}.json". Bro check lại file nhé!</p>`;
        });
}

function KichHoatTienDo(indexChon) {
    indexHienTai = indexChon;
    ChayDongThoiGianFlashcard();
}

// =========================================================================
// HÀM CHẠY DÒNG THỜI GIAN FLASHCARD & HIỂN THỊ NỘI DUNG
// =========================================================================
function ChayDongThoiGianFlashcard() {
    const vungChua = document.getElementById('vung-chua-the-dong');
    const tieuDe = document.getElementById('tieu-de-bai-hoc');
    const nutChuyen = document.getElementById('vung-nut-chuyen-trang');

    if (duLieuHienTai.length === 0 || indexHienTai >= duLieuHienTai.length) {
        if (tieuDe) tieuDe.innerText = "HOÀN THÀNH!";
        if (vungChua) {
            vungChua.innerHTML = `
                <div class="loading-text" style="color: #00ffcc; text-align:center;">
                    🎉 Chúc mừng đặc vụ đã hoàn thành trọn vẹn danh mục này!
                    <br><br>
                    <button class="nut-quay-lai" style="border: 1px solid #00ffcc; color: #00ffcc; margin-top:20px; background: rgba(0, 255, 204, 0.05);" onclick="ResetToanBoTienDoFile()">
                        🔄 RESET HỌC LẠI TỪ ĐẦU
                    </button>
                </div>
            `;
        }
        if (nutChuyen) nutChuyen.classList.add('an-giau');
        localStorage.setItem(`tien_do_${tenFileHienTai}`, 0);
        return;
    }

    // Nếu học theo tiến độ ngày thì không lưu đè tiến độ tổng để tránh lỗi
    if (!dangHocTheoNgay) {
        localStorage.setItem(`tien_do_${tenFileHienTai}`, indexHienTai);
    }

    if (tieuDe) tieuDe.innerText = `TIẾN ĐỘ: ${indexHienTai + 1} / ${duLieuHienTai.length}`;
    if (nutChuyen) nutChuyen.classList.add('an-giau');
    
    ClearAllTimers(); 

    const item = duLieuHienTai[indexHienTai];
    let styleAnYomi = hienThiYomi ? "" : "display: none !important;";

    // 1️⃣ XỬ LÝ MÀN HÌNH HỌC KANJI
    if (loaiHocHienTai === 'kanji') {
        const chuKanji = item.kanji || item.chu || "字";
        const nghiaGoc = item.meaning || item.nghia || "";
        const onyomi = item.onyomi || "Không có âm On thông dụng";
        const kunyomi = item.kunyomi || "Không có âm Kun thông dụng";
        const viDu = item.example || item.vi_du || "Chưa có ví dụ";

        let amHanViet = "Chưa rõ";
        let nghiaTiengViet = nghiaGoc;

        if (nghiaGoc.includes('(') && nghiaGoc.includes(')')) {
            let phanTuDau = nghiaGoc.split('(')[0].trim();
            let phanTrongNgoac = nghiaGoc.substring(nghiaGoc.indexOf('(') + 1, nghiaGoc.indexOf(')')).trim();

            if (phanTuDau === phanTuDau.toUpperCase() && phanTuDau !== phanTuDau.toLowerCase()) {
                nghiaTiengViet = phanTuDau;       
                amHanViet = phanTrongNgoac;       
            } else {
                amHanViet = phanTuDau;
                nghiaTiengViet = phanTrongNgoac;
            }
        } else if (item.han_viet) {
            amHanViet = item.han_viet;
        } else {
            amHanViet = nghiaGoc; 
        }

        if (vungChua) {
            vungChua.innerHTML = `
                <div class="the-cyber-card" style="min-height: 280px; height: auto; padding-bottom: 20px;">
                    <div class="chu-kanji-khong-lo" style="line-height: 1.2; margin-bottom: 10px;">${chuKanji}</div>
                    <div id="step-am-doc" class="khoi-noi-dung" style="margin-bottom: 8px; opacity:0; transition: opacity 0.4s;">
                        <div class="label-am-han" style="color: #ff00ff; font-weight: bold; font-size: 1.2rem;">ÂM HÁN: ${amHanViet.toUpperCase()}</div>
                    </div>
                    <div id="step-nghia-viet" class="khoi-nghia-viet" style="margin-bottom: 15px; opacity:0; transition: opacity 0.4s;">
                        <div class="text-nghia" style="color: #00ffcc; font-size: 1.4rem; font-weight: bold; background: rgba(0, 255, 204, 0.1); padding: 8px 15px; display: inline-block; border-radius: 8px;">
                            ${nghiaTiengViet}
                        </div>
                    </div>
                    <div id="step-yomi" class="khoi-yomi-duoi" style="${styleAnYomi} margin-bottom: 15px; opacity:0; transition: opacity 0.4s;">
                        <div class="dong-cach-doc" style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 4px;"><strong>Onyomi:</strong> ${onyomi}</div>
                        <div class="dong-cach-doc" style="font-size: 0.95rem; color: #cbd5e1;"><strong>Kunyomi:</strong> ${kunyomi}</div>
                    </div>
                    <div id="step-tu-ghep" class="khoi-tu-ghep" style="${styleAnYomi} border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px; opacity:0; transition: opacity 0.4s;">
                        <div class="title-ghep" style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 5px;">Từ Ghép Tạo Nghĩa:</div>
                        <div class="content-ghep compound-list">${DinhDangTuGhep(viDu)}</div>
                    </div>
                    <button class="open-writing-button" type="button" onclick="MoLuyenViet('${chuKanji.replace(/'/g, "\\'")}')">
                        <span>✍️</span>
                        <div><b>LUYỆN VIẾT TAY</b><small>Xem 書き順 và viết theo chữ mẫu</small></div>
                        <i>→</i>
                    </button>
                </div>
            `;
        }
        
        let chuoiDocKanjiViet = `${amHanViet}. Nghĩa là: ${nghiaTiengViet}`;
        let mangTuGhep = viDu.split(/[,，、]/);
        let danhSachPhatAmTuGhep = [];

        mangTuGhep.forEach(tu => {
            if (!tu.trim()) return;
            let khopNoi = tu.match(/^([^(\uff08]+)(?:\s*[\(\uff08](.*?)[\)\uff09])?/);
            if (khopNoi) {
                let tiengNhat = khopNoi[1].trim(); 
                let tiengViet = khopNoi[2] ? khopNoi[2].trim() : ""; 
                
                if (tiengNhat) danhSachPhatAmTuGhep.push({ text: tiengNhat, lang: 'ja-JP' });
                if (tiengViet) danhSachPhatAmTuGhep.push({ text: `${tiengViet}`, lang: 'vi-VN' });
            } else {
                danhSachPhatAmTuGhep.push({ text: tu.trim(), lang: 'ja-JP' });
            }
        });

        KichHoatTimelineNangCao(chuKanji, chuoiDocKanjiViet, danhSachPhatAmTuGhep);

    // 2️⃣ XỬ LÝ MÀN HÌNH HỌC NGỮ PHÁP
    } else if (loaiHocHienTai === 'grammar') {
        const cauTruc = item.grammar || item.cau_truc || "Chưa có cấu trúc";
        const kyHieuNguPhap = DinhDangKyHieuNguPhap(cauTruc);
        const nghiaPhap = item.meaning || item.nghia || "Chưa có ý nghĩa";
        const giaiThich = item.explanation || item.giai_thich || "Chưa có giải thích chi tiết";
        
        const mangViDu = item.examples || [];
        let vdNhat = "";
        let vdViet = "";
        if (mangViDu.length > 0) {
            vdNhat = mangViDu[0].ja || mangViDu[0].jp || "";
            vdViet = mangViDu[0].vi || "";
        }

        if (vungChua) {
            vungChua.innerHTML = `
                <div class="the-cyber-card" style="min-height: 280px; height: auto; padding-bottom: 20px;">
                    <div class="chu-kanji-khong-lo" style="line-height: 1.3; font-size: 2.2rem; margin-bottom: 15px; padding: 0 10px; word-break: break-all; color: #38bdf8;">
                        ${kyHieuNguPhap.hienThi}
                        ${kyHieuNguPhap.chuThich ? `<small style="display:block;margin-top:10px;font-size:.78rem;line-height:1.45;color:#f0abfc;font-weight:700;word-break:normal;">${kyHieuNguPhap.chuThich}</small>` : ''}
                    </div>
                    <div id="step-am-doc" class="khoi-noi-dung" style="margin-bottom: 10px; opacity:0; transition: opacity 0.4s;">
                        <div class="label-am-han" style="color: #00ffcc; font-weight: bold; font-size: 1.3rem; background: rgba(0, 255, 204, 0.1); padding: 6px 12px; display: inline-block; border-radius: 6px;">
                            Ý NGHĨA: ${nghiaPhap}
                        </div>
                    </div>
                    <div id="step-nghia-viet" class="khoi-nghia-viet" style="${styleAnYomi} margin-bottom: 15px; opacity:0; transition: opacity 0.4s; padding: 0 10px;">
                        <div class="text-nghia" style="color: #cbd5e1; font-size: 0.95rem; text-align: left; line-height: 1.5; border-left: 3px solid #ff00ff; padding-left: 10px;">
                            <strong>Giải thích:</strong> ${giaiThich}
                        </div>
                    </div>
                    <div id="step-tu-ghep" class="khoi-tu-ghep" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 12px; opacity:0; transition: opacity 0.4s; text-align: left; padding-left: 10px; padding-right: 10px;">
                        <div class="title-ghep" style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 6px;">Ví Dụ Thực Tế:</div>
                        <div class="content-ghep" style="font-size: 1.1rem; color: #fff; font-weight: 500; margin-bottom: 4px; line-height: 1.4;">${vdNhat}</div>
                        <div class="content-ghep-vi" style="font-size: 0.9rem; color: #a1a1aa; font-style: italic;">👉 ${vdViet}</div>
                    </div>
                </div>
            `;
        }

        let danhSachPhatAmNguPhap = [];
        if (vdNhat) {
            danhSachPhatAmNguPhap.push({ text: vdNhat, lang: 'ja-JP' });
        }
        if (vdViet) {
            danhSachPhatAmNguPhap.push({ text: `Nghĩa là: ${vdViet}`, lang: 'vi-VN' });
        }

        let chuoiDocNguPhapMoDau = `Cấu trúc: ${cauTruc}. Ý nghĩa: ${nghiaPhap}`;
        KichHoatTimelineNangCao(cauTruc, chuoiDocNguPhapMoDau, danhSachPhatAmNguPhap);
    }
}

// =========================================================================
// HÀM KÍCH HOẠT TIMELINE HIỂN THỊ & PHÁT ÂM TUẦN TỰ
// =========================================================================
function KichHoatTimelineNangCao(vanBanTiengNhat, vanBanTiengViet, danhSachPhatAmTuGhep) {
    const eStep1 = document.getElementById('step-am-doc');
    const eStep2 = document.getElementById('step-nghia-viet');
    const eStep3 = document.getElementById('step-giai-thich') || document.getElementById('step-yomi');
    const eStep4 = document.getElementById('step-tu-ghep');

    if (eStep1) eStep1.style.opacity = "1";
    
    boDemStep2 = setTimeout(() => {
        if (eStep2) eStep2.style.opacity = "1";
    }, 800);

    boDemStep34 = setTimeout(() => {
        if (eStep3) eStep3.style.opacity = "1";
        if (eStep4) eStep4.style.opacity = "1";
        
        const nutChuyen = document.getElementById('vung-nut-chuyen-trang');
        if (nutChuyen) nutChuyen.classList.remove('an-giau');
    }, 1800);

    if (isMuted) return; 

    DocGiongMay(vanBanTiengNhat, 'ja-JP', 0.85, () => {
        if (isMuted) return;
        
        DocGiongMay(vanBanTiengViet, 'vi-VN', 0.85, () => {
            if (isMuted) return;
            
            PhatAmChuoiTuGhepTuanTu(danhSachPhatAmTuGhep, 0, () => {
                if (isMuted) return;
                
                if (tuDongChuyenBai) {
                    clearTimeout(boDemTuDongChuyen);
                    boDemTuDongChuyen = setTimeout(() => {
                        ChuyenBaiTiepTheo();
                    }, 2200);
                }
            });
        });
    });
}

function PhatAmChuoiTuGhepTuanTu(danhSach, index, khiXongToanBo) {
    if (isMuted || index >= danhSach.length) {
        if (khiXongToanBo) khiXongToanBo();
        return;
    }

    let phanTu = danhSach[index];
    let tocDo = phanTu.lang === 'ja-JP' ? 0.85 : 1.0;

    DocGiongMay(phanTu.text, phanTu.lang, tocDo, () => {
        PhatAmChuoiTuGhepTuanTu(danhSach, index + 1, khiXongToanBo);
    });
}

// =========================================================================
// HÀM PHÁT ÂM GỐC
// =========================================================================
function DocGiongMay(vanBan, ngonNgu, tocDo, khiXong) {
    if (!vanBan || vanBan === "None" || vanBan.trim() === "" || isMuted) { 
        if (khiXong) khiXong(); 
        return; 
    }
    
    if ('speechSynthesis' in window) {
        let vanBanSach = vanBan
    .replace(/<rt>.*?<\/rt>/g, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[\/()（）]/g, ' ')
    .replace(/[.,，。、:：;；!?！？]/g, ' ')
    .replace(/[～~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

        let utterance = new SpeechSynthesisUtterance(vanBanSach);

utterance.lang = ngonNgu;
utterance.rate = tocDo;

// Chọn voice phù hợp
const voices = speechSynthesis.getVoices();

if (ngonNgu === 'ja-JP') {

    const voiceJP =
        voices.find(v =>
            v.name.toLowerCase().includes('otoya')
        ) ||
        voices.find(v =>
            v.name.toLowerCase().includes('kyoko')
        ) ||
        voices.find(v =>
            v.lang.startsWith('ja')
        );

    if (voiceJP) {
        utterance.voice = voiceJP;
        console.log("Đang dùng voice:", voiceJP.name);
    }

    utterance.pitch = 1.0;


} else if (ngonNgu === 'vi-VN') {

    const voiceVN = voices.find(v =>
        v.lang.startsWith('vi')
    );

    if (voiceVN) {
        utterance.voice = voiceVN;
    }

    utterance.pitch = 1.0;
}

utterance.onend = () => {
    if (khiXong) khiXong();
};

utterance.onerror = (e) => {
    console.error("Lỗi phát âm:", e);
    if (khiXong) khiXong();
};

speechSynthesis.speak(utterance);
    } else { 
        if (khiXong) khiXong(); 
    }
}

function ChuyenBaiTiepTheo() { 
    ClearAllTimers();
    indexHienTai++; 
    ChayDongThoiGianFlashcard(); 
}

function ResetToanBoTienDoFile() {
    if (confirm("Bro có chắc chắn muốn xóa tiến độ của mục này để học lại từ đầu không?")) {
        localStorage.setItem(`tien_do_${tenFileHienTai}`, 0);
        indexHienTai = 0;
        ChayDongThoiGianFlashcard();
    }
}

// =========================================================================
// LUYỆN VIẾT KANJI: THỨ TỰ NÉT + CANVAS CHO CHUỘT/CẢM ỨNG/BÚT
// =========================================================================
function TachAmHanViet(item) {
    return (item?.meaning || '').split('(')[0].trim().toUpperCase() || 'KANJI';
}

function TachNghiaViet(item) {
    const meaning = item?.meaning || '';
    const match = meaning.match(/\(([^)]+)\)/);
    return match ? match[1] : meaning;
}

function MoManThiViet() {
    const kyLuc = JSON.parse(localStorage.getItem(`writing_test_best_n5_${soCauThiViet}`) || 'null');
    const hienKyLuc = document.getElementById('writing-best-score');
    if (hienKyLuc) hienKyLuc.textContent = kyLuc ? `Kỷ lục: ${kyLuc.score}/100` : 'Kỷ lục: --';
    ChuyenTab('man-writing-test-levels');
}

function ChonSoCauThiViet(soCau, nutBam) {
    soCauThiViet = soCau;
    document.querySelectorAll('.writing-count-picker button').forEach(nut => nut.classList.remove('active'));
    nutBam?.classList.add('active');
    MoManThiViet();
}

function TronMang(mang) {
    const ketQua = [...mang];
    for (let i = ketQua.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ketQua[i], ketQua[j]] = [ketQua[j], ketQua[i]];
    }
    return ketQua;
}

function BatDauBaiTestViet(capDo = 'n5') {
    capDoThiViet = capDo;
    const moThuThach = data => {
        duLieuThuThachViet = data.filter(item => item.kanji && item.meaning);
        danhSachThiViet = TronMang(duLieuThuThachViet).slice(0, Math.min(soCauThiViet, duLieuThuThachViet.length));
        if (!danhSachThiViet.length) return;
        indexThiViet = 0;
        tongDiemThiViet = 0;
        soChuDatThiViet = 0;
        xpThiViet = 0;
        manHinhTruocLuyenViet = 'man-writing-test-levels';
        cheDoThuThachViet = true;
        HienThiCauThiViet();
    };

    if (capDo === 'n5' && duLieuThuThachViet.length) return moThuThach(duLieuThuThachViet);
    fetch(`./${capDo}.json?v=3`).then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    }).then(moThuThach).catch(() => {
        const man = document.getElementById('man-writing-test-levels');
        man?.insertAdjacentHTML('beforeend', '<p class="challenge-load-error">Không tải được thử thách. Bro thử lại nhé.</p>');
    });
}

function BatDauThuThachViet(capDo = 'n5') {
    BatDauBaiTestViet(capDo);
}

function HienThiCauThiViet() {
    const item = danhSachThiViet[indexThiViet];
    if (!item) return HienThiKetQuaThiViet();
    kanjiThuThachTruoc = item.kanji;
    mucThuThachHienTai = item;
    daChamDiemThuThach = false;
    chuMauDaMo = false;
    kanjiDangLuyen = Array.from(item.kanji)[0];

    const screen = document.getElementById('man-luyen-viet');
    screen.classList.add('challenge-mode');
    screen.classList.remove('challenge-revealed');
    document.getElementById('writing-screen-heading').textContent = `THỬ THÁCH VIẾT ${capDoThiViet.toUpperCase()}`;
    document.getElementById('writing-xp-preview').textContent = '+20 XP';
    document.getElementById('writing-challenge-panel').hidden = false;
    document.getElementById('challenge-progress').textContent = `CÂU ${indexThiViet + 1} / ${danhSachThiViet.length}`;
    document.getElementById('challenge-han-viet').textContent = TachAmHanViet(item);
    document.getElementById('challenge-meaning').textContent = `Nghĩa: ${TachNghiaViet(item)}`;
    document.getElementById('challenge-result').className = 'challenge-result';
    document.getElementById('challenge-result').textContent = 'Kanji đang được giấu. Hãy viết từ trí nhớ!';
    document.getElementById('challenge-next').hidden = true;
    document.getElementById('practice-heading').textContent = 'Tự viết chữ Kanji';
    document.getElementById('kanji-watermark').textContent = kanjiDangLuyen;
    document.getElementById('kanji-watermark').style.visibility = 'hidden';
    const completeButton = document.getElementById('complete-writing-button');
    completeButton.disabled = false;
    completeButton.textContent = '🔍 Kiểm tra bài viết';
    completeButton.classList.remove('success');

    ChuyenTab('man-luyen-viet');
    requestAnimationFrame(() => {
        KhoiTaoBangViet();
        TaiThuTuNet(kanjiDangLuyen);
    });
}

function CauThuThachTiepTheo() {
    if (!daChamDiemThuThach) return;
    indexThiViet++;
    if (indexThiViet >= danhSachThiViet.length) HienThiKetQuaThiViet();
    else HienThiCauThiViet();
}

function HienThiKetQuaThiViet() {
    const diemTrungBinh = Math.round(tongDiemThiViet / Math.max(danhSachThiViet.length, 1));
    const key = `writing_test_best_${capDoThiViet}_${soCauThiViet}`;
    const kyLucCu = JSON.parse(localStorage.getItem(key) || 'null');
    if (!kyLucCu || diemTrungBinh > kyLucCu.score) {
        localStorage.setItem(key, JSON.stringify({ score: diemTrungBinh, correct: soChuDatThiViet, date: Date.now() }));
    }
    document.getElementById('writing-final-score').textContent = diemTrungBinh;
    document.getElementById('writing-correct-count').textContent = `${soChuDatThiViet}/${danhSachThiViet.length}`;
    document.getElementById('writing-xp-earned').textContent = `+${xpThiViet} XP`;
    document.getElementById('writing-result-title').textContent = diemTrungBinh >= 85 ? 'Nét bút rất chắc!' : diemTrungBinh >= 62 ? 'Đạt thử thách!' : 'Luyện thêm một vòng nhé!';
    document.getElementById('writing-result-summary').textContent = `Điểm trung bình ${diemTrungBinh}/100 · ${soChuDatThiViet} chữ đạt từ 62 điểm.`;
    cheDoThuThachViet = false;
    ChuyenTab('man-writing-results');
}

function ThietLapGiaoDienLuyenVietThuong() {
    cheDoThuThachViet = false;
    const screen = document.getElementById('man-luyen-viet');
    screen.classList.remove('challenge-mode', 'challenge-revealed');
    document.getElementById('writing-challenge-panel').hidden = true;
    document.getElementById('writing-screen-heading').innerHTML = 'LUYỆN VIẾT CHỮ <span id="writing-title-kanji">字</span>';
    document.getElementById('practice-heading').textContent = 'Viết theo chữ mẫu';
    const button = document.getElementById('complete-writing-button');
    button.disabled = false;
    button.textContent = '✓ Hoàn thành';
}

function MoLuyenViet(chuKanji) {
    if (!chuKanji) return;
    ClearAllTimers();
    ThietLapGiaoDienLuyenVietThuong();
    manHinhTruocLuyenViet = document.querySelector('.man-hinh.active')?.id || 'man-hoc-chi-tiet';
    kanjiDangLuyen = Array.from(chuKanji)[0];

    document.getElementById('writing-title-kanji').textContent = kanjiDangLuyen;
    document.getElementById('kanji-watermark').textContent = kanjiDangLuyen;
    document.getElementById('writing-xp-preview').textContent =
        localStorage.getItem(`writing_done_${kanjiDangLuyen}`) ? 'Đã luyện' : '+10 XP';

    ChuyenTab('man-luyen-viet');
    requestAnimationFrame(() => {
        KhoiTaoBangViet();
        TaiThuTuNet(kanjiDangLuyen);
    });
}

function DongLuyenViet() {
    ClearAllTimers();
    cheDoThuThachViet = false;
    ChuyenTab(manHinhTruocLuyenViet || 'man-hoc-chi-tiet');
}

function LayTenFileKanjiVG(chuKanji) {
    return chuKanji.codePointAt(0).toString(16).padStart(5, '0');
}

async function TaiThuTuNet(chuKanji) {
    const viewer = document.getElementById('stroke-order-viewer');
    const status = document.getElementById('stroke-status');
    if (!viewer) return;
    viewer.innerHTML = '<div class="stroke-loading">Đang tải thứ tự nét…</div>';
    strokePaths = [];
    strokeStep = 0;

    try {
        const tenFile = LayTenFileKanjiVG(chuKanji);
        const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${tenFile}.svg`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Không có dữ liệu thứ tự nét');
        const svgText = await response.text();
        const parsed = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        const sourceSvg = parsed.querySelector('svg');
        if (!sourceSvg) throw new Error('SVG không hợp lệ');

        sourceSvg.querySelectorAll('script,foreignObject,style').forEach(node => node.remove());
        const svg = document.importNode(sourceSvg, true);
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('viewBox', '0 0 109 109');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', `Thứ tự nét chữ ${chuKanji}`);
        svg.classList.add('kanjivg-svg');

        viewer.replaceChildren(svg);
        strokePaths = Array.from(svg.querySelectorAll('path'));
        strokePaths.forEach((path, index) => {
            path.classList.add('kanji-stroke');
            path.dataset.strokeIndex = String(index);
        });
        if (status) status.textContent = `${strokePaths.length} nét • dữ liệu KanjiVG`;
        requestAnimationFrame(PhatLaiThuTuNet);
    } catch (error) {
        viewer.innerHTML = `<div class="stroke-fallback"><b>${chuKanji}</b><span>Chưa tải được hình thứ tự nét.</span></div>`;
        if (status) status.textContent = 'Hãy kiểm tra kết nối mạng và thử lại.';
    }
}

function PhatLaiThuTuNet() {
    clearTimeout(strokeAnimationTimer);
    if (!strokePaths.length) return;
    strokeStep = 0;
    strokePaths.forEach(path => {
        const length = Math.max(path.getTotalLength?.() || 100, 1);
        path.style.transition = 'none';
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        path.style.opacity = '0.2';
    });
    requestAnimationFrame(() => ChayNetKeTiepTuDong());
}

function ChayNetKeTiepTuDong() {
    if (strokeStep >= strokePaths.length) return;
    const path = strokePaths[strokeStep];
    path.style.transition = 'stroke-dashoffset .52s ease, opacity .2s ease';
    path.style.strokeDashoffset = '0';
    path.style.opacity = '1';
    strokeStep++;
    document.getElementById('stroke-status').textContent = `Đang viết nét ${strokeStep} / ${strokePaths.length}`;
    strokeAnimationTimer = setTimeout(ChayNetKeTiepTuDong, 620);
}

function HienNetTiepTheo() {
    clearTimeout(strokeAnimationTimer);
    if (!strokePaths.length) return;
    if (strokeStep >= strokePaths.length) {
        PhatLaiThuTuNet();
        clearTimeout(strokeAnimationTimer);
        return;
    }
    const path = strokePaths[strokeStep];
    path.style.transition = 'stroke-dashoffset .42s ease, opacity .2s ease';
    path.style.strokeDashoffset = '0';
    path.style.opacity = '1';
    strokeStep++;
    document.getElementById('stroke-status').textContent = `Nét ${strokeStep} / ${strokePaths.length}`;
}

function KhoiTaoBangViet() {
    writingCanvas = document.getElementById('handwriting-canvas');
    if (!writingCanvas) return;
    writingCtx = writingCanvas.getContext('2d', { alpha: true });
    // Xóa dữ liệu nét trước khi đổi kích thước canvas. Nếu làm ngược lại,
    // DoiKichThuocBangViet sẽ vẽ lại các nét của câu trước lên bảng mới.
    cacNetDaViet = [];
    netDangViet = null;
    DoiKichThuocBangViet();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    writingCtx.clearRect(0, 0, writingCanvas.width / ratio, writingCanvas.height / ratio);

    writingCanvas.onpointerdown = BatDauViet;
    writingCanvas.onpointermove = DangViet;
    writingCanvas.onpointerup = KetThucNet;
    writingCanvas.onpointercancel = KetThucNet;
    writingCanvas.onpointerleave = event => {
        if (event.pointerType === 'mouse' && netDangViet) KetThucNet(event);
    };
}

function DoiKichThuocBangViet() {
    if (!writingCanvas || !writingCtx) return;
    const rect = writingCanvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const oldStrokes = cacNetDaViet;
    writingCanvas.width = Math.round(rect.width * ratio);
    writingCanvas.height = Math.round(rect.height * ratio);
    writingCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
    writingCtx.lineCap = 'round';
    writingCtx.lineJoin = 'round';
    cacNetDaViet = oldStrokes;
    VeLaiTatCaNet();
}

function ToaDoTrongCanvas(event) {
    const rect = writingCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function BatDauViet(event) {
    event.preventDefault();
    writingCanvas.setPointerCapture?.(event.pointerId);
    netDangViet = [ToaDoTrongCanvas(event)];
    cacNetDaViet.push(netDangViet);
}

function DangViet(event) {
    if (!netDangViet) return;
    event.preventDefault();
    const diem = ToaDoTrongCanvas(event);
    const truoc = netDangViet[netDangViet.length - 1];
    if (Math.hypot(diem.x - truoc.x, diem.y - truoc.y) < 1.5) return;
    netDangViet.push(diem);
    VeDoanNet(truoc, diem);
}

function KetThucNet(event) {
    if (!netDangViet) return;
    event?.preventDefault();
    if (netDangViet.length === 1) {
        const p = netDangViet[0];
        VeDoanNet(p, { x: p.x + 0.1, y: p.y + 0.1 });
    }
    netDangViet = null;
}

function VeDoanNet(a, b) {
    if (!writingCtx) return;
    const boardWidth = writingCanvas.getBoundingClientRect().width;
    writingCtx.strokeStyle = '#111827';
    writingCtx.lineWidth = Math.max(7, boardWidth * 0.025);
    writingCtx.beginPath();
    writingCtx.moveTo(a.x, a.y);
    writingCtx.lineTo(b.x, b.y);
    writingCtx.stroke();
}

function VeLaiTatCaNet() {
    if (!writingCtx || !writingCanvas) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    writingCtx.clearRect(0, 0, writingCanvas.width / ratio, writingCanvas.height / ratio);
    cacNetDaViet.forEach(net => {
        if (net.length === 1) VeDoanNet(net[0], { x: net[0].x + 0.1, y: net[0].y + 0.1 });
        for (let i = 1; i < net.length; i++) VeDoanNet(net[i - 1], net[i]);
    });
}

function HoanTacNet() {
    cacNetDaViet.pop();
    netDangViet = null;
    VeLaiTatCaNet();
}

function XoaBangViet() {
    cacNetDaViet = [];
    netDangViet = null;
    VeLaiTatCaNet();
}

function BatTatChuMau() {
    const watermark = document.getElementById('kanji-watermark');
    const button = document.getElementById('btn-toggle-guide');
    const hien = watermark.style.visibility !== 'hidden';
    watermark.style.visibility = hien ? 'hidden' : 'visible';
    button.classList.toggle('active', !hien);
    button.innerHTML = hien ? '◯ Chữ mẫu' : '👁 Chữ mẫu';
}

function DoiDoMoChuMau(value) {
    const opacity = Number(value) / 100;
    document.getElementById('kanji-watermark').style.opacity = String(opacity);
    document.getElementById('guide-opacity-value').textContent = `${value}%`;
    if (Number(value) > 0) {
        document.getElementById('kanji-watermark').style.visibility = 'visible';
        document.getElementById('btn-toggle-guide').classList.add('active');
    }
}

function LayMauTheoDoDai(points, soDiem = 24) {
    if (!points?.length) return [];
    if (points.length === 1) return Array.from({ length: soDiem }, () => ({ ...points[0] }));
    const doan = [];
    let tong = 0;
    for (let i = 1; i < points.length; i++) {
        const dai = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
        doan.push(dai);
        tong += dai;
    }
    if (!tong) return Array.from({ length: soDiem }, () => ({ ...points[0] }));

    return Array.from({ length: soDiem }, (_, index) => {
        const dich = (index / (soDiem - 1)) * tong;
        let daDi = 0;
        for (let i = 0; i < doan.length; i++) {
            if (daDi + doan[i] >= dich || i === doan.length - 1) {
                const tiLe = doan[i] ? (dich - daDi) / doan[i] : 0;
                return {
                    x: points[i].x + (points[i + 1].x - points[i].x) * tiLe,
                    y: points[i].y + (points[i + 1].y - points[i].y) * tiLe
                };
            }
            daDi += doan[i];
        }
        return { ...points[points.length - 1] };
    });
}

function LayMauPathSVG(path, soDiem = 24) {
    const length = Math.max(path.getTotalLength(), 1);
    return Array.from({ length: soDiem }, (_, index) => {
        const point = path.getPointAtLength((index / (soDiem - 1)) * length);
        return { x: point.x, y: point.y };
    });
}

function ChuanHoaNhomNet(nhomNet) {
    const tatCa = nhomNet.flat();
    const minX = Math.min(...tatCa.map(p => p.x));
    const maxX = Math.max(...tatCa.map(p => p.x));
    const minY = Math.min(...tatCa.map(p => p.y));
    const maxY = Math.max(...tatCa.map(p => p.y));
    const scale = Math.max(maxX - minX, maxY - minY, 1);
    const lechX = (scale - (maxX - minX)) / 2;
    const lechY = (scale - (maxY - minY)) / 2;
    return nhomNet.map(net => net.map(p => ({
        x: (p.x - minX + lechX) / scale,
        y: (p.y - minY + lechY) / scale
    })));
}

function ChamDiemChuViet() {
    const netNguoiHoc = cacNetDaViet.filter(net => net.length >= 2).map(net => LayMauTheoDoDai(net));
    const netMau = strokePaths.map(path => LayMauPathSVG(path));
    if (!netNguoiHoc.length || !netMau.length) return { diem: 0, diemSoNet: 0, diemHinhDang: 0, dungSoNet: false, saiLechNet: 99 };

    const nguoiChuan = ChuanHoaNhomNet(netNguoiHoc);
    const mauChuan = ChuanHoaNhomNet(netMau);
    const soNetSoSanh = Math.min(nguoiChuan.length, mauChuan.length);
    let tongSaiLech = 0;

    for (let i = 0; i < soNetSoSanh; i++) {
        let saiLechNet = 0;
        for (let j = 0; j < nguoiChuan[i].length; j++) {
            saiLechNet += Math.hypot(
                nguoiChuan[i][j].x - mauChuan[i][j].x,
                nguoiChuan[i][j].y - mauChuan[i][j].y
            );
        }
        tongSaiLech += saiLechNet / nguoiChuan[i].length;
    }

    const saiLechTrungBinh = tongSaiLech / soNetSoSanh;
    const saiLechSoNet = Math.abs(netNguoiHoc.length - netMau.length);
    const diemSoNet = saiLechSoNet === 0 ? 30 : saiLechSoNet === 1 ? 10 : 0;
    const diemHinhDang = Math.max(0, 70 * (1 - saiLechTrungBinh / 0.34));
    const diem = Math.round(Math.max(0, Math.min(100, diemSoNet + diemHinhDang - Math.max(0, saiLechSoNet - 1) * 12)));
    return { diem, diemSoNet, diemHinhDang: Math.round(diemHinhDang), dungSoNet: saiLechSoNet === 0, saiLechNet: saiLechSoNet };
}

function MoDapAnThuThach() {
    chuMauDaMo = true;
    const screen = document.getElementById('man-luyen-viet');
    screen.classList.add('challenge-revealed');
    document.getElementById('kanji-watermark').style.visibility = 'visible';
    document.getElementById('kanji-watermark').style.opacity = '.16';
    document.getElementById('practice-heading').textContent = `Viết lại chữ ${kanjiDangLuyen}`;
    PhatLaiThuTuNet();
}

function KiemTraThuThachViet() {
    const result = document.getElementById('challenge-result');
    const button = document.getElementById('complete-writing-button');
    if (daChamDiemThuThach) return;
    if (!strokePaths.length) {
        result.className = 'challenge-result warning';
        result.textContent = 'Đang tải dữ liệu nét, chờ một chút nhé…';
        return;
    }
    if (!cacNetDaViet.some(net => net.length >= 2)) {
        result.className = 'challenge-result warning';
        result.textContent = 'Bro hãy viết chữ vào ô trước nhé ✍️';
        return;
    }

    const ketQua = ChamDiemChuViet();
    const dat = ketQua.diem >= 62 && ketQua.saiLechNet <= 1;
    daChamDiemThuThach = true;
    tongDiemThiViet += ketQua.diem;
    MoDapAnThuThach();
    button.disabled = true;
    document.getElementById('challenge-next').hidden = false;
    if (dat) {
        const thuongXP = ketQua.diem >= 85 ? 20 : 10;
        soChuDatThiViet++;
        xpThiViet += thuongXP;
        diemXP += thuongXP;
        localStorage.setItem('kanji_pure_xp', diemXP);
        GhiNhanHoatDong('xp', thuongXP);
        document.getElementById('id-xp').textContent = diemXP;
        document.getElementById('writing-xp-preview').textContent = `✓ +${thuongXP} XP`;
        result.className = 'challenge-result correct';
        result.innerHTML = `🎉 Đạt! Đáp án <b>${kanjiDangLuyen}</b> • ${ketQua.diem}/100<br><small>Số nét ${ketQua.diemSoNet}/30 · Hình dáng & hướng nét ${ketQua.diemHinhDang}/70</small>`;
        button.textContent = '✓ Đã hoàn thành';
        button.classList.add('success');
        document.getElementById('kanji-watermark').style.visibility = 'visible';
        document.getElementById('kanji-watermark').style.opacity = '.1';
    } else {
        result.className = 'challenge-result wrong';
        const goiYNet = ketQua.dungSoNet ? 'Số nét đúng, hãy chỉnh hình dáng và hướng nét.' : `Bạn viết lệch ${ketQua.saiLechNet} nét so với mẫu.`;
        result.innerHTML = `Chưa đạt • ${ketQua.diem}/100<br><small>Số nét ${ketQua.diemSoNet}/30 · Hình dáng & hướng nét ${ketQua.diemHinhDang}/70</small><br><b>Đáp án: ${kanjiDangLuyen}</b> — ${goiYNet}`;
        button.textContent = 'Đã chấm điểm';
    }
    document.getElementById('challenge-next').textContent = indexThiViet + 1 >= danhSachThiViet.length ? 'Xem kết quả →' : 'Chữ tiếp theo →';
}

function XuLyNutHoanThanhViet() {
    if (cheDoThuThachViet) KiemTraThuThachViet();
    else HoanThanhLuyenViet();
}

function HoanThanhLuyenViet() {
    if (cacNetDaViet.length === 0) {
        const status = document.getElementById('stroke-status');
        status.textContent = 'Bro hãy viết ít nhất một nét trước nhé ✍️';
        status.classList.add('writing-warning');
        setTimeout(() => status.classList.remove('writing-warning'), 1300);
        return;
    }
    const key = `writing_done_${kanjiDangLuyen}`;
    const daNhanXP = localStorage.getItem(key);
    if (!daNhanXP) {
        diemXP += 10;
        localStorage.setItem('kanji_pure_xp', diemXP);
        GhiNhanHoatDong('xp', 10);
        localStorage.setItem(key, '1');
        const xpElement = document.getElementById('id-xp');
        if (xpElement) xpElement.textContent = diemXP;
    }
    document.getElementById('writing-xp-preview').textContent = '✓ Đã luyện';
    const completeButton = document.getElementById('complete-writing-button');
    completeButton.textContent = daNhanXP ? '✓ Đã hoàn thành' : '🎉 +10 XP';
    completeButton.classList.add('success');
    setTimeout(() => {
        completeButton.textContent = '✓ Hoàn thành';
        completeButton.classList.remove('success');
    }, 1600);
}

window.addEventListener('resize', () => {
    if (document.getElementById('man-luyen-viet')?.classList.contains('active')) {
        clearTimeout(window.__writingResizeTimer);
        window.__writingResizeTimer = setTimeout(DoiKichThuocBangViet, 120);
    }
});

// =========================================================================
// KHU VỰC ĐẤU TRƯỜNG TEST TRẮC NGHIỆM 4 ĐÁP ÁN
// =========================================================================
async function KichHoatLamDe(theLoai) {
    theLoaiTestChon = theLoai;
    ChuyenTab('man-lam-bai-test');
    
    let fileNguon = capDoTestChon.toLowerCase(); 
    
    if (theLoai === 'ngu-phap') {
        fileNguon = `${fileNguon}_grammar`;
    } else if (theLoai === 'kanji') {
        if (['n5', 'n4'].includes(fileNguon)) fileNguon = `${fileNguon}_quiz`;
        if (fileNguon === 'n2') fileNguon = 'n2_moji_goi';
    }
    
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    if (cauHoiTxt) cauHoiTxt.innerHTML = `<div class="loading-text">⚡ Đang thiết lập đấu trường trận đấu...</div>`;

    try {
        await NapBangHanVietToanCuc();
        const response = await fetch(`./${fileNguon}.json?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error();
        TaoDeTracNghiem(await response.json());
    } catch {
        if (cauHoiTxt) cauHoiTxt.innerHTML = `<span style="color:#ef4444; font-size:1.1rem;">❌ Không thể kết nối đề thi file gốc "${fileNguon}.json"!<br>Bro vui lòng thử tải lại trang nhé.</span>`;
    }
}

function TaoLuaChonKana(dapAnDung) {
    const doiAm = {か:'が',き:'ぎ',く:'ぐ',け:'げ',こ:'ご',さ:'ざ',し:'じ',す:'ず',せ:'ぜ',そ:'ぞ',た:'だ',ち:'ぢ',つ:'づ',て:'で',と:'ど',は:'ば',ひ:'び',ふ:'ぶ',へ:'べ',ほ:'ぼ',が:'か',ぎ:'き',ぐ:'く',げ:'け',ご:'こ',ざ:'さ',じ:'し',ず:'す',ぜ:'せ',ぞ:'そ',だ:'た',で:'て',ど:'と',ば:'は',び:'ひ',ぶ:'ふ',べ:'へ',ぼ:'ほ'};
    const kyTu = [...dapAnDung];
    const bienThe = [];
    kyTu.forEach((chu, index) => {
        if (doiAm[chu]) {
            const banSao = [...kyTu];
            banSao[index] = doiAm[chu];
            bienThe.push(banSao.join(''));
        }
    });
    if (kyTu.length > 2) {
        const doiCho = [...kyTu];
        [doiCho[0], doiCho[1]] = [doiCho[1], doiCho[0]];
        bienThe.push(doiCho.join(''));
        bienThe.push(kyTu.slice(0, -1).join(''));
    }
    if (dapAnDung.includes('う')) bienThe.push(dapAnDung.replace('う', ''));
    else bienThe.push(`${dapAnDung}う`);
    const duPhong = ['しょうじ', 'こうせい', 'じゅうかん', 'けんどう', 'りょうしゅう'];
    const nhieu = [...new Set([...bienThe, ...duPhong])].filter(x => x && x !== dapAnDung).slice(0, 3);
    return [dapAnDung, ...nhieu].sort(() => Math.random() - .5);
}

function KatakanaSangHiragana(text = '') {
    return [...text].map(char => {
        const code = char.charCodeAt(0);
        return code >= 0x30A1 && code <= 0x30F6 ? String.fromCharCode(code - 0x60) : char;
    }).join('');
}

function LayCachDocDaiDien(item) {
    const tachCachDoc = value => String(value || '').split(/[,，、\/]/).map(reading =>
        KatakanaSangHiragana(reading.trim().replace(/[-‐ー]/g,''))
    ).find(reading => /^[ぁ-ゖ]+$/.test(reading));
    const on = tachCachDoc(item.onyomi);
    if (on) return {reading:on,kind:'音読み'};
    const kun = tachCachDoc(item.kunyomi);
    return kun ? {reading:kun,kind:'訓読み'} : null;
}

function TachNghiaVaHanViet(item) {
    const raw = String(item.meaning || item.nghia || '');
    const match = raw.match(/^([^()]+)\(([^)]+)\)/);
    if (match) return {hanViet:(item.han_viet || match[1]).trim().toUpperCase(),meaning:match[2].trim()};
    const word = item.word || item.kanji || item.chu || '';
    const bang = TaoBangAmHanViet();
    const hanViet = [...word].filter(char => /\p{Script=Han}/u.test(char)).map(char => bang[char] || '').filter(Boolean).join(' ');
    return {hanViet:(item.han_viet || hanViet).trim().toUpperCase(),meaning:raw};
}

function TaoGiaiThichCachDoc(item, reading) {
    const word = item.word || item.kanji || item.chu || '';
    const {hanViet,meaning} = TachNghiaVaHanViet(item);
    const parts = [`<b>${EscapeHtml(word)}（${EscapeHtml(reading)}）</b>`];
    if (hanViet) parts.push(`<span class="answer-han-viet">${EscapeHtml(hanViet)}</span>`);
    if (meaning) parts.push(EscapeHtml(meaning));
    return parts.join(' — ');
}

function TaoBonDapAnKana(dapAnDung, khoCachDoc) {
    const tuKho = [...new Set(khoCachDoc)].filter(reading => reading && reading !== dapAnDung);
    const luaChon = [dapAnDung, ...tuKho.sort(() => Math.random() - .5).slice(0,3)];
    if (luaChon.length < 4) return TaoLuaChonKana(dapAnDung);
    return luaChon.sort(() => Math.random() - .5);
}

function TaoDeTracNghiem(khoGoc) {
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    if (!khoGoc || khoGoc.length < 4) {
        if (cauHoiTxt) cauHoiTxt.innerText = "❌ Kho dữ liệu quá ít (dưới 4 câu), không đủ điều kiện lập bộ đề trắc nghiệm!";
        return;
    }
    
    mangCauHoiTest = [];
    soCauDungTest = 0;
    cheDoOnCauSai = false;
    cheDoThiThuChuan = false;
    document.getElementById('pause-test-button')?.setAttribute('hidden', '');

    if (theLoaiTestChon === 'kanji' && khoGoc[0] && khoGoc[0].correct !== undefined) {
        let danhSachN5Tron = [...khoGoc].sort(() => 0.5 - Math.random());
        let soCauN5 = Math.min(20, danhSachN5Tron.length); 

        for (let i = 0; i < soCauN5; i++) {
            let itemN5 = danhSachN5Tron[i];
            mangCauHoiTest.push({
                cauHoiText: `<span class="japanese-test-prompt">＿＿＿のことばの読み方として最もよいものを選んでください。</span><br><span style="font-size:3.5rem; font-weight:bold; color:#fff; text-shadow:0 0 10px #ff00ff;">${itemN5.kanji}</span>`,
                dung: itemN5.correct,
                luaChon: (itemN5.options?.length === 4 ? [...itemN5.options] : TaoLuaChonKana(itemN5.correct)).sort(() => 0.5 - Math.random()),
                key: `${capDoTestChon}-${theLoaiTestChon}-${itemN5.id || itemN5.kanji}`,
                skill:'kanji',
                explanation:TaoGiaiThichCachDoc(itemN5,itemN5.correct)
            });
        }
    }
    else if (theLoaiTestChon === 'kanji' && khoGoc[0]?.word && khoGoc[0]?.reading) {
        const danhSach = [...khoGoc].sort(() => Math.random() - .5).slice(0,20);
        const khoKana = khoGoc.map(item => item.reading);
        danhSach.forEach(item => mangCauHoiTest.push({
            cauHoiText:`<span class="japanese-test-prompt">＿＿＿のことばの読み方として最もよいものを選んでください。</span><br><span style="font-size:3.2rem;font-weight:900;color:#fff">${item.word}</span>`,
            dung:item.reading,
            luaChon:TaoBonDapAnKana(item.reading,khoKana),
            key:`${capDoTestChon}-kanji-${item.id}`,
            skill:'kanji',
            explanation:TaoGiaiThichCachDoc(item,item.reading)
        }));
    }
    else {
        let danhSachTron = [...khoGoc].sort(() => 0.5 - Math.random());
        let soCau = Math.min(10, danhSachTron.length);

        for (let i = 0; i < soCau; i++) {
            let itemGoc = danhSachTron[i];
            let cauHoi = "";
            let dapAnDung = "";
            
            let chuGoc = itemGoc.kanji || itemGoc.chu || "字";
            let nghiaGoc = itemGoc.meaning || itemGoc.nghia || "";
            let grammarGoc = itemGoc.grammar || itemGoc.cau_truc || "";

            if (theLoaiTestChon === 'kanji') {
                const cachDoc = LayCachDocDaiDien(itemGoc);
                if (!cachDoc) continue;
                cauHoi = `<span class="japanese-test-prompt">この漢字の代表的な${cachDoc.kind}はどれですか。</span><br><span style="font-size:3.5rem;font-weight:bold;color:#fff">${chuGoc}</span>`;
                dapAnDung = cachDoc.reading;
            } else if (theLoaiTestChon === 'han-viet') {
                cauHoi = `Chữ Kanji này có âm Hán Việt là gì: <br><span style="font-size:3.5rem; font-weight:bold; color:#fff;">${chuGoc}</span>`;
                dapAnDung = (nghiaGoc.includes('(') && nghiaGoc.includes(')')) ? nghiaGoc.split('(')[0].trim() : (itemGoc.han_viet || nghiaGoc);
            } else if (theLoaiTestChon === 'tu-vung') {
                cauHoi = `Nghĩa tiếng Việt chuẩn xác của từ: <br><span style="font-size:2.8rem; font-weight:bold; color:#00ffcc;">${chuGoc}</span> là gì?`;
                dapAnDung = (nghiaGoc.includes('(') && nghiaGoc.includes(')')) ? nghiaGoc.substring(nghiaGoc.indexOf('(') + 1, nghiaGoc.indexOf(')')) : nghiaGoc;
            } else {
                const kyHieu = DinhDangKyHieuNguPhap(grammarGoc);
                cauHoi = `Cấu trúc ngữ pháp: <br><span style="font-size:2.2rem; font-weight:bold; color:#38bdf8;">${kyHieu.hienThi}</span>${kyHieu.chuThich ? `<small style="display:block;margin:8px 0;color:#f0abfc;">${kyHieu.chuThich}</small>` : ''} có nghĩa là gì?`;
                dapAnDung = nghiaGoc;
            }

            let cacTuKhac = khoGoc.filter((x, idx) => idx !== khoGoc.indexOf(itemGoc));
            let dapAnNhieu = cacTuKhac.map(x => {
                let n = x.meaning || x.nghia || "";
                let h = x.han_viet || n;
                if (theLoaiTestChon === 'kanji') {
                    return LayCachDocDaiDien(x)?.reading || '';
                } else if (theLoaiTestChon === 'han-viet') {
                    return (n.includes('(') && n.includes(')')) ? n.split('(')[0].trim() : h;
                } else if (theLoaiTestChon === 'tu-vung') {
                    return (n.includes('(') && n.includes(')')) ? n.substring(n.indexOf('(') + 1, n.indexOf(')')) : n;
                } else { return n; }
            });
            
            dapAnNhieu = [...new Set(dapAnNhieu)].filter(d => d && d.trim() !== "" && d !== dapAnDung).sort(() => 0.5 - Math.random());
            
            let bo4DapAn = [dapAnDung];
            for (let j = 0; j < 3; j++) {
                if (dapAnNhieu[j]) {
                    bo4DapAn.push(dapAnNhieu[j]);
                } else {
                    let tuDuPhong = KHO_NHIEU_DU_PHONG[j % KHO_NHIEU_DU_PHONG.length];
                    bo4DapAn.push(tuDuPhong);
                }
            }
            bo4DapAn.sort(() => 0.5 - Math.random());

            mangCauHoiTest.push({
                cauHoiText: cauHoi,
                dung: dapAnDung,
                luaChon: bo4DapAn,
                key: `${capDoTestChon}-${theLoaiTestChon}-${itemGoc.id || itemGoc.questionNumber || chuGoc || grammarGoc}`,
                skill:theLoaiTestChon,
                explanation:theLoaiTestChon === 'kanji' ? TaoGiaiThichCachDoc(itemGoc,dapAnDung) : ''
            });
        }
    }

    indexTestHienTai = 0;
    HienThiCauHoiTest();
    BatDauDuongDuaTest(mangCauHoiTest.length);
}

function DinhDangThoiGian(soGiay) {
    const phut = Math.floor(Math.max(0, soGiay) / 60);
    const giay = Math.max(0, soGiay) % 60;
    return `${String(phut).padStart(2, '0')}:${String(giay).padStart(2, '0')}`;
}

function BatDauDuongDuaTest(soCau, soGiayCoDinh = null) {
    clearInterval(boDemDuongDuaTest);
    tongThoiGianTest = soGiayCoDinh || Math.max(180, soCau * 30);
    thoiGianTestConLai = tongThoiGianTest;
    testDaHetGio = false;
    const race = document.getElementById('test-race');
    race?.classList.remove('warning', 'time-up', 'finished');
    CapNhatDuongDuaTest();
    boDemDuongDuaTest = setInterval(() => {
        thoiGianTestConLai--;
        CapNhatDuongDuaTest();
        if (cheDoThiThuChuan && Date.now() - lanLuuTienDoThiThu >= 10000) LuuTienDoThiThu();
        if (thoiGianTestConLai <= 0) HetGioLamTest();
    }, 1000);
}

function KhoiPhucDongHoThiThu(soGiayConLai, tongSoGiay) {
    clearInterval(boDemDuongDuaTest);
    tongThoiGianTest = Math.max(1, Number(tongSoGiay) || Number(soGiayConLai) || 1);
    thoiGianTestConLai = Math.max(1, Number(soGiayConLai) || 1);
    testDaHetGio = false;
    const race = document.getElementById('test-race');
    race?.classList.remove('warning', 'time-up', 'finished');
    CapNhatDuongDuaTest();
    boDemDuongDuaTest = setInterval(() => {
        thoiGianTestConLai--;
        CapNhatDuongDuaTest();
        if (Date.now() - lanLuuTienDoThiThu >= 10000) LuuTienDoThiThu();
        if (thoiGianTestConLai <= 0) HetGioLamTest();
    }, 1000);
}

function KhoaTienDoThiThu(level = capDoTestChon) {
    return `jlpt_paused_exam_${String(level || '').toLowerCase()}`;
}

function LayTienDoThiThu(level = capDoTestChon) {
    if (!['n5', 'n4', 'n3', 'n2'].includes(level)) return null;
    try {
        const state = JSON.parse(localStorage.getItem(KhoaTienDoThiThu(level)) || 'null');
        return state?.questions?.length && state.index < state.questions.length ? state : null;
    } catch { return null; }
}

function LuuTienDoThiThu() {
    if (!cheDoThiThuChuan || testDaHetGio || !mangCauHoiTest.length || !['n5', 'n4', 'n3', 'n2'].includes(capDoTestChon)) return;
    const state = {
        version: 1,
        level: capDoTestChon,
        type: theLoaiTestChon,
        questions: mangCauHoiTest,
        index: indexTestHienTai,
        correct: soCauDungTest,
        remaining: thoiGianTestConLai,
        totalTime: tongThoiGianTest,
        examCode: maDeThiThuHienTai,
        message: document.getElementById('race-message')?.textContent || '',
        savedAt: Date.now()
    };
    try {
        localStorage.setItem(KhoaTienDoThiThu(capDoTestChon), JSON.stringify(state));
        lanLuuTienDoThiThu = Date.now();
    } catch {}
}

function XoaTienDoThiThu(level = capDoTestChon) {
    if (level) localStorage.removeItem(KhoaTienDoThiThu(level));
    CapNhatNutTiepTucThi(level);
}

function CapNhatNutTiepTucThi(level = capDoTestChon) {
    const nut = document.getElementById('resume-mock-test-button');
    if (!nut) return;
    const state = LayTienDoThiThu(level);
    nut.hidden = !state;
    if (!state) return;
    const daTraLoi = state.questions.filter(cau => cau.selectedAnswer !== undefined).length;
    nut.textContent = `▶️ Tiếp tục ${state.examCode || level.toUpperCase()} · câu ${state.index + 1}/${state.questions.length} · còn ${DinhDangThoiGian(state.remaining)}`;
    nut.setAttribute('aria-label', `Tiếp tục bài đang làm, đã trả lời ${daTraLoi} câu`);
}

function TamDungThiThu() {
    if (!cheDoThiThuChuan || testDaHetGio) return;
    LuuTienDoThiThu();
    clearInterval(boDemDuongDuaTest);
    ChuyenTab('man-test-the-loai');
    CapNhatNutTiepTucThi(capDoTestChon);
}

function TiepTucThiThuDaLuu() {
    const state = LayTienDoThiThu(capDoTestChon);
    if (!state) { CapNhatNutTiepTucThi(capDoTestChon); return; }
    capDoTestChon = state.level;
    theLoaiTestChon = state.type || 'thi-thu';
    cheDoOnCauSai = false;
    cheDoThiThuChuan = true;
    mangCauHoiTest = state.questions;
    indexTestHienTai = Math.max(0, Math.min(state.index, mangCauHoiTest.length - 1));
    soCauDungTest = Number(state.correct) || 0;
    maDeThiThuHienTai = state.examCode || state.level.toUpperCase();
    ChuyenTab('man-lam-bai-test');
    document.getElementById('pause-test-button').hidden = false;
    HienThiCauHoiTest();
    if (state.message) {
        const thongBaoGoc = state.message.replace(/(?: · Đã khôi phục bài làm\.)+$/g, '');
        document.getElementById('race-message').textContent = `${thongBaoGoc} · Đã khôi phục bài làm.`;
    }
    KhoiPhucDongHoThiThu(state.remaining, state.totalTime);
}

function HuyBaiTest() {
    if (cheDoThiThuChuan && mangCauHoiTest.length && !testDaHetGio) {
        if (!confirm('Hủy bài sẽ xóa toàn bộ tiến độ của đề này. Bro chắc chắn muốn hủy chứ?')) return;
        XoaTienDoThiThu(capDoTestChon);
    }
    clearInterval(boDemDuongDuaTest);
    cheDoThiThuChuan = false;
    mangCauHoiTest = [];
    ChuyenTab('man-test-levels');
}

function CapNhatDuongDuaTest() {
    const race = document.getElementById('test-race');
    const time = document.getElementById('race-time');
    const status = document.getElementById('race-status');
    const questionCount = document.getElementById('race-question-count');
    if (!race) return;
    const tiLeThoiGian = tongThoiGianTest ? thoiGianTestConLai / tongThoiGianTest : 0;
    const tongSoCau = mangCauHoiTest.length || 1;
    const soCauHienTai = Math.min(indexTestHienTai + 1, tongSoCau);
    race.style.setProperty('--time-progress', `${Math.max(0, tiLeThoiGian) * 360}deg`);
    race.style.setProperty('--race-progress', `${soCauHienTai / tongSoCau * 100}%`);
    if (time) time.textContent = DinhDangThoiGian(thoiGianTestConLai);
    if (questionCount) questionCount.textContent = `${soCauHienTai} / ${tongSoCau} CÂU`;
    const sapHetGio = thoiGianTestConLai <= Math.max(30, tongThoiGianTest * .2);
    race.classList.toggle('warning', sapHetGio);
    if (status) status.textContent = sapHetGio ? 'SẮP HẾT GIỜ' : 'TẬP TRUNG LÀM BÀI';
}

function HetGioLamTest() {
    if (testDaHetGio) return;
    ChamCauThiThuHienTai();
    testDaHetGio = true;
    XoaTienDoThiThu(capDoTestChon);
    clearInterval(boDemDuongDuaTest);
    const race = document.getElementById('test-race');
    race?.classList.add('time-up');
    document.getElementById('race-status').textContent = 'HẾT GIỜ!';
    document.getElementById('race-message').textContent = 'Bài thi đã kết thúc. Xem lại phần yếu rồi thử lại nhé!';
    document.querySelectorAll('.nut-option-test').forEach(nut => nut.disabled = true);
    document.getElementById('vung-nut-chuyen-test')?.classList.add('an-giau');
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    if (cauHoiTxt) cauHoiTxt.insertAdjacentHTML('beforeend', '<p class="test-time-up-text">⏱ Bài thi đã kết thúc do hết thời gian.</p>');
}

function KetThucDuongDuaTest() {
    clearInterval(boDemDuongDuaTest);
    const race = document.getElementById('test-race');
    race?.style.setProperty('--race-progress', '100%');
    race?.classList.remove('warning');
    race?.classList.add('finished');
    document.getElementById('race-status').textContent = 'HOÀN THÀNH!';
    document.getElementById('race-message').textContent = `Bạn còn ${DinhDangThoiGian(thoiGianTestConLai)} — thành tích tuyệt vời!`;
}

function HienThiCauHoiTest() {
    daBamDapAn = false;
    const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
    if (nutChuyenTest) nutChuyenTest.classList.add('an-giau');
    
    let phanTuCau = mangCauHoiTest[indexTestHienTai];
    const testTienDo = document.getElementById('test-tien-do');
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    CapNhatDuongDuaTest();
    
    if (testTienDo) testTienDo.innerHTML = `${phanTuCau.section ? `<small class="exam-section-name">${phanTuCau.section}</small>` : ''}Câu hỏi: ${indexTestHienTai + 1} / ${mangCauHoiTest.length}`;
    if (cauHoiTxt) cauHoiTxt.innerHTML = `${phanTuCau.instruction ? `<div class="exam-instruction">${phanTuCau.instruction}</div>` : ''}${phanTuCau.cauHoiText}`;

    let khungDapAn = document.getElementById('test-danh-sach-dap-an');
    if (khungDapAn) {
        khungDapAn.innerHTML = "";
        phanTuCau.luaChon.forEach(da => {
            let nutOpt = document.createElement('button');
            nutOpt.className = "nut-option-test";
            nutOpt.innerText = da;
            nutOpt.onclick = () => KiemTraKetQuaTest(nutOpt, da, phanTuCau.dung);
            if (cheDoThiThuChuan && phanTuCau.selectedAnswer === da) nutOpt.classList.add('exam-selected-answer');
            khungDapAn.appendChild(nutOpt);
        });
    }
    if (cheDoThiThuChuan && phanTuCau.selectedAnswer !== undefined) {
        daBamDapAn = true;
        nutChuyenTest?.classList.remove('an-giau');
    }
}

function KiemTraKetQuaTest(nutBam, textChon, textDung) {
    if ((!cheDoThiThuChuan && daBamDapAn) || testDaHetGio) return;

    if (cheDoThiThuChuan) {
        const cauHienTai = mangCauHoiTest[indexTestHienTai];
        const laLanChonDau = cauHienTai.selectedAnswer === undefined;
        cauHienTai.selectedAnswer = textChon;
        cauHienTai.wasCorrect = textChon === textDung;
        daBamDapAn = true;
        document.querySelectorAll('.nut-option-test').forEach(nut => {
            nut.disabled = false;
            nut.classList.remove('exam-selected-answer');
        });
        nutBam.classList.add('exam-selected-answer');
        if (laLanChonDau) GhiNhanHoatDong('questions', 1);
        document.getElementById('vung-nut-chuyen-test')?.classList.remove('an-giau');
        LuuTienDoThiThu();
        return;
    }

    daBamDapAn = true;
    GhiNhanHoatDong('questions', 1);
    if (cheDoOnCauSai) GhiNhanHoatDong('reviews', 1);

    let tatCaNut = document.querySelectorAll('.nut-option-test');
    tatCaNut.forEach(nut => {
        nut.disabled = true;
        if (!cheDoThiThuChuan && nut.innerText === textDung) nut.classList.add('dap-an-dung-style');
    });

    const cauHienTai = mangCauHoiTest[indexTestHienTai];
    cauHienTai.wasCorrect = textChon === textDung;
    if (textChon === textDung) {
        nutBam.classList.add(cheDoThiThuChuan ? 'exam-selected-answer' : 'dap-an-dung-style');
        soCauDungTest++;
        CongDiemXP(5); 
        XoaCauKhoiSoSai(mangCauHoiTest[indexTestHienTai]?.key);
    } else {
        nutBam.classList.add(cheDoThiThuChuan ? 'exam-selected-answer' : 'dap-an-sai-style');
        LuuCauSai(mangCauHoiTest[indexTestHienTai], textChon);
    }

    if (cauHienTai.explanation && !cheDoThiThuChuan) {
        document.getElementById('test-cau-hoi-text')?.insertAdjacentHTML('beforeend', `<div class="test-answer-explanation"><b>Giải thích:</b> ${cauHienTai.explanation}</div>`);
    }

    const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
    if (nutChuyenTest) nutChuyenTest.classList.remove('an-giau');
}

function ChamCauThiThuHienTai() {
    if (!cheDoThiThuChuan) return;
    const cauHienTai = mangCauHoiTest[indexTestHienTai];
    if (!cauHienTai || cauHienTai.examGraded || cauHienTai.selectedAnswer === undefined) return;
    cauHienTai.examGraded = true;
    cauHienTai.wasCorrect = cauHienTai.selectedAnswer === cauHienTai.dung;
    if (cauHienTai.wasCorrect) {
        soCauDungTest++;
        CongDiemXP(5);
        XoaCauKhoiSoSai(cauHienTai.key);
    } else {
        LuuCauSai(cauHienTai, cauHienTai.selectedAnswer);
    }
}

function CauTestTiepTheo() {
    ChamCauThiThuHienTai();
    indexTestHienTai++;
    if (indexTestHienTai >= mangCauHoiTest.length) {
        KetThucDuongDuaTest();
        const cauHoiTxt = document.getElementById('test-cau-hoi-text');
        const khungDapAn = document.getElementById('test-danh-sach-dap-an');
        const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
        
        LuuKetQuaTest();
        XoaTienDoThiThu(capDoTestChon);
        const tyLe = Math.round(soCauDungTest / mangCauHoiTest.length * 100);
        const nhom = {};
        mangCauHoiTest.forEach(cau => { const ten=(cau.section||'TỔNG HỢP').split('｜')[0]; nhom[ten] ||= {dung:0,tong:0}; nhom[ten].tong++; if(cau.wasCorrect) nhom[ten].dung++; });
        const chiTiet = Object.entries(nhom).map(([ten,kq])=>`<span><b>${kq.dung}/${kq.tong}</b><small>${ten}</small></span>`).join('');
        if (cauHoiTxt) cauHoiTxt.innerHTML = `🎉 <span style="color:#00ffcc; font-size:1.6rem; font-weight:bold;">HOÀN THÀNH!</span><br><p style="font-size:1rem; margin-top:10px; color:#cbd5e1;">Đúng ${soCauDungTest}/${mangCauHoiTest.length} câu · ${tyLe}%. ${tyLe >= 80 ? 'Bạn đang nắm khá chắc phần này.' : 'Hãy ôn lại các câu sai rồi thử lần nữa nhé.'}</p><div class="test-section-results">${chiTiet}</div>`;
        if (khungDapAn) khungDapAn.innerHTML = "";
        if (nutChuyenTest) nutChuyenTest.classList.add('an-giau');
    } else {
        HienThiCauHoiTest();
        LuuTienDoThiThu();
    }
}

function LaySoCauSai(level = capDoTestChon || 'n5') {
    try { return JSON.parse(localStorage.getItem(`${level}_mistake_bank`) || '[]'); } catch { return []; }
}

function LuuCauSai(cauHoi, daChon) {
    if (!cauHoi || !['n5', 'n4', 'n3', 'n2'].includes(capDoTestChon)) return;
    const khoCu = LaySoCauSai(capDoTestChon);
    const banCu = khoCu.find(item => item.key === cauHoi.key);
    const khoSai = khoCu.filter(item => item.key !== cauHoi.key);
    khoSai.unshift({ ...cauHoi, daChon, skill: cauHoi.skill || theLoaiTestChon, savedAt: Date.now(), reviewStage: 0, mistakeCount: (banCu?.mistakeCount || 0) + 1, nextReviewAt: Date.now() });
    localStorage.setItem(`${capDoTestChon}_mistake_bank`, JSON.stringify(khoSai.slice(0, 160)));
}

function XoaCauKhoiSoSai(key) {
    if (!key) return;
    const khoSai = LaySoCauSai(capDoTestChon);
    const item = khoSai.find(cau => cau.key === key);
    if (!item) return;
    if (!cheDoOnCauSai) {
        localStorage.setItem(`${capDoTestChon}_mistake_bank`, JSON.stringify(khoSai.filter(cau => cau.key !== key)));
        return;
    }
    const intervals = [1, 3, 7, 14];
    const stage = (item.reviewStage || 0) + 1;
    if (stage > intervals.length) {
        localStorage.setItem(`${capDoTestChon}_mistake_bank`, JSON.stringify(khoSai.filter(cau => cau.key !== key)));
        return;
    }
    item.reviewStage = stage;
    item.lastReviewedAt = Date.now();
    item.nextReviewAt = Date.now() + intervals[stage - 1] * 86400000;
    localStorage.setItem(`${capDoTestChon}_mistake_bank`, JSON.stringify(khoSai));
}

function LuuKetQuaTest() {
    if (!['n5', 'n4', 'n3', 'n2'].includes(capDoTestChon) || cheDoOnCauSai || !mangCauHoiTest.length) return;
    const thongKe = JSON.parse(localStorage.getItem(`${capDoTestChon}_test_stats`) || '{}');
    const muc = thongKe[theLoaiTestChon] || { attempts: 0, correct: 0, total: 0 };
    muc.attempts++; muc.correct += soCauDungTest; muc.total += mangCauHoiTest.length; muc.lastAt = Date.now();
    thongKe[theLoaiTestChon] = muc;
    localStorage.setItem(`${capDoTestChon}_test_stats`, JSON.stringify(thongKe));
}

function BatDauOnCauSai(level = 'n5') {
    const khoSai = LaySoCauSai(level);
    if (!khoSai.length) return;
    const denHan = khoSai.filter(item => !item.nextReviewAt || item.nextReviewAt <= Date.now());
    if (!denHan.length) { alert('Hôm nay chưa có câu sai đến hạn ôn. Hệ thống sẽ nhắc lại đúng lịch ghi nhớ.'); return; }
    capDoTestChon = level; theLoaiTestChon = 'on-sai'; cheDoOnCauSai = true; cheDoThiThuChuan = false; soCauDungTest = 0;
    mangCauHoiTest = [...denHan].sort((a, b) => (a.nextReviewAt || 0) - (b.nextReviewAt || 0)).slice(0, 20).map(item => ({...item, luaChon: [...item.luaChon].sort(() => Math.random() - .5)}));
    indexTestHienTai = 0; ChuyenTab('man-lam-bai-test'); document.getElementById('pause-test-button')?.setAttribute('hidden', ''); HienThiCauHoiTest(); BatDauDuongDuaTest(mangCauHoiTest.length);
}

function LayTheoVong(mang, soLuong, batDau = 0) {
    return Array.from({length:soLuong}, (_, i) => mang[(batDau + i) % mang.length]);
}

function XoaTheHtmlN3(text = '') {
    const tam = document.createElement('div');
    tam.innerHTML = text;
    tam.querySelectorAll('rt').forEach(rt => rt.remove());
    return tam.textContent.replace(/\s+/g, ' ').trim();
}

function TaoLuaChonTheoKho(giaTriDung, kho, viTri, soLuong = 4) {
    const khac = [...new Set(kho)].filter(value => value && value !== giaTriDung);
    const luaChon = [giaTriDung];
    for (let i = 0; luaChon.length < soLuong && i < khac.length; i++) luaChon.push(khac[(viTri * 7 + i * 11) % khac.length]);
    return luaChon.sort((a,b) => ((a.length * 13 + viTri) % 17) - ((b.length * 13 + viTri) % 17));
}

function TaoDeN3Beta(soDe, grammarData, readingPacks) {
    const quota = soDe <= 3 ? DINH_MUC_DE_N3_A : DINH_MUC_DE_N3_B;
    const batDau = (soDe - 1) * 8;
    const tu = LayTheoVong(N3_MOJI_BANK, 40, batDau);
    const khoCachDoc = N3_MOJI_BANK.map(item => item[1]);
    const khoTu = N3_MOJI_BANK.map(item => item[0]);
    const cauHoi = [];

    tu.slice(0,7).forEach((item,i) => cauHoi.push({
        id:`n3-${soDe}-read-${i+1}`, section:'文字・語彙｜問題1　漢字の読み方', instruction:'＿＿＿の言葉の読み方として最もよいものを、一つ選びなさい。',
        question:item[3].replace(item[0], `<u>${item[0]}</u>`), options:TaoLuaChonTheoKho(item[1],khoCachDoc,batDau+i), answer:0, correctValue:item[1], explanation:`${item[0]}（${item[1]}）：${item[2]}`
    }));
    tu.slice(7,13).forEach((item,i) => cauHoi.push({
        id:`n3-${soDe}-spell-${i+1}`, section:'文字・語彙｜問題2　漢字表記', instruction:'＿＿＿の言葉を漢字で書くとき、最もよいものを一つ選びなさい。',
        question:item[3].replace(item[0], `<u>${item[1]}</u>`), options:TaoLuaChonTheoKho(item[0],khoTu,batDau+i+9), answer:0, correctValue:item[0], explanation:`${item[1]} viết là ${item[0]}（${item[2]}）。`
    }));
    tu.slice(13,24).forEach((item,i) => cauHoi.push({
        id:`n3-${soDe}-context-${i+1}`, section:'文字・語彙｜問題3　文脈規定', instruction:'（　）に入れるのに最もよいものを、一つ選びなさい。',
        question:item[3].replace(item[0], '（　）'), options:TaoLuaChonTheoKho(item[0],khoTu,batDau+i+17), answer:0, correctValue:item[0], explanation:`${item[0]}：${item[2]}`
    }));
    const dongNghia = LayTheoVong(N3_SYNONYM_BANK,5,batDau);
    const khoDongNghia = N3_SYNONYM_BANK.map(item => item[1]);
    dongNghia.forEach((item,i) => {
        const tuGoc = item[0].replace(/する$/,'');
        const cauMau = N3_MOJI_BANK.find(row => row[0] === tuGoc)?.[3] || `${item[0]}ことが大切だ。`;
        cauHoi.push({
            id:`n3-${soDe}-syn-${i+1}`, section:'文字・語彙｜問題4　言い換え類義', instruction:'＿＿＿に意味が最も近いものを、一つ選びなさい。',
            question:cauMau.replace(tuGoc,`<u>${tuGoc}</u>`), options:TaoLuaChonTheoKho(item[1],khoDongNghia,batDau+i+25), answer:0, correctValue:item[1], explanation:`${item[0]} ≈ ${item[1]}`
        });
    });
    const soCauDungPhap = quota['文字・語彙｜問題5　用法'];
    tu.slice(24,24+soCauDungPhap).forEach((item,i) => {
        const cacCauSai = LayTheoVong(N3_MOJI_BANK.filter(x => x[0] !== item[0]),3,batDau+i).map(x => x[3].replace(x[0],item[0]));
        cauHoi.push({id:`n3-${soDe}-usage-${i+1}`,section:'文字・語彙｜問題5　用法',instruction:`次の言葉の使い方として最もよいものを、一つ選びなさい。`,question:`<b>${item[0]}</b>`,options:[item[3],...cacCauSai],answer:0,correctValue:item[3],explanation:`${item[0]}：${item[2]}`});
    });

    const grammarSach = grammarData.filter(item => item.grammar && item.meaning && item.examples?.[0]?.ja && !/[À-ỹ]/.test(item.examples[0].ja));
    const mauNguPhap = LayTheoVong(grammarSach,23,(soDe-1)*17);
    const khoMau = grammarSach.map(item => item.grammar);
    const khoNghia = grammarSach.map(item => item.meaning);
    mauNguPhap.forEach((item,i) => {
        const section = i < 13 ? '文法｜問題1　文の文法' : i < 18 ? '文法｜問題2　文の組み立て' : '文法｜問題3　文章の文法';
        const cauNhat = XoaTheHtmlN3(item.examples[0].ja);
        const hoiTheoMau = i < 13 || i >= 18;
        cauHoi.push({
            id:`n3-${soDe}-grammar-${i+1}`, section,
            instruction:i < 13 ? '文の意味に最も合う文型を、一つ選びなさい。' : i < 18 ? '文の組み立てに必要な文型を、一つ選びなさい。' : '文章の流れに最も合うものを、一つ選びなさい。',
            question:hoiTheoMau ? `${cauNhat}<br><small>Trong câu trên, mẫu ngữ pháp nào được sử dụng?</small>` : `${item.meaning}<br><small>Ý nghĩa trên phù hợp với mẫu nào?</small>`,
            options:TaoLuaChonTheoKho(item.grammar,khoMau,batDau+i+31), answer:0, correctValue:item.grammar, explanation:`${item.grammar}：${item.meaning}`
        });
    });

    const pack = readingPacks[(soDe - 1) % readingPacks.length];
    const phanDoc = pack.passages.flatMap(passage => passage.questions.map((q,i) => ({passage,q,i,passageId:passage.id})));
    const nhanDoc = Array(4).fill('読解｜問題4　内容理解（短文）').concat(Array(6).fill('読解｜問題5　内容理解（中文）'),Array(4).fill('読解｜問題6　内容理解（長文）'),Array(2).fill('読解｜問題7　情報検索'));
    phanDoc.slice(0,16).forEach((entry,i) => cauHoi.push({
        id:`n3-${soDe}-reading-${i+1}`, section:nhanDoc[i], instruction:'文章を読んで、質問に答えなさい。', passageId:entry.passageId,
        question:`<div class="exam-passage">${entry.passage.text}</div><b>${entry.q[0]}</b>`, options:entry.q[1], answer:entry.q[2], explanation:`Đáp án được suy ra trực tiếp từ thông tin và ý chính trong đoạn văn.`
    }));

    return cauHoi.map(item => {
        if (item.correctValue === undefined) return item;
        const options = [...item.options];
        const dung = item.correctValue;
        const viTriDung = options.indexOf(dung);
        if (viTriDung > 0) [options[0],options[viTriDung]] = [options[viTriDung],options[0]];
        const xoay = (soDe + item.id.length) % options.length;
        const daTron = options.slice(xoay).concat(options.slice(0,xoay));
        return {...item,options:daTron,answer:daTron.indexOf(dung)};
    });
}

async function BatDauThiThu(level = 'n5') {
    const baiDangDo = LayTienDoThiThu(level);
    if (baiDangDo) {
        capDoTestChon = level;
        if (confirm(`Bạn còn ${baiDangDo.examCode || level.toUpperCase()} đang làm dở. Nhấn OK để làm tiếp; nhấn Hủy để tạo đề mới.`)) {
            TiepTucThiThuDaLuu();
            return;
        }
        XoaTienDoThiThu(level);
    }
    capDoTestChon = level; theLoaiTestChon = 'thi-thu'; cheDoOnCauSai = false; soCauDungTest = 0;
    ChuyenTab('man-lam-bai-test');
    document.getElementById('pause-test-button').hidden = true;
    document.getElementById('test-cau-hoi-text').textContent = `Đang tạo đề thi thử ${level.toUpperCase()}…`;
    try {
        if (level === 'n5') {
            const [response, extraResponse] = await Promise.all([fetch('./n5_mock_july_style.json?v=2'), fetch('./n5_mock_bank_extra.json?v=1')]);
            if (!response.ok || !extraResponse.ok) throw new Error('data');
            const nganHang = [...await response.json(), ...await extraResponse.json()];
            const deThi = TaoDeN5TheoDinhMuc(nganHang);
            cheDoThiThuChuan = true;
            mangCauHoiTest = deThi.map(item => ({cauHoiText:item.question,dung:item.options[item.answer],luaChon:[...item.options],key:`n5-official-${item.id}`,skill:item.section.startsWith('読解')?'reading':item.section.startsWith('文法')?'ngu-phap':'tu-vung',section:item.section,instruction:item.instruction,explanation:item.explanation}));
            indexTestHienTai=0; HienThiCauHoiTest(); BatDauDuongDuaTest(mangCauHoiTest.length, 105*60);
            const maDe = localStorage.getItem('n5_last_exam_code') || 'N5';
            maDeThiThuHienTai = maDe;
            document.getElementById('pause-test-button').hidden = false;
            document.getElementById('race-message').textContent = `${maDe} · Chế độ thi thật: đáp án và lời giải chỉ xuất hiện trong phần ôn câu sai.`;
            LuuTienDoThiThu();
            return;
        }
        if (level === 'n4') {
            const [bankResponse, bank02Response, bank03Response, reading04Response, reading0506Response, kanjiResponse] = await Promise.all([
                fetch('./n4_mock_official_bank.json?v=1'),
                fetch('./n4_mock_set02_bank.json?v=1'),
                fetch('./n4_mock_set03_bank.json?v=1'),
                fetch('./n4_mock_reading_expansion04.json?v=1'),
                fetch('./n4_mock_reading_r05_r06.json?v=1'),
                fetch('./n4_quiz.json?v=6')
            ]);
            if (!bankResponse.ok || !bank02Response.ok || !bank03Response.ok || !reading04Response.ok || !reading0506Response.ok || !kanjiResponse.ok) throw new Error('data');
            const bank = [...await bankResponse.json(), ...await bank02Response.json(), ...await bank03Response.json(), ...await reading04Response.json(), ...await reading0506Response.json()];
            const kanji = await kanjiResponse.json();
            const readingPool = kanji.map(item => {
                const options = item.options?.length === 4 ? [...item.options] : TaoLuaChonKana(item.correct);
                return {
                    id:`n4-read-${item.id}`,
                    section:'文字・語彙｜問題1　漢字の読み方',
                    instruction:'＿＿＿のことばは、ひらがなでどう書きますか。',
                    question:`<u>${item.kanji}</u> の読み方を選んでください。`,
                    options,
                    answer:options.indexOf(item.correct),
                    explanation:`${item.kanji} đọc là ${item.correct}（${item.meaning}）。`
                };
            });
            const vongTruoc = Number(localStorage.getItem('n4_mock_rotation_last') || 0);
            const vongDe = vongTruoc % 5 + 1;
            localStorage.setItem('n4_mock_rotation_last',String(vongDe));
            const deThi = TaoDeTheoDinhMuc([...readingPool, ...bank], DINH_MUC_DE_N4, 'n4', 7);
            localStorage.setItem('n4_last_exam_code',`N4-R${String(vongDe).padStart(2,'0')}`);
            cheDoThiThuChuan = true;
            mangCauHoiTest = deThi.map(item => ({cauHoiText:item.question,dung:item.options[item.answer],luaChon:[...item.options],key:`n4-official-${item.id}`,skill:item.section.startsWith('読解')?'reading':item.section.startsWith('文法')?'ngu-phap':'tu-vung',section:item.section,instruction:item.instruction,explanation:item.explanation}));
            indexTestHienTai=0; HienThiCauHoiTest(); BatDauDuongDuaTest(mangCauHoiTest.length, 80*60);
            const maDe = localStorage.getItem('n4_last_exam_code') || 'N4';
            maDeThiThuHienTai = maDe;
            document.getElementById('pause-test-button').hidden = false;
            document.getElementById('race-message').textContent = `${maDe} · 25 phút Từ vựng + 55 phút Ngữ pháp/Đọc hiểu · Không hiển thị đáp án khi đang thi.`;
            LuuTienDoThiThu();
            return;
        }
        if (level === 'n3') {
            const [grammarResponse, readingResponse, profileResponse] = await Promise.all([
                fetch('./n3_grammar.json?v=5'),
                fetch('./n3_mock_reading_bank.json?v=1'),
                fetch('./n3_mock_profiles.json?v=2')
            ]);
            if (!grammarResponse.ok || !readingResponse.ok || !profileResponse.ok) throw new Error('data');
            const [grammarData, readingPacks, profiles] = await Promise.all([grammarResponse.json(),readingResponse.json(),profileResponse.json()]);
            const lanTruoc = Number(localStorage.getItem('n3_mock_set_last') || 0);
            const soDe = lanTruoc % 6 + 1;
            localStorage.setItem('n3_mock_set_last',String(soDe));
            const deThi = TaoDeN3Beta(soDe,grammarData,readingPacks);
            const profile = profiles[soDe-1];
            const quota = soDe <= 3 ? DINH_MUC_DE_N3_A : DINH_MUC_DE_N3_B;
            const dungDinhMuc = Object.entries(quota).every(([section,count]) => deThi.filter(item => item.section === section).length === count);
            if (!dungDinhMuc || deThi.length !== profile.questions) throw new Error('quota');
            cheDoThiThuChuan = true;
            mangCauHoiTest = deThi.map(item => ({cauHoiText:item.question,dung:item.options[item.answer],luaChon:[...item.options],key:item.id,skill:item.section.startsWith('読解')?'reading':item.section.startsWith('文法')?'ngu-phap':'tu-vung',section:item.section,instruction:item.instruction,explanation:item.explanation,passageId:item.passageId}));
            indexTestHienTai=0;
            maDeThiThuHienTai=`N3-${profile.rotation}`;
            HienThiCauHoiTest();
            BatDauDuongDuaTest(mangCauHoiTest.length,100*60);
            document.getElementById('pause-test-button').hidden=false;
            document.getElementById('race-message').textContent=`${maDeThiThuHienTai} / 06 · ${profile.vocabularyQuestions} 文字・語彙 + 23 文法 + 16 読解 · 100 phút.`;
            LuuTienDoThiThu();
            return;
        }
        if (level === 'n2') {
            const [coreResponse, readingResponse, core02Response, reading02Response, reading03Response, reading04Response, reading05Response, reading06Response] = await Promise.all([
                fetch('./n2_mock_verified_core.json?v=4'),
                fetch('./n2_mock_beta_reading.json?v=5'),
                fetch('./n2_mock_set02_core.json?v=1'),
                fetch('./n2_mock_set02_reading.json?v=2'),
                fetch('./n2_mock_reading_r03.json?v=1'),
                fetch('./n2_mock_reading_r04.json?v=1'),
                fetch('./n2_mock_reading_r05.json?v=1'),
                fetch('./n2_mock_reading_r06.json?v=1')
            ]);
            if (!coreResponse.ok || !readingResponse.ok || !core02Response.ok || !reading02Response.ok || !reading03Response.ok || !reading04Response.ok || !reading05Response.ok || !reading06Response.ok) throw new Error('data');
            const [core, reading, core02, reading02, reading03, reading04, reading05, reading06] = await Promise.all([
                coreResponse.json(), readingResponse.json(), core02Response.json(), reading02Response.json(), reading03Response.json(), reading04Response.json(), reading05Response.json(), reading06Response.json()
            ]);
            const cacKhoDoc = [reading, reading02, reading03, reading04, reading05, reading06];
            const de01 = [...core, ...reading];
            const de02 = [...core02, ...reading02];
            const taoDeKetHop = soDeKetHop => {
                const deKetHop = [];
                Object.entries(DINH_MUC_DE_N2).forEach(([section, quota], sectionIndex) => {
                    if (section.startsWith('読解')) {
                        const boDocNguyenVen = cacKhoDoc[(soDeKetHop - 1) % cacKhoDoc.length];
                        deKetHop.push(...boDocNguyenVen.filter(item => item.section === section));
                        return;
                    }
                    const nhom01 = de01.filter(item => item.section === section);
                    const nhom02 = de02.filter(item => item.section === section);
                    for (let viTri = 0; viTri < quota; viTri++) {
                        const maTran = (viTri * 17 + sectionIndex * 7 + soDeKetHop * 11) % 19;
                        deKetHop.push(maTran < 9 ? nhom01[viTri] : nhom02[viTri]);
                    }
                });
                return deKetHop;
            };
            const maDeTruoc = Number(localStorage.getItem('n2_mock_set_last') || 0);
            const soDe = maDeTruoc % 9 + 1;
            localStorage.setItem('n2_mock_set_last', String(soDe));
            const nganHang = soDe === 1 ? de01 : soDe === 2 ? de02 : taoDeKetHop(soDe);
            const deThi = TaoDeTheoDinhMuc(nganHang, DINH_MUC_DE_N2, 'n2', 1);
            const deThiTheoNhom = Object.keys(DINH_MUC_DE_N2).flatMap(section => {
                const nhom = deThi.filter(item => item.section === section);
                if (!section.startsWith('読解')) return nhom;
                return nhom.sort((a,b) =>
                    (a.passageId || a.id).localeCompare(b.passageId || b.id, 'ja') ||
                    a.id.localeCompare(b.id, 'ja')
                );
            });
            cheDoThiThuChuan = true;
            mangCauHoiTest = deThiTheoNhom.map(item => ({cauHoiText:item.question,dung:item.options[item.answer],luaChon:[...item.options],key:`n2-set-${soDe}-${item.id}`,skill:item.section.startsWith('読解')?'reading':item.section.startsWith('文法')?'ngu-phap':'tu-vung',section:item.section,instruction:item.instruction,explanation:item.explanation}));
            indexTestHienTai=0; HienThiCauHoiTest(); BatDauDuongDuaTest(mangCauHoiTest.length, 105*60);
            const maDe = `N2-${String(soDe).padStart(2, '0')}`;
            const maKhoDoc = `R${String((soDe - 1) % cacKhoDoc.length + 1).padStart(2, '0')}`;
            maDeThiThuHienTai = maDe;
            document.getElementById('pause-test-button').hidden = false;
            document.getElementById('race-message').textContent = `${maDe} / 09 · Kho đọc ${maKhoDoc} nguyên bộ · 71 câu / 105 phút.`;
            LuuTienDoThiThu();
            return;
        }
        const [kanjiRes, grammarRes] = await Promise.all([fetch(`./${level}_quiz.json?v=5`), fetch(`./${level}_grammar.json?v=4`)]);
        if (!kanjiRes.ok || !grammarRes.ok) throw new Error('data');
        const [kanji, grammar] = await Promise.all([kanjiRes.json(), grammarRes.json()]);
        const tron = mang => [...mang].sort(() => Math.random() - .5);
        const deKanji = tron(kanji);
        const cauKanji = deKanji.slice(0,15).map(item => ({cauHoiText:`Chọn cách đọc đúng:<br><span style="font-size:3rem;font-weight:900">${item.kanji}</span>`,dung:item.correct,luaChon:(item.options?.length === 4 ? [...item.options] : TaoLuaChonKana(item.correct)),key:`${level}-mock-k-${item.id}`,skill:'kanji'}));
        const khoNghia = [...new Set(kanji.map(item => item.meaning))];
        const cauVocab = deKanji.slice(15,30).map(item => ({cauHoiText:`Từ <span style="font-size:2.5rem;font-weight:900;color:#5eead4">${item.kanji}</span> có nghĩa là gì?`,dung:item.meaning,luaChon:tron([item.meaning,...tron(khoNghia.filter(x=>x!==item.meaning)).slice(0,3)]),key:`${level}-mock-v-${item.id}`,skill:'tu-vung'}));
        const nghia = grammar.map(x=>x.meaning);
        const cauGrammar = tron(grammar).slice(0,10).map((item,index) => { const kyHieu=DinhDangKyHieuNguPhap(item.grammar); return {cauHoiText:`Mẫu ngữ pháp <b>${kyHieu.hienThi}</b>${kyHieu.chuThich?`<small style="display:block;color:#f0abfc;">${kyHieu.chuThich}</small>`:''} có nghĩa phù hợp nhất là gì?`,dung:item.meaning,luaChon:tron([item.meaning,...tron(nghia.filter(x=>x!==item.meaning)).slice(0,3)]),key:`${level}-mock-g-${index}-${item.grammar}`,skill:'ngu-phap'}; });
        mangCauHoiTest = tron([...cauKanji,...cauVocab,...cauGrammar]); indexTestHienTai=0;
        document.getElementById('pause-test-button').hidden = true;
        HienThiCauHoiTest(); BatDauDuongDuaTest(40);
    } catch { document.getElementById('test-cau-hoi-text').textContent = 'Không tải được dữ liệu thi thử. Hãy thử lại.'; }
}

function TronLuaChonVaGiuDapAn(item) {
    const dapAnDung = item.options[item.answer];
    const options = [...item.options].sort(() => Math.random() - .5);
    return {...item, options, answer:options.indexOf(dapAnDung)};
}

function TaoDeN5TheoDinhMuc(nganHang) {
    return TaoDeTheoDinhMuc(nganHang, DINH_MUC_DE_N5, 'n5', 2);
}

function TaoDeTheoDinhMuc(nganHang, dinhMuc, level, soDeKhoa = 7) {
    const lichSuKey = `${level}_exam_history_v2`;
    const tanSuatKey = `${level}_exam_usage_v2`;
    const lichSu = JSON.parse(localStorage.getItem(lichSuKey) || '[]');
    const tanSuat = JSON.parse(localStorage.getItem(tanSuatKey) || '{}');
    const tapBiKhoa = new Set(lichSu.slice(-soDeKhoa).flatMap(de => de.ids || []));
    const lanGapGanNhat = new Map();
    lichSu.forEach((de, thuTu) => (de.ids || []).forEach(id => lanGapGanNhat.set(id, thuTu)));
    const deThi = [];
    Object.entries(dinhMuc).forEach(([section, soCau]) => {
        const pool = nganHang.filter(cau => cau.section === section);
        if (pool.length < soCau) throw new Error(`Thiếu câu cho ${section}`);
        const chuaBiKhoa = pool.filter(cau => !tapBiKhoa.has(cau.id));
        const ungVien = chuaBiKhoa.length >= soCau ? chuaBiKhoa : pool;
        const uuTienCongBang = [...ungVien].sort((a,b) =>
            (tanSuat[a.id] || 0) - (tanSuat[b.id] || 0) ||
            (lanGapGanNhat.get(a.id) ?? -1) - (lanGapGanNhat.get(b.id) ?? -1) ||
            Math.random() - .5
        );
        deThi.push(...uuTienCongBang.slice(0, soCau).map(TronLuaChonVaGiuDapAn));
    });
    const ids = deThi.map(cau => cau.id);
    ids.forEach(id => { tanSuat[id] = (tanSuat[id] || 0) + 1; });
    const code = `${level.toUpperCase()}-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    localStorage.setItem(lichSuKey, JSON.stringify([...lichSu, {code, ids, at:Date.now()}].slice(-30)));
    localStorage.setItem(tanSuatKey, JSON.stringify(tanSuat));
    localStorage.setItem(`${level}_last_exam_code`, code);
    return deThi;
}

function TyLeKetQua(thongKe, key) {
    const muc = thongKe[key];
    return muc?.total ? Math.round(muc.correct / muc.total * 100) : 0;
}

function MoLoTrinhN5() {
    const thongKe = JSON.parse(localStorage.getItem('n5_test_stats') || '{}');
    const completed = JSON.parse(localStorage.getItem('reading_completed') || '{}');
    const soBaiDoc = Object.keys(completed).filter(key => key.startsWith('n5-') && completed[key]).length;
    const kanjiRate = TyLeKetQua(thongKe, 'kanji');
    const hanVietRate = TyLeKetQua(thongKe, 'han-viet');
    const grammarRate = TyLeKetQua(thongKe, 'ngu-phap');
    const vocabRate = TyLeKetQua(thongKe, 'tu-vung');
    const readingStats = JSON.parse(localStorage.getItem('n5_reading_stats') || '{}');
    const tienDoKanjiLuu = localStorage.getItem('tien_do_n5');
    const soKanjiDaHoc = tienDoKanjiLuu === null ? 0 : Math.min(99, Math.max(0, parseInt(tienDoKanjiLuu) + 1));
    const kanjiCompletion = Math.round(soKanjiDaHoc / 99 * 100);
    const readingCompletion = Math.min(100, Math.round(soBaiDoc / 24 * 100));
    const readingAccuracy = readingStats.total ? Math.round(readingStats.correct / readingStats.total * 100) : 0;
    const readingRate = readingStats.total ? Math.round(readingCompletion * .6 + readingAccuracy * .4) : readingCompletion;
    const writingRecord = JSON.parse(localStorage.getItem('writing_test_best_n5_10') || 'null');
    const writingBest = writingRecord?.score || 0;
    const mockRate = TyLeKetQua(thongKe, 'thi-thu');
    const readiness = Math.round(kanjiRate * .15 + vocabRate * .1 + grammarRate * .2 + readingRate * .2 + writingBest * .1 + mockRate * .25);
    const sai = LaySoCauSai('n5').length;
    document.getElementById('n5-readiness-score').textContent = readiness;
    document.getElementById('n5-readiness-ring').style.setProperty('--score', `${readiness * 3.6}deg`);
    document.getElementById('n5-readiness-title').textContent = readiness >= 80 ? 'Sẵn sàng thi thử' : readiness >= 55 ? 'Đang tiến bộ tốt' : readiness >= 25 ? 'Đang xây nền' : 'Bắt đầu xây nền';
    document.getElementById('n5-readiness-note').textContent = readiness >= 80 ? 'Hãy duy trì độ chính xác và ôn sạch sổ câu sai.' : 'Ưu tiên hoàn thành lần lượt Hán Việt, ngữ pháp rồi đọc hiểu.';
    const setBar = (id, value) => document.getElementById(id).style.width = `${value}%`;
    setBar('n5-kanji-bar', Math.max(kanjiCompletion, hanVietRate, kanjiRate, vocabRate)); setBar('n5-grammar-bar', grammarRate); setBar('n5-reading-bar', readingRate);
    document.getElementById('n5-kanji-status').textContent = hanVietRate ? `Đã xem ${soKanjiDaHoc}/99 chữ · Hán Việt: ${hanVietRate}%` : `Đã xem ${soKanjiDaHoc}/99 chữ · Hãy kiểm tra âm Hán Việt`;
    document.getElementById('n5-grammar-status').textContent = grammarRate ? `Độ chính xác: ${grammarRate}%` : 'Chưa có kết quả kiểm tra';
    document.getElementById('n5-reading-status').textContent = `${soBaiDoc}/24 bài hoàn thành`;
    document.getElementById('n5-mistake-status').textContent = sai ? `${sai} câu đang chờ bạn chinh phục lại` : 'Tuyệt vời, chưa có câu cần ôn';
    document.getElementById('n5-mock-status').textContent = mockRate ? `Kết quả tích lũy: ${mockRate}%` : 'Chưa thi thử';
    document.getElementById('n5-review-button').disabled = !sai;
    ChuyenTab('man-n5-path');
}

function MoLoTrinhN4() {
    const level = 'n4';
    const thongKe = JSON.parse(localStorage.getItem('n4_test_stats') || '{}');
    const completed = JSON.parse(localStorage.getItem('reading_completed') || '{}');
    const soBaiDoc = Object.keys(completed).filter(key => key.startsWith('n4-') && completed[key]).length;
    const rate = key => TyLeKetQua(thongKe, key);
    const kanjiRate=rate('kanji'), hanVietRate=rate('han-viet'), vocabRate=rate('tu-vung'), grammarRate=rate('ngu-phap'), mockRate=rate('thi-thu');
    const readingStats = JSON.parse(localStorage.getItem('n4_reading_stats') || '{}');
    const readingCompletion = Math.min(100, Math.round(soBaiDoc / 16 * 100));
    const readingAccuracy = readingStats.total ? Math.round(readingStats.correct / readingStats.total * 100) : 0;
    const readingRate = readingStats.total ? Math.round(readingCompletion*.6 + readingAccuracy*.4) : readingCompletion;
    const tienDo = localStorage.getItem('tien_do_n4');
    const soKanji = tienDo === null ? 0 : Math.min(186, Math.max(0, parseInt(tienDo)+1));
    const kanjiCompletion = Math.round(soKanji/186*100);
    const readiness = Math.round(kanjiRate*.2 + vocabRate*.1 + grammarRate*.25 + readingRate*.2 + mockRate*.25);
    const sai = LaySoCauSai(level).length;
    document.getElementById('n4-readiness-score').textContent=readiness;
    document.getElementById('n4-readiness-ring').style.setProperty('--score',`${readiness*3.6}deg`);
    document.getElementById('n4-readiness-title').textContent=readiness>=80?'Sẵn sàng luyện đề N4':readiness>=55?'Đang tiến bộ tốt':readiness>=25?'Đang xây nền N4':'Bắt đầu xây nền N4';
    document.getElementById('n4-readiness-note').textContent=readiness>=80?'Tiếp tục sửa câu sai và giữ điểm thi thử ổn định.':'Ưu tiên Hán Việt, ngữ pháp rồi mới tăng tốc đọc hiểu.';
    const bar=(id,value)=>document.getElementById(id).style.width=`${value}%`;
    let vocabMastered = 0;
    try { vocabMastered = JSON.parse(localStorage.getItem('n4_vocab_mastered') || '[]').length; } catch {}
    const vocabCompletion = Math.min(100, Math.round(vocabMastered / 60 * 100));
    bar('n4-kanji-bar',Math.max(kanjiCompletion,hanVietRate,kanjiRate));bar('n4-vocab-bar',Math.max(vocabCompletion,vocabRate));bar('n4-grammar-bar',grammarRate);bar('n4-reading-bar',readingRate);
    document.getElementById('n4-kanji-status').textContent=`Đã xem ${soKanji}/186 chữ${hanVietRate?` · Hán Việt ${hanVietRate}%`:''}`;
    document.getElementById('n4-vocab-status').textContent=vocabMastered?`Đã nhớ ${vocabMastered}/60 từ`:'Chưa bắt đầu';
    document.getElementById('n4-grammar-status').textContent=grammarRate?`Độ chính xác: ${grammarRate}%`:'Chưa có kết quả kiểm tra';
    document.getElementById('n4-reading-status').textContent=`${soBaiDoc}/16 bài hoàn thành`;
    document.getElementById('n4-mistake-status').textContent=sai?`${sai} câu đang chờ ôn lại`:'Chưa có câu cần ôn';
    document.getElementById('n4-mock-status').textContent=mockRate?`Kết quả tích lũy: ${mockRate}%`:'Chưa thi thử';
    document.getElementById('n4-review-button').disabled=!sai;
    ChuyenTab('man-n4-path');
}

function DinhDangKyHieuNguPhap(cauTruc = '') {
    let hienThi = String(cauTruc)
        .replace('～V可能形ようになる', '～V可能形 + ようになる')
        .replace('～Vる・ないようにする', '～V辞書形・Vない形 + ようにする')
        .replace('～Vるようになる', '～V辞書形 + ようになる')
        .replace(/V-る/g, 'V辞書形')
        .replace(/V-ない/g, 'Vない形')
        .replace(/V-た/g, 'Vた形')
        .replace(/V-て/g, 'Vて形')
        .replace(/～Ｖ受身（うけみ）/g, '～V受身形')
        .replace(/~V使役受身（しえきうけみ）/g, '～V使役受身形')
        .replace(/~V使役（しえき）/g, '～V使役形')
        .replace(/V禁止（きんし）/g, 'V禁止形');
    const chuThich = [
        ['V辞書形', 'động từ thể từ điển'],
        ['Vない形', 'động từ thể ない'],
        ['Vた形', 'động từ thể た'],
        ['Vて形', 'động từ thể て'],
        ['V可能形', 'động từ thể khả năng'],
        ['V受身形', 'động từ thể bị động'],
        ['V使役受身形', 'động từ thể sai khiến bị động'],
        ['V使役形', 'động từ thể sai khiến'],
        ['V禁止形', 'động từ thể cấm đoán']
    ].filter(([kyHieu]) => hienThi.includes(kyHieu));
    return {hienThi, chuThich:chuThich.map(([kyHieu,nghia]) => `${kyHieu}（${nghia}）`).join(' · ')};
}

function CongDiemXP(soDiem) {
    diemXP += soDiem;
    localStorage.setItem('kanji_pure_xp', diemXP);
    const khungXp = document.getElementById('id-xp');
    if (khungXp) khungXp.innerText = diemXP;
    GhiNhanHoatDong('xp', soDiem);
}

// =========================================================================
// 文字・語彙 N2 - học theo chủ đề, nghe, đánh dấu nhớ và kiểm tra nhanh
// =========================================================================
function LayTienDoTuVungN2() {
    try { return new Set(JSON.parse(localStorage.getItem(`${vocabStudyLevel}_vocab_mastered`) || '[]')); }
    catch { return new Set(); }
}

function LuuTienDoTuVungN2(tapDaNho) {
    localStorage.setItem(`${vocabStudyLevel}_vocab_mastered`, JSON.stringify([...tapDaNho]));
    CapNhatTongQuanTuVungN2();
}

function EscapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

async function MoKhoTuVungN2() {
    return MoKhoTuVungJLPT('n2');
}

async function MoKhoTuVungJLPT(level = 'n2') {
    vocabStudyLevel = level.toLowerCase();
    n2VocabData = [];
    n2VocabSessionIds = null;
    ChuyenTab('man-n2-vocab');
    const label = vocabStudyLevel.toUpperCase();
    document.getElementById('vocab-level-eyebrow').textContent = `文字・語彙・${label}`;
    document.getElementById('vocab-level-title').textContent = `Kho từ vựng ${label}`;
    document.querySelector('#man-n2-vocab-quiz h2').textContent = `Kiểm tra nhanh ${label}`;
    document.getElementById('vocab-back-button').onclick = () => vocabStudyLevel === 'n4' ? MoLoTrinhN4() : ChuyenTab('man-study-hub');
    document.getElementById('n2-vocab-list').innerHTML = `<div class="reading-loading">Đang mở kho 文字・語彙 ${label}…</div>`;
    try {
        const response = await fetch(`./${vocabStudyLevel}_moji_goi.json?v=1`);
        if (!response.ok) throw new Error('Không tải được kho từ vựng');
        n2VocabData = await response.json();
        const select = document.getElementById('n2-vocab-topic');
        const topics = [...new Map(n2VocabData.map(item => [item.topicId, item.topic])).entries()];
        select.innerHTML = '<option value="all">Tất cả chủ đề</option>' + topics.map(([id,name]) => `<option value="${EscapeHtml(id)}">${EscapeHtml(name)}</option>`).join('');
        document.getElementById('vocab-total-label').textContent = `/${n2VocabData.length} đã nhớ`;
        HienThiKhoTuVungN2();
    } catch {
        document.getElementById('n2-vocab-list').innerHTML = `<div class="reading-error">Không tải được kho 文字・語彙 ${label}. Hãy tải lại trang và thử lại.</div>`;
    }
}

function CapNhatTongQuanTuVungN2() {
    const mastered = LayTienDoTuVungN2();
    const total = n2VocabData.length || (vocabStudyLevel === 'n4' ? 60 : 120);
    const count = n2VocabData.length ? n2VocabData.filter(item => mastered.has(item.id)).length : mastered.size;
    const percent = Math.min(100, Math.round(count / total * 100));
    const number = document.getElementById('n2-vocab-mastered');
    const ring = document.getElementById('n2-vocab-progress-ring');
    const bar = document.getElementById('n2-vocab-progress-bar');
    if (number) number.textContent = count;
    if (ring) ring.style.setProperty('--vocab-progress', `${percent * 3.6}deg`);
    if (bar) bar.style.width = `${percent}%`;
}

function LayDanhSachTuVungDangLoc() {
    const query = (document.getElementById('n2-vocab-search')?.value || '').trim().toLowerCase();
    const topic = document.getElementById('n2-vocab-topic')?.value || 'all';
    const status = document.getElementById('n2-vocab-status')?.value || 'all';
    const mastered = LayTienDoTuVungN2();
    return n2VocabData.filter(item => {
        if (n2VocabSessionIds && !n2VocabSessionIds.has(item.id)) return false;
        if (topic !== 'all' && item.topicId !== topic) return false;
        if (status === 'new' && mastered.has(item.id)) return false;
        if (status === 'mastered' && !mastered.has(item.id)) return false;
        if (!query) return true;
        return [item.word,item.reading,item.hanViet,item.meaning,item.topic,item.example].join(' ').toLowerCase().includes(query);
    });
}

function HienThiKhoTuVungN2() {
    if (!n2VocabData.length) return;
    const list = LayDanhSachTuVungDangLoc();
    const mastered = LayTienDoTuVungN2();
    document.getElementById('n2-vocab-result-count').textContent = `${list.length}/${n2VocabData.length} từ${n2VocabSessionIds ? ' trong buổi học' : ''}`;
    document.getElementById('n2-vocab-list').innerHTML = list.length ? list.map(item => {
        const done = mastered.has(item.id);
        return `<article class="vocab-item ${done ? 'mastered' : ''}" id="vocab-${EscapeHtml(item.id)}">
            <button class="vocab-main" onclick="MoChiTietTuVung('${EscapeHtml(item.id)}')">
                <span class="vocab-word"><b>${EscapeHtml(item.word)}</b><small>${EscapeHtml(item.reading)}</small></span>
                <span class="vocab-meaning"><small>${EscapeHtml(item.hanViet || item.pos)}</small><strong>${EscapeHtml(item.meaning)}</strong><em>${EscapeHtml(item.topic)}</em></span>
                <i>${done ? '✓' : '＋'}</i>
            </button>
            <div class="vocab-detail an-giau">
                <p class="vocab-example"><b>${EscapeHtml(item.example)}</b><span>${EscapeHtml(item.translation)}</span></p>
                <div class="vocab-relations"><span><small>TỪ LOẠI</small>${EscapeHtml(item.pos)}</span><span><small>CỤM HAY GẶP</small>${EscapeHtml(item.collocation)}</span>${item.synonym ? `<span><small>GẦN NGHĨA</small>${EscapeHtml(item.synonym)}</span>` : ''}${item.contrast ? `<span><small>DỄ PHÂN BIỆT</small>${EscapeHtml(item.contrast)}</span>` : ''}</div>
                <div class="vocab-item-actions"><button onclick="DocTuVungN2('${EscapeHtml(item.id)}')">🔊 Nghe từ & ví dụ</button><button class="remember ${done ? 'active' : ''}" onclick="DanhDauNhoTuVung('${EscapeHtml(item.id)}')">${done ? '✓ Đã nhớ' : '○ Đánh dấu đã nhớ'}</button></div>
            </div>
        </article>`;
    }).join('') : '<div class="vocab-empty">Không có từ nào khớp bộ lọc này.</div>';
    CapNhatTongQuanTuVungN2();
}

function MoChiTietTuVung(id) {
    document.querySelector(`#vocab-${CSS.escape(id)} .vocab-detail`)?.classList.toggle('an-giau');
}

function DanhDauNhoTuVung(id) {
    const mastered = LayTienDoTuVungN2();
    if (mastered.has(id)) mastered.delete(id); else { mastered.add(id); CongDiemXP(2); }
    LuuTienDoTuVungN2(mastered);
    HienThiKhoTuVungN2();
}

function DocTuVungN2(id) {
    const item = n2VocabData.find(word => word.id === id);
    if (!item || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${item.word}。${item.example}`);
    utterance.lang = 'ja-JP'; utterance.rate = .82;
    speechSynthesis.speak(utterance);
}

function Hoc10TuTiepTheo() {
    const mastered = LayTienDoTuVungN2();
    const start = n2VocabData.findIndex(item => !mastered.has(item.id));
    const ordered = start < 0 ? n2VocabData : [...n2VocabData.slice(start), ...n2VocabData.slice(0,start)];
    n2VocabSessionIds = new Set(ordered.slice(0,10).map(item => item.id));
    document.getElementById('n2-vocab-search').value = '';
    document.getElementById('n2-vocab-topic').value = 'all';
    document.getElementById('n2-vocab-status').value = 'all';
    HienThiKhoTuVungN2();
    document.querySelector('.n2-vocab-list')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function LocTuVungChuaNho() {
    n2VocabSessionIds = null;
    document.getElementById('n2-vocab-status').value = 'new';
    HienThiKhoTuVungN2();
}

function DatLaiBoLocTuVung() {
    n2VocabSessionIds = null;
    document.getElementById('n2-vocab-search').value = '';
    document.getElementById('n2-vocab-topic').value = 'all';
    document.getElementById('n2-vocab-status').value = 'all';
    HienThiKhoTuVungN2();
}

function TronMang(mang) { return [...mang].sort(() => Math.random() - .5); }

function TaoBonLuaChon(dapAn, ungVien) {
    const khac = [...new Set(ungVien)].filter(value => value && value !== dapAn);
    return TronMang([dapAn, ...TronMang(khac).slice(0,3)]);
}

function TaoCauHoiTuVung(item, index) {
    const type = ['reading','meaning','context'][index % 3];
    const sameTopic = n2VocabData.filter(word => word.id !== item.id && word.topicId === item.topicId);
    if (type === 'reading') {
        const options = TaoBonLuaChon(item.reading,n2VocabData.filter(word => word.id !== item.id).map(word => word.reading));
        return {item,type,label:'CÁCH ĐỌC',prompt:'Chọn cách đọc đúng',word:item.word,options,answer:options.indexOf(item.reading)};
    }
    if (type === 'meaning') {
        const options = TaoBonLuaChon(item.meaning,sameTopic.map(word => word.meaning));
        return {item,type,label:'Ý NGHĨA',prompt:'Chọn nghĩa phù hợp nhất',word:`${item.word}（${item.reading}）`,options,answer:options.indexOf(item.meaning)};
    }
    const options = TaoBonLuaChon(item.word,sameTopic.map(word => word.word));
    return {item,type,label:'NGỮ CẢNH',prompt:item.cloze || item.example.replace(item.word,'（　）'),word:'Điền từ thích hợp vào câu',options,answer:options.indexOf(item.word)};
}

function BatDauKiemTraTuVungN2() {
    if (!n2VocabData.length) return;
    const mastered = LayTienDoTuVungN2();
    const uuTien = [...n2VocabData.filter(item => !mastered.has(item.id)), ...n2VocabData.filter(item => mastered.has(item.id))];
    const chosen = TronMang(uuTien.slice(0,Math.max(30,uuTien.length))).slice(0,10);
    n2VocabQuiz = chosen.map(TaoCauHoiTuVung);
    n2VocabQuizIndex = 0; n2VocabQuizScore = 0; n2VocabQuizAnswered = false;
    ChuyenTab('man-n2-vocab-quiz'); HienThiCauHoiTuVungN2();
}

function HienThiCauHoiTuVungN2() {
    const q = n2VocabQuiz[n2VocabQuizIndex]; if (!q) return;
    n2VocabQuizAnswered = false;
    document.getElementById('n2-vocab-quiz-type').textContent = q.label;
    document.getElementById('n2-vocab-quiz-count').textContent = `${n2VocabQuizIndex + 1}/${n2VocabQuiz.length}`;
    document.getElementById('n2-vocab-quiz-progress').style.width = `${n2VocabQuizIndex / n2VocabQuiz.length * 100}%`;
    document.getElementById('n2-vocab-quiz-prompt').textContent = q.prompt;
    document.getElementById('n2-vocab-quiz-word').textContent = q.word;
    document.getElementById('n2-vocab-quiz-options').innerHTML = q.options.map((option,index) => `<button onclick="TraLoiKiemTraTuVung(${index},this)">${EscapeHtml(option)}</button>`).join('');
    document.getElementById('n2-vocab-quiz-explanation').classList.add('an-giau');
    document.getElementById('n2-vocab-quiz-next').classList.add('an-giau');
}

function TraLoiKiemTraTuVung(optionIndex, button) {
    if (n2VocabQuizAnswered) return;
    n2VocabQuizAnswered = true;
    const q = n2VocabQuiz[n2VocabQuizIndex];
    const buttons = [...document.querySelectorAll('#n2-vocab-quiz-options button')];
    buttons.forEach((item,index) => { item.disabled = true; if (index === q.answer) item.classList.add('correct'); });
    const correct = optionIndex === q.answer;
    if (correct) { n2VocabQuizScore++; button.classList.add('correct'); CongDiemXP(3); }
    else {
        button.classList.add('wrong');
        const wrongKey = `${vocabStudyLevel}_vocab_wrong`;
        const wrong = new Set(JSON.parse(localStorage.getItem(wrongKey) || '[]')); wrong.add(q.item.id);
        localStorage.setItem(wrongKey,JSON.stringify([...wrong]));
    }
    const aside = document.getElementById('n2-vocab-quiz-explanation');
    aside.innerHTML = `<b>${correct ? 'Chính xác!' : 'Chưa đúng.'}</b> ${EscapeHtml(q.item.word)}（${EscapeHtml(q.item.reading)}）— ${EscapeHtml(q.item.meaning)}<br>${EscapeHtml(q.item.example)}<br><span>${EscapeHtml(q.item.translation)}</span>`;
    aside.classList.remove('an-giau');
    const next = document.getElementById('n2-vocab-quiz-next'); next.textContent = n2VocabQuizIndex === n2VocabQuiz.length - 1 ? 'XEM KẾT QUẢ →' : 'CÂU TIẾP THEO →'; next.classList.remove('an-giau');
}

function CauTuVungTiepTheo() {
    if (!n2VocabQuizAnswered) return;
    if (++n2VocabQuizIndex < n2VocabQuiz.length) { HienThiCauHoiTuVungN2(); return; }
    const card = document.querySelector('.vocab-quiz-card');
    document.getElementById('n2-vocab-quiz-progress').style.width = '100%';
    document.getElementById('n2-vocab-quiz-type').textContent = 'HOÀN THÀNH';
    document.getElementById('n2-vocab-quiz-count').textContent = `${n2VocabQuizScore}/10`;
    document.getElementById('n2-vocab-quiz-prompt').textContent = 'Kết quả kiểm tra nhanh';
    document.getElementById('n2-vocab-quiz-word').textContent = `${n2VocabQuizScore * 10}%`;
    document.getElementById('n2-vocab-quiz-options').innerHTML = `<button onclick="BatDauKiemTraTuVungN2()">LÀM BỘ 10 CÂU MỚI</button><button onclick="KetThucKiemTraTuVungN2()">VỀ KHO TỪ VỰNG</button>`;
    document.getElementById('n2-vocab-quiz-explanation').classList.add('an-giau');
    document.getElementById('n2-vocab-quiz-next').classList.add('an-giau');
    localStorage.setItem(`${vocabStudyLevel}_vocab_quiz_last`,JSON.stringify({score:n2VocabQuizScore,total:10,at:Date.now()}));
    card?.scrollIntoView({behavior:'smooth',block:'start'});
}

function KetThucKiemTraTuVungN2() { ChuyenTab('man-n2-vocab'); HienThiKhoTuVungN2(); }

// =========================================================================
// ĐỌC HIỂU JLPT - tải dữ liệu theo level, lưu tiến độ trên thiết bị
// =========================================================================
function MoCapDoDocHieu() {
    const levels = [
        ['n5', 'N5', 'Câu ngắn & thông báo', '3–5 phút'],
        ['n4', 'N4', 'Đoạn văn đời sống', '5–7 phút'],
        ['n3', 'N3', 'Ý chính & suy luận', '7–10 phút'],
        ['n2', 'N2', 'Bài luận & quan điểm', '10–15 phút'],
        ['n1', 'N1', 'Văn bản học thuật', '15–20 phút']
    ];
    const list = document.getElementById('reading-level-list');
    if (list) list.innerHTML = levels.map(([id, name, desc, time]) => `
        <button class="reading-level-card" onclick="TaiDanhSachBaiDoc('${id}')">
            <span class="level-orb">${name}</span><span><b>JLPT ${name}</b><small>${desc}</small></span><em>${time} ›</em>
        </button>`).join('');
    ChuyenTab('man-reading-levels');
}

async function TaiDanhSachBaiDoc(level) {
    readingLevel = level;
    ChuyenTab('man-reading-lessons');
    const title = document.getElementById('reading-list-title');
    const list = document.getElementById('reading-lesson-list');
    if (title) title.textContent = `JLPT ${level.toUpperCase()}`;
    if (list) list.innerHTML = '<div class="reading-loading">Đang mở tủ bài đọc…</div>';
    try {
        if (!readingCache[level]) {
            const response = await fetch(`./reading/${level}.json?v=3`);
            if (!response.ok) throw new Error('Không tải được dữ liệu');
            readingCache[level] = await response.json();
            if (level === 'n5') {
                const moRong = await fetch('./reading/n5_extended.json?v=1');
                if (moRong.ok) readingCache[level] = readingCache[level].concat(await moRong.json());
            }
            if (level === 'n4') {
                const moRong = await fetch('./reading/n4_extended.json?v=1');
                if (moRong.ok) readingCache[level] = readingCache[level].concat(await moRong.json());
            }
        }
        const completed = JSON.parse(localStorage.getItem('reading_completed') || '{}');
        if (list) list.innerHTML = readingCache[level].map((lesson, index) => `
            <button class="reading-lesson-card" onclick="MoBaiDoc(${index})">
                <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span>
                <span><small>${lesson.type || '短文・ĐOẠN VĂN NGẮN'}</small><b>${lesson.title}</b><em>${lesson.summary}</em></span>
                <i>${completed[`${level}-${lesson.id}`] ? '✓' : lesson.minutes + ' phút'}</i>
            </button>`).join('');
    } catch (error) {
        if (list) list.innerHTML = '<div class="reading-error">Không tải được bài đọc. Hãy kiểm tra mạng và thử lại.</div>';
    }
}

function MoBaiDoc(index) {
    readingLesson = readingCache[readingLevel]?.[index];
    if (!readingLesson) return;
    readingAnswered = new Set();
    document.getElementById('reading-detail-level').textContent = `JLPT ${readingLevel.toUpperCase()} · ${readingLesson.type}`;
    document.getElementById('reading-detail-title').textContent = readingLesson.title;
    document.getElementById('reading-time').textContent = `${readingLesson.minutes} phút`;
    document.getElementById('reading-passage').innerHTML = readingLesson.passage;
    document.getElementById('reading-translation').textContent = readingLesson.translation;
    document.getElementById('reading-translation').classList.add('an-giau');
    document.getElementById('translation-toggle').classList.remove('active');
    document.getElementById('reading-questions').innerHTML = readingLesson.questions.map((q, qi) => `
        <article class="reading-question" id="reading-q-${qi}"><p><span>${qi + 1}</span>${q.question}</p><div>${q.options.map((option, oi) => `<button onclick="TraLoiDocHieu(${qi}, ${oi}, this)">${option}</button>`).join('')}</div><aside class="an-giau">${q.explanation}</aside></article>`).join('');
    ChuyenTab('man-reading-detail');
    document.querySelector('.app-main')?.scrollTo({ top: 0 });
}

function TraLoiDocHieu(questionIndex, optionIndex, button) {
    if (readingAnswered.has(questionIndex)) return;
    readingAnswered.add(questionIndex);
    const question = readingLesson.questions[questionIndex];
    const card = document.getElementById(`reading-q-${questionIndex}`);
    const buttons = [...card.querySelectorAll('button')];
    buttons.forEach((item, index) => {
        item.disabled = true;
        if (index === question.answer) item.classList.add('correct');
    });
    const dung = optionIndex === question.answer;
    GhiNhanHoatDong('questions', 1);
    if (!dung) button.classList.add('wrong');
    card.querySelector('aside').classList.remove('an-giau');
    if (dung) CongDiemXP(5);
    if (['n5','n4'].includes(readingLevel)) {
        capDoTestChon = readingLevel;
        const key = `${readingLevel}-reading-${readingLesson.id}-${questionIndex}`;
        const cauOn = { key, skill:'reading', cauHoiText:`Đọc hiểu: <b>${readingLesson.title}</b><br>${question.question}`, dung:question.options[question.answer], luaChon:[...question.options], savedAt:Date.now() };
        if (dung) XoaCauKhoiSoSai(key); else LuuCauSai(cauOn, question.options[optionIndex]);
        const statsKey = `${readingLevel}_reading_stats`;
        const stats = JSON.parse(localStorage.getItem(statsKey) || '{"correct":0,"total":0}');
        stats.total++; if (dung) stats.correct++;
        localStorage.setItem(statsKey, JSON.stringify(stats));
    }
    if (readingAnswered.size === readingLesson.questions.length) {
        const completed = JSON.parse(localStorage.getItem('reading_completed') || '{}');
        completed[`${readingLevel}-${readingLesson.id}`] = true;
        localStorage.setItem('reading_completed', JSON.stringify(completed));
    }
}

function BatTatBanDich() {
    const translation = document.getElementById('reading-translation');
    const button = document.getElementById('translation-toggle');
    translation.classList.toggle('an-giau');
    button.classList.toggle('active', !translation.classList.contains('an-giau'));
}

function DocThanhTieng() {
    if (!readingLesson || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const text = document.getElementById('reading-passage').textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = .84;
    speechSynthesis.speak(utterance);
}

function DongBaiDoc() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    TaiDanhSachBaiDoc(readingLevel);
}

window.addEventListener('DOMContentLoaded', () => {
    const khungXp = document.getElementById('id-xp');
    if (khungXp) khungXp.innerText = diemXP;
    CapNhatNhiemVuHomNay();
    const tomTat = document.getElementById('n5-path-summary');
    if (tomTat) {
        const completed = JSON.parse(localStorage.getItem('reading_completed') || '{}');
        const soBai = Object.keys(completed).filter(key => key.startsWith('n5-') && completed[key]).length;
        const soSai = LaySoCauSai('n5').length;
        const n4Summary = document.getElementById('n4-path-summary');
        if (n4Summary) {
            const soBaiN4 = Object.keys(completed).filter(key => key.startsWith('n4-') && completed[key]).length;
            const soSaiN4 = LaySoCauSai('n4').length;
            n4Summary.textContent = soSaiN4 ? `${soBaiN4}/16 bài đọc · ${soSaiN4} câu cần ôn lại` : `${soBaiN4}/16 bài đọc · Sẵn sàng học tiếp`;
        }
        tomTat.textContent = soSai ? `${soBai}/24 bài đọc · ${soSai} câu cần ôn lại` : `${soBai}/24 bài đọc · Sẵn sàng học tiếp`;
    }
});

window.addEventListener('beforeunload', () => {
    if (cheDoThiThuChuan && !testDaHetGio) LuuTienDoThiThu();
});
