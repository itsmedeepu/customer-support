const jwt = require("jsonwebtoken");

const AuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: "Access denied, token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token or token expired" });
  }
};

const AdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: "Access denied, token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.admin = decoded;
    req.data = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token or token expired" });
  }
};

module.exports = { AuthToken, AdminAuth };
