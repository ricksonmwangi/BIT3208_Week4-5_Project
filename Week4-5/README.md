BIT3208 - Week 4-5 Project
Student Management System

Built with Node.js, Express and MySQL. Uses JWT for authentication (no cookies).

What I Used
Node.js + Express for the backend

MySQL for database (mysql2 driver)

JWT for login tokens

Plain HTML/CSS/JS for frontend

How to Run This
1. Install packages

Open terminal in the project folder and run:

text
npm install
2. Set up environment variables

Copy .env.example to a new file called .env

Edit .env and put your MySQL details in there:

text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=bit3208db
3. Create the database

Open phpMyAdmin or MySQL command line and run the SQL file:

text
mysql -u root -p < database/schema.sql
Or just copy the SQL from database/schema.sql and run it manually.

4. Start the server

text
npm start
Then open your browser and go to http://localhost:3000

Login Details
After running the SQL file, you can login with:

Email	Password
admin@bit3208.ac.ke	Admin@1234
If you register a new account, use that instead.

Database Connection
The app connects to MySQL using this info (from .env):

text
mysql://root@localhost:3306/bit3208db
Connection pool is set up in config/db.js

Folder Structure
text
Week4-5/
│
├── server.js           // Main file, starts everything
├── .env.example        // Copy this to .env and fill in
├── package.json
│
├── config/
│   └── db.js           // MySQL connection pool
│
├── middleware/
│   └── auth.js         // Checks JWT tokens (no cookies)
│
├── routes/
│   ├── auth.js         // Login and register routes
│   └── students.js     // Add/edit/delete students
│
├── database/
│   └── schema.sql      // Tables and sample data
│
└── public/
    ├── index.html      // Landing page
    ├── login.html      // Login form
    ├── register.html   // Sign up form
    ├── dashboard.html  // Main student list page
    └── css/
        └── style.css
API Endpoints
These are the routes I built:

Method	Route	Needs Login?	What it does
POST	/api/auth/register	No	Create account
POST	/api/auth/login	No	Login, get JWT token
GET	/api/auth/me	Yes	Get your user info
GET	/api/students	Yes	List all students
GET	/api/students/:id	Yes	Get one student
POST	/api/students	Yes	Add a new student
PUT	/api/students/:id	Yes	Update student details
DELETE	/api/students/:id	Yes	Remove a student
How JWT Works (No Cookies)
The assignment said no cookies, so I used localStorage instead:

User logs in → server returns a JWT token

Frontend saves token in localStorage

Every request to the server includes the token in headers:
Authorization: Bearer <token>

Server checks the token before letting you access protected routes

No cookies were used anywhere.

Git Commits
I committed each week separately:

bash
git add Week4-5/
git commit -m "Week 4-5: Node.js + MySQL + JWT CRUD project"
git push
Notes
Make sure MySQL is running before you start the server (XAMPP or local install)

If port 3000 is busy, change it in the .env file

The frontend files are all in the public folder

