// app.js – BIT3208 Week 4-5 Main Application
require('dotenv').config();
const express      = require('express');
const path         = require('path');

const authRoutes    = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── View Engine ───────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware ────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));   // form POST bodies
app.use(express.json());                           // JSON bodies (API)
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────
app.get('/', (req, res) => res.redirect('/login'));

app.use('/', authRoutes);
app.use('/students', studentRoutes);

// ── Dashboard (protected) ─────────────────────────────────────
const { verifyToken } = require('./includes/auth');
app.get('/dashboard', verifyToken, (req, res) => {
    res.render('dashboard', { user: req.user, token: req.query.token });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).render('404');
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 BIT3208 App running at http://localhost:${PORT}`);
    console.log(`   Database: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
    console.log(`   Auth: JWT (no cookies/sessions)\n`);
});
