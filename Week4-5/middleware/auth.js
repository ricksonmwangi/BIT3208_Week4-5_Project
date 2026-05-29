// middleware/auth.js
// -------------------------------------------------------
// JWT Authentication Middleware
// Token is read from the Authorization header (Bearer token).
// NO cookies are used – the client stores the JWT in
// localStorage and sends it as:  Authorization: Bearer <token>
// -------------------------------------------------------

const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided. Please log in.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // { id, username, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required.' });
  }
  next();
}

module.exports = { protect, adminOnly };
