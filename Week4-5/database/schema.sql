-- ============================================================
-- BIT3208 – Advanced Web Design and Development
-- Database Schema: bit3208db
-- Week 4-5: Authentication + Student Records CRUD
-- ============================================================

CREATE DATABASE IF NOT EXISTS bit3208db;
USE bit3208db;

-- ------------------------------------------------------------
-- Table: users  (Authentication)
-- No cookies used – JWT stored in localStorage on the client
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    username     VARCHAR(100) NOT NULL UNIQUE,
    email        VARCHAR(150) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,       -- bcrypt hashed
    role         ENUM('admin','student') DEFAULT 'student',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Table: students  (CRUD demo – Week 5)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    admission_no VARCHAR(20)  NOT NULL UNIQUE,
    full_name    VARCHAR(150) NOT NULL,
    email        VARCHAR(150) NOT NULL,
    course       VARCHAR(100) NOT NULL,
    year_of_study TINYINT     NOT NULL DEFAULT 1,
    created_by   INT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Seed: default admin user  (password: Admin@1234)
-- ------------------------------------------------------------
INSERT IGNORE INTO users (username, email, password, role)
VALUES (
    'admin',
    'admin@bit3208.ac.ke',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'admin'
);

-- Sample student records
INSERT IGNORE INTO students (admission_no, full_name, email, course, year_of_study, created_by)
VALUES
    ('BIT/001/2023', 'Alice Wanjiru',  'alice@student.ac.ke',   'Bachelor of IT', 3, 1),
    ('BIT/002/2023', 'Brian Otieno',   'brian@student.ac.ke',   'Bachelor of IT', 3, 1),
    ('BIT/003/2023', 'Carol Muthoni',  'carol@student.ac.ke',   'Bachelor of IT', 3, 1);
