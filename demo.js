const Database = require('better-sqlite3')
const db = new Database(':memory:')
require('./')(db, function(e) {
  if (e) {
    console.log("error", e)
  }
});

db.exec(`CREATE VIRTUAL TABLE documents USING fts4(title, content, tokenize=mozporter);`);
db.exec(`INSERT INTO documents VALUES('hello world', 'This message is a hello world message.');`);
db.exec(`INSERT INTO documents VALUES('urgent: serious', 'This mail is seen as a more serious world mail');`);
db.exec(`INSERT INTO documents VALUES('這是中文標題', '這是測試中文輸入');`);

const sql = "SELECT docid, rank(matchinfo(documents)) AS rank " +
  "FROM documents " +
  "WHERE documents MATCH ? " +
  "ORDER BY rank DESC  " +
  " LIMIT 10 OFFSET 0;"
const statement = db.prepare(sql)
let result = statement.all("message");
console.log(result)

result = statement.all("world");
console.log(result)

result = statement.all("標題");
console.log(result)