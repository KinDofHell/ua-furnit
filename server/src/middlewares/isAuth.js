const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    req.user = jwt.verify(token, "secret_key");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
