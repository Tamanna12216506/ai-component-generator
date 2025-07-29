const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // or req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]; // remove "Bearer"

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach user info to request
    next(); // allow request to continue
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };
