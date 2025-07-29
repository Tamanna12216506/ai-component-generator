const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to the JSON file
const componentsPath = path.join(__dirname, "../data/components.json");

// POST /api/components/match
router.post("/match", (req, res) => {
  const { tags } = req.body;

  if (!tags || !Array.isArray(tags)) {
    return res.status(400).json({ error: "Tags must be an array" });
  }

  fs.readFile(componentsPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read components" });
    }

    const components = JSON.parse(data);
    const matched = components.filter(component =>
      tags.every(tag => component.tags.includes(tag))
    );

    res.json({ matched });
  });
});

module.exports = router;
