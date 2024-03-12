const jwtUtils = require("jsonwebtoken");
const { secret } = require("../config");

const extractJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const jwt = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (jwt == null) return res.sendStatus(401);

  jwtUtils.verify(jwt, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = extractJwt;
