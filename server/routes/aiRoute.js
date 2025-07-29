// routes/aiRoute.js
const express = require("express");
const router = express.Router();
const { askGemini } = require("../ai"); // Adjust path if needed

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await askGemini(prompt);
    res.json({ response: result });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini API failed." });
  }
});

module.exports = router;
