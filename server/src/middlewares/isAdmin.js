const jwt = require("jsonwebtoken");

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded;
    if (decoded.role !== "648c33eaf4a0e1b4f812be09") {
      return res.status(403).json({ message: "Insufficient privileges" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
