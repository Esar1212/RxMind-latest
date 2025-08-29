const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // ✅ Prefer Authorization header
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
    console.log("📥 Extracted token from Authorization header:", token);
  } else if (req.cookies && req.cookies.token) {
    // fallback (if cookies are used in future)
    token = req.cookies.token;
    console.log("📥 Extracted token from cookies:", token);
  }

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (userId, email, etc.)
    console.log("✅ Token verified:", decoded);
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
