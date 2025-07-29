const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDB, ObjectId } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  const existing = await db.collection("users").findOne({ email });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({ email, password: hashedPassword });

  const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET);
  res.json({ token });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

// MIDDLEWARE
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// PROTECTED ROUTE
router.get("/me", authMiddleware, async (req, res) => {
  const db = getDB();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.userId) }, { projection: { password: 0 } });
  res.json({ user });
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;
