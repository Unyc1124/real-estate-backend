// // backend/database.js

// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./content.db", (err) => {
//   if (err) console.error(err.message);
//   else console.log("✅ Connected to SQLite DB");
// });

// module.exports = db;

// backend/database.js

const Database = require("better-sqlite3");

const db = new Database("content.db");

// create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT UNIQUE,
    data TEXT
  )
`).run();

module.exports = db;