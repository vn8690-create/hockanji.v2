import fs from 'node:fs';
const lessons=JSON.parse(fs.readFileSync(new URL('../reading/n4_extended.json',import.meta.url)));
const plan={
  '読解｜問題4　内容理解（短文）':['part-time-shift','garbage-rules','train-delay','library-return'],
  '読解｜問題5　内容理解（中文）':['online-order','study-group','park-volunteer','school-festival'],
  '読解｜問題6　情報検索':['moving-company','cooking-class']
};
const instruction={
  '読解｜問題4　内容理解（短文）':'文章を読んで、質問に答えてください。',
  '読解｜問題5　内容理解（中文）':'文章を読んで、質問に答えてください。',
  '読解｜問題6　情報検索':'案内を読んで、質問に答えてください。'
};
const output=[];
for(const [section,ids] of Object.entries(plan)) for(const id of ids){
  const lesson=lessons.find(x=>x.id===id);if(!lesson)throw Error(`Missing ${id}`);
  lesson.questions.forEach((q,index)=>output.push({
    id:`n4-rx-${id}-${index+1}`,passageId:`n4-rx-${id}`,section,instruction:instruction[section],
    question:`${lesson.passage}<br><br><b>${q.question}</b>`,options:q.options,answer:q.answer,
    explanation:q.explanation
  }));
}
if(output.length!==20||output.some(x=>x.options.length!==4||x.answer<0||x.answer>3))throw Error('Invalid reading expansion');
fs.writeFileSync(new URL('../n4_mock_reading_r05_r06.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(`Wrote ${output.length} N4 reading questions for rotations 05–06.`);
