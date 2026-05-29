// includes/auth.js
// ─── JWT Middleware (replaces sessions/cookies) ───────────────
require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware: protect routes by verifying JWT stored in
 * Authorization header  (Bearer <token>)  OR  query param ?token=
 * NOTE: We deliberately avoid cookies as per project requirements.
 */
function verifyToken(req, res, next) {
    // Check Authorization header first, then query string
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.startsWith('Bearer '))
        ? authHeader.slice(7)
        : req.query.token;

    if (!token) {
        return res.redirect('/login?msg=Please+login+first');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   // { id, username, role, iat, exp }
        next();
    } catch (err) {
        return res.redirect('/login?msg=Session+expired,+please+login+again');
    }
}

/**
 * Generate a signed JWT for an authenticated user.
 */
function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
}

module.exports = { verifyToken, generateToken };
