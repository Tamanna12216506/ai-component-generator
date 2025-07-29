// routes/session.js
const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const { verifyToken } = require("../middleware/auth");

// ✅ Create a session
router.post("/", verifyToken, async (req, res) => {
  console.log("✅ POST /api/session hit");
  console.log("userId from token:", req.userId);

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { topic, difficulty } = req.body;

  try {
    const session = new Session({
      user: req.userId,
      topic,
      difficulty,
    });

    await session.save(); // Save with Mongoose
    res.status(201).json(session);
  } catch (err) {
    console.error("🔥 Error creating session:", err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// ✅ Get all sessions for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error("🔥 Error fetching sessions:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

module.exports = router;
