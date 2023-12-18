const jwt = require("jsonwebtoken");
const {
  successwithoutdata,
  sucessWithdata,
  errorresponse,
} = require("../helpers/responseStructure");

const AuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(403)
      .json(errorresponse(403, "access denied token not found"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json(errorresponse(403, "invalid token ! token expired"));
  }
};

const AdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(403)
      .json(errorresponse(403, "access denied token not found"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.admin = decoded;
    req.data = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json(errorresponse(403, "invalid token ! token expired"));
  }
};

module.exports = { AuthToken, AdminAuth };
