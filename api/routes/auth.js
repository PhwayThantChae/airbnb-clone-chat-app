const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = userData;
    next();
  });
};

module.exports = authMiddleware;