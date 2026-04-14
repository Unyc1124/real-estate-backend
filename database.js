const Database = require("better-sqlite3");

// creates DB file automatically
const db = new Database("content.db");

// create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT UNIQUE,
    data TEXT
  )
`).run();

module.exports = db;