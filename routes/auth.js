const express = require("express");
const router = express.Router();

// FIXED credentials (as per assignment)
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "1234";

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

module.exports = router;