import fs from 'node:fs';

const source = JSON.parse(fs.readFileSync(new URL('../n4_quiz.json', import.meta.url)));
const examples = [
['世界にはいろいろな文化があります。','Trên thế giới có nhiều nền văn hóa khác nhau.'],['主人は毎朝七時に家を出ます。','Chồng tôi rời nhà lúc 7 giờ mỗi sáng.'],['駅までどんな乗り物で行きますか。','Bạn đi đến ga bằng phương tiện gì?'],['新しい仕事に少しずつ慣れてきました。','Tôi đã dần quen với công việc mới.'],['事故で電車が遅れています。','Tàu đang trễ do tai nạn.'],['来月、東京へ出張します。','Tháng sau tôi đi công tác Tokyo.'],['京都で古いお寺を見ました。','Tôi đã xem một ngôi chùa cổ ở Kyoto.'],['学生時代の友達に会いました。','Tôi đã gặp người bạn thời học sinh.'],['十八歳以上の人が参加できます。','Người từ 18 tuổi trở lên có thể tham gia.'],['三歳以下の子どもは無料です。','Trẻ từ 3 tuổi trở xuống được miễn phí.'],
['今日は気温が低いです。','Hôm nay nhiệt độ thấp.'],['毎日歩いて体力をつけています。','Tôi đi bộ mỗi ngày để tăng thể lực.'],['夏休みについて作文を書きました。','Tôi đã viết bài văn về kỳ nghỉ hè.'],['この辞書を使ってもいいですか。','Tôi dùng từ điển này được không?'],['駅に近くて便利な町です。','Đây là khu phố gần ga và tiện lợi.'],['図書館で本を三冊借りました。','Tôi đã mượn ba cuốn sách ở thư viện.'],['姉は銀行で働いています。','Chị tôi làm việc tại ngân hàng.'],['兄弟は何人いますか。','Bạn có bao nhiêu anh chị em?'],['午前は市内を観光しました。','Buổi sáng tôi đã tham quan trong thành phố.'],['日曜日に公園を散歩しました。','Chủ nhật tôi đã đi dạo trong công viên.'],
['料理に使う道具をそろえました。','Tôi đã chuẩn bị các dụng cụ dùng để nấu ăn.'],['旅行で撮った写真を見せてください。','Hãy cho tôi xem ảnh chụp trong chuyến du lịch.'],['冬休みに北海道へ行く予定です。','Tôi dự định đi Hokkaido vào kỳ nghỉ đông.'],['家族と過ごす時間を大切にしています。','Tôi coi trọng thời gian bên gia đình.'],['手紙に切手を貼ってください。','Hãy dán tem lên thư.'],['今日は特別な日です。','Hôm nay là một ngày đặc biệt.'],['駅で友達と別れました。','Tôi đã chia tay bạn ở nhà ga.'],['毎晩、日本語を勉強しています。','Tôi học tiếng Nhật mỗi tối.'],['父は自動車で会社へ行きます。','Bố tôi đi làm bằng ô tô.'],['弟は動物が大好きです。','Em trai tôi rất thích động vật.'],
['熱があるので医者に診てもらいました。','Vì bị sốt nên tôi đã đi bác sĩ khám.'],['来年、大学を卒業します。','Năm sau tôi sẽ tốt nghiệp đại học.'],['台風が近づいているので外に出ません。','Vì bão đang đến gần nên tôi không ra ngoài.'],['昨日、大きな地震がありました。','Hôm qua đã xảy ra một trận động đất lớn.'],['会う場所をメールで知らせます。','Tôi sẽ báo địa điểm gặp qua email.'],['靴の売り場は三階です。','Quầy bán giày ở tầng ba.'],['来週から新しい授業を始めます。','Tuần sau sẽ bắt đầu lớp học mới.'],['会議は五時に終わります。','Cuộc họp kết thúc lúc 5 giờ.'],['あの白い建物は病院です。','Tòa nhà màu trắng kia là bệnh viện.'],['ここで少し待ってください。','Xin hãy đợi một chút ở đây.'],
['時間がないので急ぎましょう。','Không còn thời gian nên hãy nhanh lên.'],['この方法がいちばんいいと思います。','Tôi nghĩ cách này là tốt nhất.'],['この言葉の意味を教えてください。','Hãy cho tôi biết nghĩa của từ này.'],['教室に学生が二十人います。','Trong lớp học có 20 học sinh.'],['母は日本料理を作るのが上手です。','Mẹ tôi nấu món Nhật rất giỏi.'],['家族と九州を旅行しました。','Tôi đã du lịch Kyushu cùng gia đình.'],['友達と日本の映画を見ました。','Tôi đã xem phim Nhật cùng bạn.'],['朝寝坊して学校に遅れました。','Tôi ngủ quên nên đến trường muộn.'],['駅の近くに新しい病院ができました。','Một bệnh viện mới đã được xây gần ga.'],['先生に質問があります。','Tôi có câu hỏi dành cho giáo viên.'],
['名前を呼ばれたら答えてください。','Khi được gọi tên, hãy trả lời.'],['毎日ピアノを練習しています。','Tôi luyện piano mỗi ngày.'],['雨の日は車の運転に気をつけます。','Ngày mưa tôi cẩn thận khi lái xe.'],['健康のために毎朝運動します。','Tôi tập thể dục mỗi sáng vì sức khỏe.'],['音楽を聞きながら勉強します。','Tôi học trong khi nghe nhạc.'],['旅行のために新しい洋服を買いました。','Tôi mua quần áo mới cho chuyến du lịch.'],['天気がいいので洗濯をします。','Trời đẹp nên tôi giặt đồ.'],['客が来る前に部屋を掃除しました。','Tôi đã dọn phòng trước khi khách đến.'],['友達と駅で会う約束をしました。','Tôi đã hẹn gặp bạn ở ga.'],['午後は用事があるので行けません。','Buổi chiều tôi có việc nên không thể đi.']
];
const topics = [
  ['life','Đời sống・生活'],['study','Học tập・勉強'],['travel','Đi lại・旅行'],
  ['society','Xã hội・社会'],['communication','Giao tiếp・会話'],['routine','Sinh hoạt・日常']
];
const inflectedTargets = {使う:'使って',借りる:'借りました',働く:'働いて',別れる:'別れました',始める:'始めます',終わる:'終わります',待つ:'待って',急ぐ:'急ぎましょう',思う:'思います',答える:'答えて'};
if (source.length !== examples.length) throw new Error('N4 source/example length mismatch');
const data = source.map((item,index) => {
  const [topicId,topic] = topics[Math.floor(index / 10)];
  const example = examples[index][0];
  const target = inflectedTargets[item.kanji] || item.kanji;
  return {id:`n4-vocab-${String(index + 1).padStart(3,'0')}`,level:'N4',topicId,topic,word:item.kanji,reading:item.correct,hanViet:'',meaning:item.meaning,pos:'語彙',example,cloze:example.replace(target,'（　）'),translation:examples[index][1],synonym:'',contrast:'',collocation:''};
});
fs.writeFileSync(new URL('../n4_moji_goi.json', import.meta.url), JSON.stringify(data,null,2) + '\n');
console.log(`Wrote ${data.length} N4 vocabulary records.`);
