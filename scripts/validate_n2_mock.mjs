import fs from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node scripts/validate_n2_mock.mjs <json>...');
  process.exit(2);
}

const quota = {
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

const rows = files.flatMap(file => JSON.parse(fs.readFileSync(file, 'utf8')));
const errors = [];
const ids = new Set();
const questions = new Set();
const counts = Object.fromEntries(Object.keys(quota).map(key => [key, 0]));

for (const [index, item] of rows.entries()) {
  const label = item.id || `row ${index + 1}`;
  if (!item.id || ids.has(item.id)) errors.push(`${label}: missing/duplicate id`);
  ids.add(item.id);
  if (!Object.hasOwn(quota, item.section)) errors.push(`${label}: unknown section ${item.section}`);
  else counts[item.section]++;
  if (!Array.isArray(item.options) || item.options.length !== 4) errors.push(`${label}: must have 4 options`);
  if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer > 3) errors.push(`${label}: invalid answer index`);
  if (new Set(item.options || []).size !== 4) errors.push(`${label}: duplicate options`);
  if (!item.question || questions.has(item.question)) errors.push(`${label}: missing/duplicate question`);
  questions.add(item.question);
  if (!item.explanation) errors.push(`${label}: missing explanation`);
}

for (const [section, expected] of Object.entries(quota)) {
  if (counts[section] !== expected) errors.push(`${section}: ${counts[section]}/${expected}`);
}

if (rows.length !== 71) errors.push(`total: ${rows.length}/71`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${rows.length} questions, 14 Mondai, unique IDs/options, valid answers and exact quotas.`);
