const jwt = require('jsonwebtoken')

const secretkey = process.env.JWT_SECRET;

module.exports = function authMidelware(req,res,next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1]
  if (token) {
    return res.status(401).json({message:"Access denid no token"})
  }
  try {
    const verified = jwt.verify(token,secretkey)
    req.user = verified
    next();
  } catch (error) {
    return res.status(403).json({message:"Invalid or expired token"})
  }
}