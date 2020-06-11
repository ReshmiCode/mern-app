const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const CONFIG = require("../util/config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    // doesn't block options req
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // auth: Bearer TOKEN
    if (!token) {
      return next(new HttpError("Authentication failed!"));
    }
    const decodedToken = jwt.verify(token, CONFIG.TOKEN_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 401));
  }
};
