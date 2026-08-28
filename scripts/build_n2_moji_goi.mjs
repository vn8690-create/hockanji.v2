import fs from 'node:fs';

const topics = [
  ['work','Công việc・仕事',[
    ['改善','かいぜん','CẢI THIỆN','cải thiện','名・他動','業務の流れを改善する。','Cải thiện quy trình công việc.','改良','悪化','改善する／改善される'],
    ['効率','こうりつ','HIỆU SUẤT','hiệu suất','名','作業の効率を上げる。','Nâng cao hiệu suất công việc.','能率','非効率','効率がいい／悪い'],
    ['方針','ほうしん','PHƯƠNG CHÂM','phương châm, chính sách','名','会社の新しい方針が発表された。','Phương châm mới của công ty đã được công bố.','方向性','','方針を決める'],
    ['承認','しょうにん','THỪA NHẬN','phê duyệt, chấp thuận','名・他動','上司の承認を得てから進める。','Tiến hành sau khi được cấp trên phê duyệt.','許可','拒否','承認を得る'],
    ['担当','たんとう','ĐẢM ĐƯƠNG','phụ trách','名・他動','私は品質管理を担当している。','Tôi phụ trách quản lý chất lượng.','受け持つ','','～を担当する'],
    ['手続き','てつづき','THỦ TỤC','thủ tục','名','住所変更の手続きを済ませた。','Tôi đã hoàn tất thủ tục đổi địa chỉ.','手順','','手続きを行う'],
    ['業務','ぎょうむ','NGHIỆP VỤ','nghiệp vụ, công việc','名','業務の一部を外部に任せる。','Giao một phần nghiệp vụ cho bên ngoài.','仕事','','業務を行う'],
    ['勤務','きんむ','CẦN VỤ','làm việc, công tác','名・自動','京都の支店に勤務している。','Tôi làm việc tại chi nhánh Kyoto.','勤める','','～に勤務する'],
    ['採用','さいよう','THÁI DỤNG','tuyển dụng; áp dụng','名・他動','経験のある人を二名採用した。','Đã tuyển hai người có kinh nghiệm.','雇用','不採用','人を採用する'],
    ['応募','おうぼ','ỨNG MỘ','ứng tuyển, đăng ký','名・自動','求人に百人以上が応募した。','Hơn một trăm người đã ứng tuyển.','申し込む','','～に応募する'],
    ['昇進','しょうしん','THĂNG TIẾN','thăng chức','名・自動','来月、課長に昇進する。','Tháng sau tôi sẽ được thăng chức lên trưởng phòng.','昇格','降格','～に昇進する'],
    ['転勤','てんきん','CHUYỂN CẦN','chuyển nơi công tác','名・自動','大阪への転勤が決まった。','Việc chuyển công tác tới Osaka đã được quyết định.','異動','','～へ転勤する']
  ]],
  ['society','Xã hội・社会',[
    ['制度','せいど','CHẾ ĐỘ','chế độ, hệ thống','名','新しい支援制度が始まった。','Một chế độ hỗ trợ mới đã bắt đầu.','仕組み','','制度を導入する'],
    ['政策','せいさく','CHÍNH SÁCH','chính sách','名','政府は子育て政策を見直した。','Chính phủ đã xem xét lại chính sách nuôi dạy con.','方策','','政策を実施する'],
    ['傾向','けいこう','KHUYNH HƯỚNG','xu hướng','名','若者ほど動画を見る傾向がある。','Người càng trẻ càng có xu hướng xem video.','動向','','～傾向がある'],
    ['影響','えいきょう','ẢNH HƯỞNG','ảnh hưởng','名・自動','天候が売り上げに影響した。','Thời tiết đã ảnh hưởng đến doanh thu.','作用','','～に影響する'],
    ['課題','かだい','KHÓA ĐỀ','vấn đề cần giải quyết; bài tập','名','人手不足が大きな課題だ。','Thiếu nhân lực là một vấn đề lớn.','問題','','課題を解決する'],
    ['対策','たいさく','ĐỐI SÁCH','biện pháp đối phó','名','事故を防ぐ対策が必要だ。','Cần biện pháp ngăn ngừa tai nạn.','措置','','対策を取る'],
    ['現状','げんじょう','HIỆN TRẠNG','hiện trạng','名','まず現状を正確に把握しよう。','Trước hết hãy nắm chính xác hiện trạng.','実情','','現状を把握する'],
    ['格差','かくさ','CÁCH SAI','khoảng cách, chênh lệch','名','地域による教育格差を減らす。','Giảm chênh lệch giáo dục giữa các khu vực.','差','','格差が広がる'],
    ['世代','せだい','THẾ ĐẠI','thế hệ','名','世代によって価値観が異なる。','Giá trị quan khác nhau tùy thế hệ.','年代','','若い世代'],
    ['地域','ちいき','ĐỊA VỰC','khu vực, địa phương','名','地域の住民と話し合う。','Trao đổi với cư dân địa phương.','地方','','地域社会'],
    ['住民','じゅうみん','TRÚ DÂN','cư dân','名','住民に計画を説明した。','Đã giải thích kế hoạch cho cư dân.','居住者','','地域住民'],
    ['世論','よろん','THẾ LUẬN','dư luận','名','その事件は世論の注目を集めた。','Vụ việc đó thu hút sự chú ý của dư luận.','民意','','世論調査']
  ]],
  ['communication','Giao tiếp・伝達',[
    ['主張','しゅちょう','CHỦ TRƯƠNG','chủ trương, khẳng định','名・他動','自分の考えを明確に主張する。','Khẳng định rõ ràng quan điểm của mình.','訴える','','～と主張する'],
    ['指摘','してき','CHỈ TRÍCH','chỉ ra, góp ý','名・他動','資料の誤りを指摘された。','Tôi đã được chỉ ra lỗi trong tài liệu.','注意','','問題を指摘する'],
    ['提案','ていあん','ĐỀ ÁN','đề xuất','名・他動','会議で新しい方法を提案した。','Đề xuất một phương pháp mới trong cuộc họp.','提言','','案を提案する'],
    ['依頼','いらい','Ỷ LẠI','nhờ vả, yêu cầu','名・他動','専門家に調査を依頼した。','Đã nhờ chuyên gia điều tra.','頼む','','～に依頼する'],
    ['断る','ことわる','ĐOẠN','từ chối; báo trước','他動','都合が悪く、誘いを断った。','Vì không tiện nên tôi đã từ chối lời mời.','拒む','引き受ける','誘いを断る'],
    ['説得','せっとく','THUYẾT ĐẮC','thuyết phục','名・他動','家族を説得して留学を決めた。','Tôi thuyết phục gia đình rồi quyết định du học.','納得させる','','人を説得する'],
    ['誤解','ごかい','NGỘ GIẢI','hiểu lầm','名・他動','説明不足で誤解を招いた。','Thiếu giải thích đã gây hiểu lầm.','勘違い','理解','誤解を招く'],
    ['納得','なっとく','NẠP ĐẮC','hiểu và chấp nhận','名・自動','理由を聞いてようやく納得した。','Nghe lý do xong cuối cùng tôi đã hiểu và chấp nhận.','理解','','説明に納得する'],
    ['配慮','はいりょ','PHỐI LỰ','quan tâm, cân nhắc','名・自動','周囲への配慮を忘れない。','Không quên quan tâm đến người xung quanh.','気遣い','','～に配慮する'],
    ['遠慮','えんりょ','VIỄN LỰ','ngại; kiềm chế','名・自動','分からない点は遠慮なく聞いてください。','Điểm nào chưa hiểu thì cứ hỏi, đừng ngại.','控える','','遠慮なく'],
    ['打ち明ける','うちあける','','thổ lộ','他動','親友に悩みを打ち明けた。','Tôi đã thổ lộ nỗi lo với bạn thân.','告白する','','悩みを打ち明ける'],
    ['問い合わせ','といあわせ','VẤN HỢP','yêu cầu cung cấp thông tin','名','詳細は窓口へお問い合わせください。','Chi tiết xin vui lòng liên hệ quầy thông tin.','照会','','問い合わせ先']
  ]],
  ['change','Biến đổi・変化',[
    ['急激','きゅうげき','CẤP KÍCH','đột ngột, nhanh chóng','形動','人口が急激に増加した。','Dân số tăng nhanh đột ngột.','急速','緩やか','急激な変化'],
    ['徐々に','じょじょに','TỪ TỪ','dần dần','副','景気は徐々に回復している。','Nền kinh tế đang dần phục hồi.','次第に','急に','徐々に増える'],
    ['大幅','おおはば','ĐẠI PHÚC','mức lớn, đáng kể','形動','費用を大幅に削減した。','Đã cắt giảm đáng kể chi phí.','大きく','小幅','大幅な値上げ'],
    ['著しい','いちじるしい','TRỨ','đáng kể, nổi bật','形','技術の進歩が著しい。','Tiến bộ kỹ thuật rất nổi bật.','目覚ましい','わずか','著しい成長'],
    ['縮小','しゅくしょう','SÚC TIỂU','thu nhỏ, cắt giảm','名・他動','予算不足で計画を縮小した。','Thiếu ngân sách nên đã thu hẹp kế hoạch.','削減','拡大','規模を縮小する'],
    ['拡大','かくだい','KHUẾCH ĐẠI','mở rộng','名・自他動','海外市場へ事業を拡大する。','Mở rộng hoạt động sang thị trường nước ngoài.','広げる','縮小','被害が拡大する'],
    ['維持','いじ','DUY TRÌ','duy trì','名・他動','品質を一定に維持する。','Duy trì chất lượng ở mức ổn định.','保つ','低下','状態を維持する'],
    ['低下','ていか','ĐÊ HẠ','suy giảm','名・自動','体力の低下を感じる。','Cảm thấy thể lực suy giảm.','下がる','向上','能力が低下する'],
    ['上昇','じょうしょう','THƯỢNG THĂNG','tăng lên','名・自動','原料の価格が上昇した。','Giá nguyên liệu đã tăng.','上がる','下降','気温が上昇する'],
    ['回復','かいふく','HỒI PHỤC','hồi phục','名・自他動','けがは順調に回復している。','Vết thương đang hồi phục thuận lợi.','復旧','悪化','健康を回復する'],
    ['安定','あんてい','AN ĐỊNH','ổn định','名・自動','収入が安定してきた。','Thu nhập đã dần ổn định.','落ち着く','不安定','生活が安定する'],
    ['変動','へんどう','BIẾN ĐỘNG','biến động','名・自動','価格は季節によって変動する。','Giá cả biến động theo mùa.','変化','固定','相場が変動する']
  ]],
  ['research','Nghiên cứu・情報',[
    ['調査','ちょうさ','ĐIỀU TRA','điều tra, khảo sát','名・他動','事故の原因を詳しく調査する。','Điều tra chi tiết nguyên nhân tai nạn.','調べる','','実態調査'],
    ['分析','ぶんせき','PHÂN TÍCH','phân tích','名・他動','集めたデータを分析した。','Đã phân tích dữ liệu thu thập được.','解析','','結果を分析する'],
    ['結果','けっか','KẾT QUẢ','kết quả','名','検査の結果が届いた。','Kết quả kiểm tra đã được gửi tới.','成果','原因','結果が出る'],
    ['根拠','こんきょ','CĂN CỨ','căn cứ, cơ sở','名','その判断には十分な根拠がない。','Phán đoán đó không có đủ căn cứ.','理由','','根拠を示す'],
    ['証拠','しょうこ','CHỨNG CỨ','chứng cứ','名','事実を示す証拠が見つかった。','Đã tìm thấy chứng cứ cho thấy sự thật.','裏付け','','証拠を集める'],
    ['資料','しりょう','TƯ LIỆU','tài liệu, dữ liệu','名','会議の資料を事前に読む。','Đọc trước tài liệu cuộc họp.','文書','','資料を配る'],
    ['統計','とうけい','THỐNG KẾ','thống kê','名','最新の統計を参考にする。','Tham khảo số liệu thống kê mới nhất.','データ','','統計を取る'],
    ['対象','たいしょう','ĐỐI TƯỢNG','đối tượng','名','高校生を対象に調査を行う。','Thực hiện khảo sát đối với học sinh cấp ba.','相手','','～を対象にする'],
    ['比較','ひかく','TỶ GIÁC','so sánh','名・他動','二つの製品の性能を比較する。','So sánh tính năng của hai sản phẩm.','比べる','','AとBを比較する'],
    ['検討','けんとう','KIỂM THẢO','xem xét, cân nhắc','名・他動','計画の変更を検討している。','Đang cân nhắc thay đổi kế hoạch.','考慮','','検討を重ねる'],
    ['予測','よそく','DỰ TRẮC','dự đoán','名・他動','需要の変化を予測する。','Dự đoán thay đổi nhu cầu.','予想','','将来を予測する'],
    ['把握','はあく','BẢ ÁC','nắm bắt','名・他動','問題の全体像を把握する。','Nắm bắt toàn cảnh vấn đề.','理解','','状況を把握する']
  ]],
  ['emotion','Cảm xúc・心理',[
    ['焦る','あせる','TIÊU','sốt ruột, cuống','自動','時間がなくても焦らないで。','Dù không còn nhiều thời gian cũng đừng cuống.','慌てる','落ち着く','焦って失敗する'],
    ['戸惑う','とまどう','','bối rối','自動','突然の質問に戸惑った。','Tôi bối rối trước câu hỏi bất ngờ.','困惑する','','対応に戸惑う'],
    ['呆れる','あきれる','','ngán ngẩm, sửng sốt','自動','彼の無責任な態度に呆れた。','Tôi ngán ngẩm trước thái độ vô trách nhiệm của anh ấy.','','感心する','～に呆れる'],
    ['悔しい','くやしい','','cay cú, tiếc nuối','形','一点差で負けて悔しい。','Thua một điểm nên rất cay cú.','残念','','悔しい思い'],
    ['懐かしい','なつかしい','HOÀI','hoài niệm, thân thương','形','昔の写真を見ると懐かしい。','Nhìn ảnh cũ thấy thật hoài niệm.','','','懐かしく思う'],
    ['羨ましい','うらやましい','','ghen tị theo nghĩa ngưỡng mộ','形','自由に旅行できて羨ましい。','Thật đáng ghen tị vì có thể tự do du lịch.','','','人が羨ましい'],
    ['不安','ふあん','BẤT AN','bất an, lo lắng','名・形動','将来に不安を感じる。','Cảm thấy bất an về tương lai.','心配','安心','不安になる'],
    ['満足','まんぞく','MÃN TÚC','hài lòng','名・自動','結果には十分満足している。','Tôi khá hài lòng với kết quả.','納得','不満','～に満足する'],
    ['慎重','しんちょう','THẬN TRỌNG','thận trọng','形動','重要な契約は慎重に判断する。','Phán đoán thận trọng với hợp đồng quan trọng.','用心深い','軽率','慎重な態度'],
    ['素直','すなお','TỐ TRỰC','thật thà; biết tiếp thu','形動','人の意見を素直に聞く。','Thành thật lắng nghe ý kiến người khác.','正直','頑固','素直に認める'],
    ['強引','ごういん','CƯỜNG DẪN','cưỡng ép, áp đặt','形動','強引に話を進めてはいけない。','Không được cưỡng ép đẩy câu chuyện đi tiếp.','無理やり','穏やか','強引な方法'],
    ['冷静','れいせい','LÃNH TĨNH','bình tĩnh','名・形動','冷静に状況を判断する。','Bình tĩnh phán đoán tình hình.','落ち着いた','興奮','冷静さを保つ']
  ]],
  ['daily','Đời sống・生活',[
    ['最寄り','もより','TỐI KÝ','gần nhất','名','最寄りの駅まで徒歩十分だ。','Đi bộ mười phút tới ga gần nhất.','一番近い','','最寄り駅'],
    ['格好','かっこう','CÁCH HẢO','trang phục; dáng vẻ','名','式にはきちんとした格好で行く。','Đi dự lễ với trang phục chỉnh tề.','服装','','格好をする'],
    ['支度','したく','CHI ĐỘ','chuẩn bị','名・他動','出かける支度を急いだ。','Tôi vội chuẩn bị ra ngoài.','準備','','食事の支度'],
    ['片付ける','かたづける','','dọn dẹp; giải quyết','他動','使った道具を片付ける。','Dọn những dụng cụ đã dùng.','整理する','散らかす','部屋を片付ける'],
    ['預ける','あずける','','gửi, giao giữ','他動','駅のロッカーに荷物を預けた。','Gửi hành lý vào tủ khóa ở ga.','託す','引き取る','荷物を預ける'],
    ['受け取る','うけとる','THỤ THỦ','nhận lấy','他動','窓口で書類を受け取った。','Nhận giấy tờ tại quầy.','受領する','渡す','荷物を受け取る'],
    ['節約','せつやく','TIẾT ƯỚC','tiết kiệm','名・他動','電気をこまめに消して節約する。','Tắt điện thường xuyên để tiết kiệm.','倹約','浪費','時間を節約する'],
    ['費用','ひよう','PHÍ DỤNG','chi phí','名','修理にはかなりの費用がかかる。','Việc sửa chữa tốn khá nhiều chi phí.','経費','','費用がかかる'],
    ['契約','けいやく','KHẾ ƯỚC','hợp đồng','名・他動','内容を確認してから契約する。','Kiểm tra nội dung rồi mới ký hợp đồng.','取り決め','解約','契約を結ぶ'],
    ['解約','かいやく','GIẢI ƯỚC','hủy hợp đồng','名・他動','使わないサービスを解約した。','Đã hủy dịch vụ không dùng.','契約解除','契約','保険を解約する'],
    ['期限','きげん','KỲ HẠN','thời hạn','名','提出期限は今月末です。','Hạn nộp là cuối tháng này.','締め切り','','期限を守る'],
    ['混雑','こんざつ','HỖN TẠP','đông đúc','名・自動','休日の道路はひどく混雑する。','Đường sá ngày nghỉ rất đông.','込み合う','空いている','電車が混雑する']
  ]],
  ['health','Môi trường・Sức khỏe',[
    ['環境','かんきょう','HOÀN CẢNH','môi trường','名','働きやすい環境を整える。','Xây dựng môi trường dễ làm việc.','周囲','','自然環境'],
    ['汚染','おせん','Ô NHIỄM','ô nhiễm','名・他動','海の汚染が深刻になっている。','Ô nhiễm biển đang trở nên nghiêm trọng.','','浄化','大気汚染'],
    ['資源','しげん','TƯ NGUYÊN','tài nguyên','名','限られた資源を有効に使う。','Sử dụng hiệu quả tài nguyên hữu hạn.','資材','','天然資源'],
    ['災害','さいがい','TAI HẠI','thiên tai, thảm họa','名','災害に備えて水を保存する。','Dự trữ nước để phòng thiên tai.','被害','','自然災害'],
    ['防止','ぼうし','PHÒNG CHỈ','phòng ngừa','名・他動','事故の再発を防止する。','Ngăn tai nạn tái diễn.','予防','','事故防止'],
    ['栽培','さいばい','TÀI BỒI','trồng trọt','名・他動','農薬を使わずに野菜を栽培する。','Trồng rau không dùng thuốc nông nghiệp.','育てる','','植物を栽培する'],
    ['介護','かいご','GIỚI HỘ','chăm sóc người cần hỗ trợ','名・他動','家族の介護を続けている。','Tiếp tục chăm sóc người nhà.','世話','','高齢者介護'],
    ['治療','ちりょう','TRỊ LIỆU','điều trị','名・他動','早めに治療を受けたほうがいい。','Nên điều trị sớm.','手当て','','病気を治療する'],
    ['症状','しょうじょう','CHỨNG TRẠNG','triệu chứng','名','薬を飲んだら症状が軽くなった。','Uống thuốc xong triệu chứng nhẹ đi.','病状','','症状が現れる'],
    ['予防','よぼう','DỰ PHÒNG','phòng bệnh, phòng ngừa','名・他動','手洗いは感染予防に役立つ。','Rửa tay giúp phòng lây nhiễm.','防止','','病気を予防する'],
    ['負担','ふたん','PHỤ ĐẢM','gánh nặng','名・他動','家事の負担を家族で分ける。','Chia sẻ gánh nặng việc nhà trong gia đình.','重荷','','負担を減らす'],
    ['衛生','えいせい','VỆ SINH','vệ sinh','名','食品の衛生管理を徹底する。','Thực hiện triệt để quản lý vệ sinh thực phẩm.','清潔','','衛生状態']
  ]],
  ['verbs','Động từ N2・動詞',[
    ['伴う','ともなう','BẠN','đi kèm','自他動','成長には責任が伴う。','Trưởng thành đi kèm trách nhiệm.','付随する','','危険を伴う'],
    ['保つ','たもつ','BẢO','duy trì, giữ','他動','部屋を清潔に保つ。','Giữ phòng sạch sẽ.','維持する','','距離を保つ'],
    ['補う','おぎなう','BỔ','bổ sung, bù đắp','他動','不足した栄養を食事で補う。','Bổ sung dinh dưỡng thiếu hụt bằng bữa ăn.','補充する','','不足を補う'],
    ['省く','はぶく','TỈNH','lược bỏ, tiết kiệm','他動','無駄な手順を省く。','Lược bỏ các bước không cần thiết.','省略する','加える','説明を省く'],
    ['避ける','さける','TỊ','tránh','他動','混雑する時間帯を避ける。','Tránh khung giờ đông đúc.','回避する','','危険を避ける'],
    ['応じる','おうじる','ỨNG','đáp ứng; tùy theo','自動','予算に応じて内容を変える。','Thay đổi nội dung tùy theo ngân sách.','対応する','','必要に応じて'],
    ['及ぼす','およぼす','CẬP','gây, ảnh hưởng đến','他動','睡眠不足は健康に影響を及ぼす。','Thiếu ngủ gây ảnh hưởng đến sức khỏe.','与える','','影響を及ぼす'],
    ['備える','そなえる','BỊ','chuẩn bị; trang bị','他動','地震に備えて食料を用意する。','Chuẩn bị thực phẩm đề phòng động đất.','準備する','','災害に備える'],
    ['認める','みとめる','NHẬN','công nhận; cho phép','他動','自分の失敗を素直に認めた。','Thẳng thắn thừa nhận thất bại của mình.','承認する','否定する','事実を認める'],
    ['任せる','まかせる','NHIỆM','giao phó','他動','この仕事は経験者に任せよう。','Hãy giao việc này cho người có kinh nghiệm.','委ねる','','人に任せる'],
    ['雇う','やとう','CỐ','thuê lao động','他動','繁忙期だけ店員を雇う。','Chỉ thuê nhân viên vào mùa bận rộn.','採用する','解雇する','人を雇う'],
    ['欠かす','かかす','KHIẾM','bỏ, thiếu','他動','健康のため運動を欠かさない。','Không bỏ tập thể dục vì sức khỏe.','省く','','一日も欠かさない']
  ]],
  ['adverbs','Phó từ・副詞',[
    ['依然','いぜん','Y NHIÊN','vẫn như trước','副','雨は依然として強く降っている。','Mưa vẫn đang rơi mạnh như trước.','相変わらず','','依然として'],
    ['あらかじめ','あらかじめ','','trước, sẵn','副','必要な資料をあらかじめ準備する。','Chuẩn bị trước tài liệu cần thiết.','事前に','','あらかじめ伝える'],
    ['たまたま','たまたま','','tình cờ','副','駅でたまたま友人に会った。','Tình cờ gặp bạn ở ga.','偶然','','たまたま見つける'],
    ['うっかり','うっかり','','lỡ, sơ ý','副','うっかり約束を忘れてしまった。','Tôi sơ ý quên mất cuộc hẹn.','不注意で','','うっかりする'],
    ['思い切って','おもいきって','TƯ THIẾT','lấy hết can đảm','副','思い切って上司に相談した。','Lấy hết can đảm hỏi ý kiến cấp trên.','勇気を出して','','思い切って話す'],
    ['さっさと','さっさと','','nhanh chóng, không chần chừ','副','仕事をさっさと終わらせよう。','Hãy nhanh chóng hoàn thành công việc.','すぐに','ぐずぐず','さっさと帰る'],
    ['ぎりぎり','ぎりぎり','','sát giới hạn','副・形動','締め切りぎりぎりに提出した。','Nộp bài sát hạn chót.','直前','','時間ぎりぎり'],
    ['ひとまず','ひとまず','','trước mắt, tạm thời','副','ひとまず作業を中断しよう。','Trước mắt hãy tạm dừng công việc.','とりあえず','','ひとまず安心する'],
    ['せっかく','せっかく','','mất công, hiếm khi có dịp','副','せっかく来たので見学しよう。','Đã mất công đến thì hãy tham quan.','','','せっかくの機会'],
    ['まもなく','まもなく','','sắp, chẳng bao lâu nữa','副','電車はまもなく到着します。','Tàu sắp đến.','もうすぐ','','まもなく始まる'],
    ['一応','いちおう','NHẤT ỨNG','tạm coi là; dù sao cũng','副','念のため一応確認しておく。','Để chắc chắn thì cứ kiểm tra trước.','とりあえず','','一応できた'],
    ['むしろ','むしろ','','ngược lại, đúng hơn là','副','安いというより、むしろ高い。','Không phải rẻ mà ngược lại là đắt.','かえって','','AよりむしろB']
  ]]
];

const data=[];
for(const [topicId,topicName,rows] of topics){
  rows.forEach((row,index)=>{
    const [word,reading,hanViet,meaning,pos,example,translation,synonym,contrast,collocation]=row;
    data.push({id:`n2-vocab-${topicId}-${String(index+1).padStart(2,'0')}`,level:'N2',topicId,topic:topicName,word,reading,hanViet,meaning,pos,example,translation,synonym,contrast,collocation});
  });
}
fs.writeFileSync('n2_moji_goi.json',`${JSON.stringify(data,null,2)}\n`);
console.log(`Wrote ${data.length} N2 vocabulary items across ${topics.length} topics.`);
