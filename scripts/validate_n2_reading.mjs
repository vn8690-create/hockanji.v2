import fs from 'node:fs';

const file=process.argv[2];
if(!file){console.error('Usage: node scripts/validate_n2_reading.mjs <reading.json>');process.exit(2);}
const rows=JSON.parse(fs.readFileSync(file,'utf8'));
const rules={
  '読解｜問題10　内容理解（短文）':{items:5,groups:5,perGroup:1,minChars:180},
  '読解｜問題11　内容理解（中文）':{items:8,groups:4,perGroup:2,minChars:280},
  '読解｜問題12　統合理解':{items:2,groups:1,perGroup:2,minChars:350},
  '読解｜問題13　主張理解（長文）':{items:3,groups:1,perGroup:3,minChars:650},
  '読解｜問題14　情報検索':{items:2,groups:1,perGroup:2,minChars:350}
};
const errors=[];
for(const [section,rule] of Object.entries(rules)){
  const items=rows.filter(x=>x.section===section);
  const groups=new Map();
  for(const item of items){
    if(!item.passageId)errors.push(`${item.id}: missing passageId`);
    const chars=item.question.replace(/<[^>]+>/g,'').replace(/\s/g,'').length;
    if(chars<rule.minChars)errors.push(`${item.id}: ${chars}/${rule.minChars} chars`);
    groups.set(item.passageId,(groups.get(item.passageId)||0)+1);
  }
  if(items.length!==rule.items)errors.push(`${section}: ${items.length}/${rule.items} items`);
  if(groups.size!==rule.groups)errors.push(`${section}: ${groups.size}/${rule.groups} passage groups`);
  for(const [id,count] of groups)if(count!==rule.perGroup)errors.push(`${id}: ${count}/${rule.perGroup} linked questions`);
}
if(rows.length!==20)errors.push(`total: ${rows.length}/20`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('OK: 20 reading questions, 12 complete passage groups, N2 length floors and exact Mondai quotas.');
