// routes/students.js  – Full CRUD for students table (Week 5)
const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { protect } = require('../middleware/auth');
const router = express.Router();

// All routes require a valid JWT
router.use(protect);

const validate = [
  body('admission_no').trim().notEmpty().withMessage('Admission number required'),
  body('full_name').trim().notEmpty().withMessage('Full name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('course').trim().notEmpty().withMessage('Course required'),
  body('year_of_study').isInt({ min: 1, max: 6 }).withMessage('Year must be 1-6'),
];

// READ ALL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Student not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// CREATE
router.post('/', validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { admission_no, full_name, email, course, year_of_study } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO students (admission_no, full_name, email, course, year_of_study, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [admission_no, full_name, email, course, year_of_study, req.user.id]
    );
    res.status(201).json({ success: true, message: 'Student added.', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'Admission number already exists.' });
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE
router.put('/:id', validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { admission_no, full_name, email, course, year_of_study } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE students SET admission_no=?, full_name=?, email=?, course=?, year_of_study=? WHERE id=?',
      [admission_no, full_name, email, course, year_of_study, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Student not found.' });
    res.json({ success: true, message: 'Student updated.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Student not found.' });
    res.json({ success: true, message: 'Student deleted.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
