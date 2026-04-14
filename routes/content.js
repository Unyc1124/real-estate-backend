const express = require("express");
const router = express.Router();
const db = require("../database");


// =============================
// ✅ TEMP ROUTE (ADD TEST DATA)
// =============================
router.get("/add-test", (req, res) => {
  const data = JSON.stringify({
    heading1: "THINKING",
    heading2: "OF A FANTASTIC VICINITY?",
    tag1: "Luxury Amenities",
    tag2: "Balcony Homes"
  });

  db.run(
    `INSERT INTO content (section, data)
     VALUES (?, ?)
     ON CONFLICT(section)
     DO UPDATE SET data = excluded.data`,
    ["hero", data],
    function (err) {
      if (err) return res.status(500).json(err);

      res.send("Test data added ✅");
    }
  );
});


// =============================
// ✅ GET CONTENT
// =============================
router.get("/:section", (req, res) => {
  db.get(
    "SELECT data FROM content WHERE section = ?",
    [req.params.section],
    (err, row) => {
      if (err) return res.status(500).json(err);

      if (!row) return res.json(null);

      res.json(JSON.parse(row.data));
    }
  );
});


// =============================
// ✅ POST (INSERT / UPDATE)
// =============================
router.post("/:section", (req, res) => {
  const data = JSON.stringify(req.body);

  db.run(
    `INSERT INTO content (section, data)
     VALUES (?, ?)
     ON CONFLICT(section)
     DO UPDATE SET data = excluded.data`,
    [req.params.section, data],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ success: true });
    }
  );
});


module.exports = router;