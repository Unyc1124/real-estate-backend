const express = require("express");
const router = express.Router();
const db = require("../database");

// ✅ ADD TEST DATA
router.get("/add-test", (req, res) => {
  const data = JSON.stringify({
    heading1: "THINKING",
    heading2: "OF A FANTASTIC VICINITY?",
    tag1: "Luxury Amenities",
    tag2: "Balcony Homes"
  });

  db.prepare(`
    INSERT INTO content (section, data)
    VALUES (?, ?)
    ON CONFLICT(section)
    DO UPDATE SET data = excluded.data
  `).run("hero", data);

  res.send("Test data added ✅");
});

// ✅ GET
router.get("/:section", (req, res) => {
  try {
    const row = db.prepare(
      "SELECT data FROM content WHERE section = ?"
    ).get(req.params.section);

    if (!row) return res.json(null);

    res.json(JSON.parse(row.data));
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ POST
router.post("/:section", (req, res) => {
  try {
    const data = JSON.stringify(req.body);

    db.prepare(`
      INSERT INTO content (section, data)
      VALUES (?, ?)
      ON CONFLICT(section)
      DO UPDATE SET data = excluded.data
    `).run(req.params.section, data);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;