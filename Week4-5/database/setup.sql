-- ============================================================
-- BIT3208 Week 5 – Database Setup
-- Run this in phpMyAdmin or MySQL CLI:
--   mysql -u root -p < database/setup.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS bit3208_week5db;
USE bit3208_week5db;

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(100) NOT NULL UNIQUE,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('admin','student') DEFAULT 'student',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table (CRUD demo)
CREATE TABLE IF NOT EXISTS students (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    full_name    VARCHAR(150) NOT NULL,
    admission_no VARCHAR(50)  NOT NULL UNIQUE,
    course       VARCHAR(100),
    email        VARCHAR(150),
    phone        VARCHAR(20),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed admin user  (password: Admin@1234 – hashed with bcrypt rounds=10)
INSERT IGNORE INTO users (username, email, password, role)
VALUES (
    'admin',
    'admin@bit3208.ac.ke',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVdCEXF0/.',
    'admin'
);

-- Sample students
INSERT IGNORE INTO students (full_name, admission_no, course, email, phone) VALUES
('Alice Wanjiku',   'BIT/001/2024', 'BIT', 'alice@student.ac.ke',   '0712000001'),
('Brian Omondi',    'BIT/002/2024', 'BIT', 'brian@student.ac.ke',   '0712000002'),
('Carol Njeri',     'BIT/003/2024', 'BSc CS', 'carol@student.ac.ke','0712000003');
