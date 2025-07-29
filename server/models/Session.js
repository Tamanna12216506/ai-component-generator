const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "ai"], required: true },
  content: { type: String, required: true },
});

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    name: { type: String, default: "Untitled Component" },
    messages: [MessageSchema],
    jsx: { type: String, default: "" },
    css: { type: String, default: "" },
    previewImage: { type: String }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
