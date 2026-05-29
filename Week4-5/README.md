# BIT3208 – Advanced Web Design and Development
## Week 4-5 Project: Student Management System

**Stack:** Node.js · Express.js · MySQL  
**Auth:** JWT (JSON Web Tokens) — NO cookies used  
**Lecturer:** Lec Nyoro

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env and fill in your MySQL credentials
```

### 3. Create the database
Open phpMyAdmin (or MySQL CLI) and run:
```bash
mysql -u root -p < database/schema.sql
```

### 4. Start the server
```bash
npm start
```
Visit: http://localhost:3000

---

## Default Login
| Email | Password |
|-------|----------|
| admin@bit3208.ac.ke | Admin@1234 |

---

## Connection String
```
mysql://root@localhost:3306/bit3208db
```
Configured in `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bit3208db
```

---

## Project Structure
```
Week4-5/
├── server.js           ← Main entry point
├── .env.example        ← Environment variables template
├── package.json
├── config/
│   └── db.js           ← MySQL connection pool
├── middleware/
│   └── auth.js         ← JWT verification (no cookies)
├── routes/
│   ├── auth.js         ← Register / Login / Me
│   └── students.js     ← Full CRUD
├── database/
│   └── schema.sql      ← DB schema + seed data
└── public/
    ├── index.html      ← Landing page
    ├── login.html      ← Login form
    ├── register.html   ← Registration form
    ├── dashboard.html  ← Main CRUD dashboard
    └── css/
        └── style.css
```

---

## API Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | None | Create account |
| POST | /api/auth/login | None | Login → returns JWT |
| GET | /api/auth/me | JWT | Get current user |
| GET | /api/students | JWT | List all students |
| GET | /api/students/:id | JWT | Get one student |
| POST | /api/students | JWT | Add student |
| PUT | /api/students/:id | JWT | Update student |
| DELETE | /api/students/:id | JWT | Delete student |

---

## Why JWT (no cookies)?
The assignment requires no cookie-based session storage.  
The JWT token is:
1. Returned on login
2. Stored in `localStorage` on the client
3. Sent as `Authorization: Bearer <token>` on every request
4. Verified in `middleware/auth.js` on protected routes

## GitHub Version Control
Each week's folder should be committed separately:
```bash
git add Week4-5/
git commit -m "Week 4-5: Node.js + MySQL + JWT CRUD project"
git push
```
