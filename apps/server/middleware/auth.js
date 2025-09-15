const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).send({ status: false, error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).send({ status: false, error: "Invalid token" });
  }
};

module.exports = auth;
