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

// Kho từ nhiễu dự phòng chuẩn Nhật ngữ phòng khi file gốc quá ngắn
const KHO_NHIEU_DU_PHONG = ["上手", "下手", "元気", "安全", "水分", "時間", "先生", "学生", "会社"];

// =========================================================================
// ĐIỀU HƯỚNG MENU TAB
// =========================================================================
function ClearAllTimers() {
    clearTimeout(boDemStep2);
    clearTimeout(boDemStep34);
    clearTimeout(boDemTuDongChuyen);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function ChuyenTab(idManHinh) {
    ClearAllTimers();

    document.querySelectorAll('.man-hinh').forEach(man => man.classList.remove('active'));
    const manChon = document.getElementById(idManHinh);
    if (manChon) manChon.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (idManHinh === 'man-home') document.getElementById('btn-nav-home')?.classList.add('active');
    if (idManHinh === 'man-kanji') document.getElementById('btn-nav-kanji')?.classList.add('active');
    if (idManHinh === 'man-test-levels') document.getElementById('btn-nav-test')?.classList.add('active');
    if (idManHinh === 'man-grammar-levels') document.getElementById('btn-nav-grammar')?.classList.add('active');
}

function ThoatHocChiTiet() {
    ClearAllTimers();
    if (loaiHocHienTai === 'grammar') {
        ChuyenTab('man-grammar-levels');
    } else {
        ChuyenTab('man-kanji');
    }
}

function ChonCapDoTest(capDo) {
    capDoTestChon = capDo;
    const tieuDeLevel = document.getElementById('tieu-de-level-test');
    if (tieuDeLevel) tieuDeLevel.innerText = `ĐANG CHỌN: TEST ${capDo.toUpperCase()}`;
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
    // Bỏ phần tự động gọi lại ChayDongThoiGian ở đây để tránh bị lặp đè phát âm khi đang học
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
// TẢI DỮ LIỆU ĐỘNG CHO FLASHCARD HỌC
// =========================================================================
function TaiDuLieuHoc(loaiHoc, tenFile) {
    loaiHocHienTai = loaiHoc;
    tenFileHienTai = tenFile; 
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (loaiHoc === 'grammar') {
        document.getElementById('btn-nav-grammar')?.classList.add('active');
    } else {
        document.getElementById('btn-nav-kanji')?.classList.add('active');
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

    fetch(`./${tenFile}.json?v=${new Date().getTime()}`)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            duLieuHienTai = data; 
            let tienDoCu = parseInt(localStorage.getItem(`tien_do_${tenFileHienTai}`)) || 0;

            if (tienDoCu > 0 && tienDoCu < duLieluHienTai.length && vungChua && tieuDe) {
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

    localStorage.setItem(`tien_do_${tenFileHienTai}`, indexHienTai);

    if (tieuDe) tieuDe.innerText = `TIẾN ĐỘ: ${indexHienTai + 1} / ${duLieuHienTai.length}`;
    if (nutChuyen) nutChuyen.classList.add('an-giau');
    
    ClearAllTimers(); // Xóa sạch tất cả bộ đếm trước khi chạy item mới

    const item = duLieuHienTai[indexHienTai];

    // 1️⃣ XỬ LÝ MÀN HÌNH HỌC KANJI
    if (loaiHocHienTai === 'kanji') {
        const chuKanji = item.kanji || item.chu || "字";
        const nghiaGoc = item.meaning || item.nghia || "";
        const onyomi = item.onyomi || "Chưa cập nhật";
        const kunyomi = item.kunyomi || "Chưa cập nhật";
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

        let styleAnYomi = hienThiYomi ? "" : "display: none !important;";

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
                        <div class="content-ghep" style="font-size: 1.05rem; color: #fff;">${viDu}</div>
                    </div>
                </div>
            `;
        }
        
        let chuoiDocKanjiViet = `${amHanViet}. Nghĩa là: ${nghiaTiengViet}`;
        KichHoatTimeline(chuKanji, chuoiDocKanjiViet, viDu);

    // 2️⃣ XỬ LÝ MÀN HÌNH HỌC NGỮ PHÁP
    } else if (loaiHocHienTai === 'grammar') {
        const cauTruc = item.grammar || item.cau_truc || "";
        const nghiaPhap = item.meaning || item.nghia || "";
        const giaiThich = item.explanation || item.giai_thich || "Chưa có giải thích chi tiết";
        
        const mangViDu = item.examples || [];
        let vdNhat = "";
        let vdViet = "";
        if (mangViDu.length > 0) {
            vdNhat = mangViDu[0].ja || mangViDu[0].jp || "";
            vdViet = mangViDu[0].vi || "";
        }

        // [Tìm đoạn này ở gần cuối phần xử lý Kanji của hàm ChayDongThoiGianFlashcard]
        let styleAnYomi = hienThiYomi ? "" : "display: none !important;";

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
                        <div class="content-ghep" style="font-size: 1.05rem; color: #fff;">${viDu}</div>
                    </div>
                </div>
            `;
        }
        
        // ==========================================
        // 🚀 ĐÂY LÀ PHẦN XỬ LÝ FIX LỖI ĐỌC LAI GIỌNG
        // ==========================================
        let chuoiDocKanjiViet = `${amHanViet}. Nghĩa là: ${nghiaTiengViet}`;
        
        // Tách từ ghép thành mảng bằng dấu phẩy
        let mangTuGhep = viDu.split(/[,，、]/);
        let danhSachPhatAmTuGhep = [];

        mangTuGhep.forEach(tu => {
            if (!tu.trim()) return;
            // Dùng Regex bóc tách: Phần chữ Nhật nằm ngoài và phần giải thích nằm trong ngoặc ()
            let khopNoi = tu.match(/^([^(\uff08]+)(?:\s*[\(\uff08](.*?)[\)\uff09])?/);
            if (khopNoi) {
                let tiengNhat = khopNoi[1].trim(); // Ví dụ: "二回" hoặc "二月"
                let tiengViet = khopNoi[2] ? khopNoi[2].trim() : ""; // Ví dụ: "Nhị hồi - 2 lần" hoặc "Tháng 2"
                
                if (tiengNhat) danhSachPhatAmTuGhep.push({ text: tiengNhat, lang: 'ja-JP' });
                if (tiengViet) danhSachPhatAmTuGhep.push({ text: ` nghĩa là ${tiengViet}`, lang: 'vi-VN' });
            } else {
                // Nếu không đúng cấu trúc ngoặc, cứ đẩy tạm vào giọng Nhật chống cháy
                danhSachPhatAmTuGhep.push({ text: tu.trim(), lang: 'ja-JP' });
            }
        });

        // Kích hoạt dòng thời gian nâng cao truyền kèm danh sách phát âm đã bóc tách
        KichHoatTimelineNangCao(chuKanji, chuoiDocKanjiViet, danhSachPhatAmTuGhep);

    // 2️⃣ XỬ LÝ MÀN HÌNH HỌC NGỮ PHÁP (Giữ nguyên hoặc cập nhật tùy ý)
// =========================================================================
// HÀM KÍCH HOẠT TIMELINE HIỂN THỊ & PHÁT ÂM TUẦN TỰ (ĐÃ SỬA LỖI ĐÈ BỘ ĐẾM)
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

    // Bước 1: Đọc chữ Kanji tổng (Giọng Nhật)
    DocGiongMay(vanBanTiengNhat, 'ja-JP', 0.85, () => {
        if (isMuted) return;
        
        // Bước 2: Đọc Âm Hán + Nghĩa (Giọng Việt)
        DocGiongMay(vanBanTiengViet, 'vi-VN', 1.0, () => {
            if (isMuted) return;
            
            // Bước 3: Đọc chuỗi Từ Ghép tuần tự (Đoạn nào tiếng Nhật giọng Nhật, tiếng Việt giọng Việt)
            PhatAmChuoiTuGhepTuanTu(danhSachPhatAmTuGhep, 0, () => {
                if (isMuted) return;
                
                // Bước 4: Tự động chuyển bài nếu bật Auto Next
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

// Hàm đệ quy chạy mượt mà chuỗi phát âm hỗn hợp ngôn ngữ
function PhatAmChuoiTuGhepTuanTu(danhSach, index, khiXongToanBo) {
    if (isMuted || index >= danhSach.length) {
        if (khiXongToanBo) khiXongToanBo();
        return;
    }

    let phanTu = danhSach[index];
    let tocDo = phanTu.lang === 'ja-JP' ? 0.85 : 1.0;

    DocGiongMay(phanTu.text, phanTu.lang, tocDo, () => {
        // Gọi đệ quy đến phần tử tiếp theo trong mảng
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
        let vanBanSach = vanBan.replace(/<rt>.*?<\/rt>/g, '').replace(/<\/?[^>]+(>|$)/g, "");
        vanBanSach = vanBanSach.replace(/[\/()（）\-ー]/g, ' ');
        vanBanSach = vanBanSach.replace(/[,，、]/g, ',   '); 
        vanBanSach = vanBanSach.replace(/[.。]/g, '.   ');

        let utterance = new SpeechSynthesisUtterance(vanBanSach);
        utterance.lang = ngonNgu;
        utterance.rate = tocDo;
        
        utterance.onend = () => { if (khiXong) khiXong(); };
        utterance.onerror = (e) => { 
            console.error("Lỗi phát âm:", e);
            if (khiXong) khiXong(); 
        };
        
        window.speechSynthesis.speak(utterance);
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
// KHU VỰC ĐẤU TRƯỜNG TEST TRẮC NGHIỆM 4 ĐÁP ÁN (ĐÃ FIX LỌC PHƯƠNG ÁN NHIỄU)
// =========================================================================
function KichHoatLamDe(theLoai) {
    theLoaiTestChon = theLoai;
    ChuyenTab('man-lam-bai-test');
    
    let fileNguon = capDoTestChon.toLowerCase(); 
    
    if (theLoai === 'ngu-phap') {
        fileNguon = `${fileNguon}_grammar`;
    } else if (theLoai === 'kanji' && fileNguon === 'n5') {
        fileNguon = 'n5_quiz'; 
    }
    
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    if (cauHoiTxt) cauHoiTxt.innerHTML = `<div class="loading-text">⚡ Đang thiết lập đấu trường trận đấu...</div>`;

    fetch(`./${fileNguon}.json?v=${new Date().getTime()}`)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(khoGoc => { TaoDeTracNghiem(khoGoc); })
        .catch(() => {
            if (cauHoiTxt) {
                cauHoiTxt.innerHTML = `<span style="color:#ef4444; font-size:1.1rem;">❌ Không thể kết nối đề thi file gốc "${fileNguon}.json"!<br>Bro vui lòng kiểm tra lại tên file trong thư mục dự án nhé.</span>`;
            }
        });
}

function TaoDeTracNghiem(khoGoc) {
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    if (!khoGoc || khoGoc.length < 4) {
        if (cauHoiTxt) cauHoiTxt.innerText = "❌ Kho dữ liệu quá ít (dưới 4 câu), không đủ điều kiện lập bộ đề trắc nghiệm!";
        return;
    }
    
    mangCauHoiTest = [];

    if (khoGoc[0] && khoGoc[0].options !== undefined) {
        let danhSachN5Tron = [...khoGoc].sort(() => 0.5 - Math.random());
        let soCauN5 = Math.min(20, danhSachN5Tron.length); 

        for (let i = 0; i < soCauN5; i++) {
            let itemN5 = danhSachN5Tron[i];
            mangCauHoiTest.push({
                cauHoiText: `Cách đọc Hiragana chính xác của chữ Kanji này là gì: <br><span style="font-size:3.5rem; font-weight:bold; color:#fff; text-shadow: 0 0 10px #ff00ff;">${itemN5.kanji}</span>`,
                dung: itemN5.correct,
                luaChon: [...itemN5.options].sort(() => 0.5 - Math.random())
            });
        }
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
                cauHoi = `Chữ Kanji này có âm Hán Việt là gì: <br><span style="font-size:3.5rem; font-weight:bold; color:#fff;">${chuGoc}</span>`;
                dapAnDung = (nghiaGoc.includes('(') && nghiaGoc.includes(')')) ? nghiaGoc.split('(')[0].trim() : (itemGoc.han_viet || nghiaGoc);
            } else if (theLoaiTestChon === 'tu-vung') {
                cauHoi = `Nghĩa tiếng Việt chuẩn xác của từ: <br><span style="font-size:2.8rem; font-weight:bold; color:#00ffcc;">${chuGoc}</span> là gì?`;
                dapAnDung = (nghiaGoc.includes('(') && nghiaGoc.includes(')')) ? nghiaGoc.substring(nghiaGoc.indexOf('(') + 1, nghiaGoc.indexOf(')')) : nghiaGoc;
            } else {
                cauHoi = `Cấu trúc ngữ pháp: <br><span style="font-size:2.2rem; font-weight:bold; color:#38bdf8;">${grammarGoc}</span> có nghĩa là gì?`;
                dapAnDung = nghiaGoc;
            }

            // ĐÃ FIX: Lọc bằng cách đối chiếu index của phần tử để tránh lọc nhầm dữ liệu trùng tên
            let cacTuKhac = khoGoc.filter((x, idx) => idx !== khoGoc.indexOf(itemGoc));
            let dapAnNhieu = cacTuKhac.map(x => {
                let n = x.meaning || x.nghia || "";
                let h = x.han_viet || n;
                if (theLoaiTestChon === 'kanji') {
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
                    // ĐÃ FIX: Bốc từ kho dự phòng thay vì ghi "phương án nhiễu phụ" thô kệch
                    let tuDuPhong = KHO_NHIEU_DU_PHONG[j % KHO_NHIEU_DU_PHONG.length];
                    bo4DapAn.push(tuDuPhong);
                }
            }
            bo4DapAn.sort(() => 0.5 - Math.random());

            mangCauHoiTest.push({
                cauHoiText: cauHoi,
                dung: dapAnDung,
                luaChon: bo4DapAn
            });
        }
    }

    indexTestHienTai = 0;
    HienThiCauHoiTest();
}

function HienThiCauHoiTest() {
    daBamDapAn = false;
    const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
    if (nutChuyenTest) nutChuyenTest.classList.add('an-giau');
    
    let phanTuCau = mangCauHoiTest[indexTestHienTai];
    const testTienDo = document.getElementById('test-tien-do');
    const cauHoiTxt = document.getElementById('test-cau-hoi-text');
    
    if (testTienDo) testTienDo.innerText = `Câu hỏi: ${indexTestHienTai + 1} / ${mangCauHoiTest.length}`;
    if (cauHoiTxt) cauHoiTxt.innerHTML = phanTuCau.cauHoiText;

    let khungDapAn = document.getElementById('test-danh-sach-dap-an');
    if (khungDapAn) {
        khungDapAn.innerHTML = "";
        phanTuCau.luaChon.forEach(da => {
            let nutOpt = document.createElement('button');
            nutOpt.className = "nut-option-test";
            nutOpt.innerText = da;
            nutOpt.onclick = () => KiemTraKetQuaTest(nutOpt, da, phanTuCau.dung);
            khungDapAn.appendChild(nutOpt);
        });
    }
}

function KiemTraKetQuaTest(nutBam, textChon, textDung) {
    if (daBamDapAn) return; 
    daBamDapAn = true;

    let tatCaNut = document.querySelectorAll('.nut-option-test');
    tatCaNut.forEach(nut => {
        if (nut.innerText === textDung) nut.classList.add('dap-an-dung-style'); 
    });

    if (textChon === textDung) {
        nutBam.classList.add('dap-an-dung-style');
        CongDiemXP(5); 
    } else {
        nutBam.classList.add('dap-an-sai-style'); 
    }

    const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
    if (nutChuyenTest) nutChuyenTest.classList.remove('an-giau');
}

function CauTestTiepTheo() {
    indexTestHienTai++;
    if (indexTestHienTai >= mangCauHoiTest.length) {
        const cauHoiTxt = document.getElementById('test-cau-hoi-text');
        const khungDapAn = document.getElementById('test-danh-sach-dap-an');
        const nutChuyenTest = document.getElementById('vung-nut-chuyen-test');
        
        if (cauHoiTxt) cauHoiTxt.innerHTML = `🎉 <span style="color:#00ffcc; font-size:1.6rem; font-weight:bold;">QUÁ ĐỈNH BRO ƠI!</span><br><p style="font-size:1rem; margin-top:10px; color:#cbd5e1;">Đã hoàn thành xuất sắc chiến trường trắc nghiệm cấp độ này!</p>`;
        if (khungDapAn) khungDapAn.innerHTML = "";
        if (nutChuyenTest) nutChuyenTest.classList.add('an-giau');
    } else {
        HienThiCauHoiTest();
    }
}

function CongDiemXP(soDiem) {
    diemXP += soDiem;
    localStorage.setItem('kanji_pure_xp', diemXP);
    const khungXp = document.getElementById('id-xp');
    if (khungXp) khungXp.innerText = diemXP;
}

window.addEventListener('DOMContentLoaded', () => {
    const khungXp = document.getElementById('id-xp');
    if (khungXp) khungXp.innerText = diemXP;
});
