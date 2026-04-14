// // backend/server.js

// const express = require("express");
// const cors = require("cors");
// const db = require("./database");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ Create table if not exists
// db.run(`
//   CREATE TABLE IF NOT EXISTS content (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     section TEXT UNIQUE,
//     data TEXT
//   )
// `);

// // ✅ Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/content", require("./routes/content"));

// app.listen(5000, () => console.log("🚀 Server running on 5000"));

// backend/server.js

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT UNIQUE,
    data TEXT
  )
`);

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/content", require("./routes/content"));

// ✅ FIXED PORT (VERY IMPORTANT 🚨)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});