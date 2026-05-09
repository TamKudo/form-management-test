const Database = require('better-sqlite3');

// Tạo file database 
const db = new Database('forms.db');

// Bật foreign key support
db.pragma('foreign_keys = ON');

// Tạo các bảng
db.exec(`
  CREATE TABLE IF NOT EXISTS forms (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT,
    "order"     INTEGER DEFAULT 0,
    status      TEXT    DEFAULT 'draft' CHECK(status IN ('active', 'draft')),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fields (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id  INTEGER NOT NULL,
    label    TEXT    NOT NULL,
    type     TEXT    NOT NULL CHECK(type IN ('text','number','date','color','select')),
    "order"  INTEGER DEFAULT 0,
    required INTEGER DEFAULT 0,
    options  TEXT,
    FOREIGN KEY(form_id) REFERENCES forms(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id      INTEGER NOT NULL,
    data         TEXT    NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(form_id) REFERENCES forms(id)
  );
`);

console.log('Database khởi tạo thành công');

module.exports = db;