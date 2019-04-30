const expect = require('chai').expect;
const Database = require('better-sqlite3')
const mozporter = require('../');

describe('sqlite3', function() {
  describe('default stemmer', function(done) {
    it('should not index CJK character', function(done) {
      const db = mozporter(new Database(':memory:'));
      db.exec(`CREATE VIRTUAL TABLE documents USING fts4(id, title, content);`);
      db.exec(`INSERT INTO documents VALUES(1, 'hello world', 'This message is a hello world message.');`);
      db.exec(`INSERT INTO documents VALUES(2, 'urgent: serious', 'This mail is seen as a more serious mail');`);
      db.exec(`INSERT INTO documents VALUES(3, '這是中文標題', '這是測試中文輸入');`);
      const stmt = db.prepare(`SELECT id, rank(matchinfo(documents)) AS rank
        FROM documents
        WHERE documents MATCH ?
        ORDER BY rank DESC
        LIMIT 10 OFFSET 0;
      `)
      const result = stmt.get('中文')
      expect(result).to.not.exist;
      db.close();
      done();
    });
  });

  describe('mozporter', function() {
    it('should index english', function(done) {
      const db = mozporter(new Database(':memory:'));
      db.exec(`CREATE VIRTUAL TABLE documents USING fts4(id, title, content, tokenize=mozporter);`);
      db.exec(`INSERT INTO documents VALUES(1, 'hello world', 'This message is a hello world message.');`);
      db.exec(`INSERT INTO documents VALUES(2, 'urgent: serious', 'This mail is seen as a more serious mail');`);
      db.exec(`INSERT INTO documents VALUES(3, '這是中文標題', '這是測試中文輸入');`);
      const stmt = db.prepare(`SELECT id, rank(matchinfo(documents)) AS rank
        FROM documents
        WHERE documents MATCH ?
        ORDER BY rank DESC
        LIMIT 10 OFFSET 0;
      `)
      const result = stmt.get('message')
      expect(result).to.exist;
      expect(result.id).to.equal(1);
      db.close();
      done();
    });

    it('should index CJK', function(done) {
      const db = mozporter(new Database(':memory:'));
      db.exec(`CREATE VIRTUAL TABLE documents USING fts4(id, title, content, tokenize=mozporter);`);
      db.exec(`INSERT INTO documents VALUES(1, 'hello world', 'This message is a hello world message.');`);
      db.exec(`INSERT INTO documents VALUES(2, 'urgent: serious', 'This mail is seen as a more serious mail');`);
      db.exec(`INSERT INTO documents VALUES(3, '這是中文標題', '這是測試中文輸入');`);
      const stmt = db.prepare(`SELECT id, rank(matchinfo(documents)) AS rank
        FROM documents
        WHERE documents MATCH ?
        ORDER BY rank DESC
        LIMIT 10 OFFSET 0;
      `)
      const result = stmt.get('中文')
      expect(result).to.exist;
      expect(result.id).to.equal(3);
      db.close();
      done();
    });
  });
})
