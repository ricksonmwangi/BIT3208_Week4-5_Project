// routes/auth.js
const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db           = require('../config/db');
const { protect }  = require('../middleware/auth');
const router       = express.Router();

// REGISTER
router.post('/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { username, email, password } = req.body;
    try {
      const [existing] = await db.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
      if (existing.length > 0) return res.status(409).json({ success: false, message: 'Username or email already exists.' });
      const hashed = await bcrypt.hash(password, 10);
      const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashed]);
      res.status(201).json({ success: true, message: 'Account created successfully.', userId: result.insertId });
    } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error.' }); }
  }
);

// LOGIN – returns JWT (no cookies)
router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    console.log('LOGIN HIT', req.body);  // ADD THIS LINE
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { email, password } = req.body;
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      const user = rows[0];
      console.log('PASSWORD ENTERED:', password);
console.log('HASH IN DB:', user.password);
const match = await bcrypt.compare(password, user.password);
console.log('PASSWORD MATCH:', match);
      if (!match) return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );
      res.json({ success: true, message: `Welcome back, ${user.username}!`, token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error.' }); }
  }
);

// ME (protected)
router.get('/me', protect, async (req, res) => {
  const [rows] = await db.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
  if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found.' });
  res.json({ success: true, user: rows[0] });
});

module.exports = router;
