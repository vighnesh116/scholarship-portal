# Scholarship Mitra — Smart Scholarship Recommendation & Management Portal

A full-stack Scholarship Recommendation and Management Portal integrated with Machine Learning cosine similarity ranking, dynamic student eligibility filtering, and a comprehensive administrative dashboard.

The platform streamlines scholarship discovery for students, provides personalized recommendations based on socio-economic and academic profiles, and equips administrators with end-to-end scholarship lifecycle and student management capabilities.

**Live Deployment:** [https://scholarship-mitra.vercel.app/](https://scholarship-mitra.vercel.app/)  
**Mentorship:** Guided by Senior Software Developer @ Synterra

---

# Features

* **Machine Learning-Powered Scholarship Recommendation**: Cosine similarity ranking algorithm evaluates multi-dimensional student vectors against scholarship requirements.
* **Dynamic Eligibility Filtering**: Hard-filters criteria including academic marks percentage, annual family income caps, education qualifications, caste categories, and gender reservations.
* **Student Discovery & Application Portal**: Interactive student profile onboarding, matching scholarship cards, remaining deadline counters, and direct application links.
* **Role-Based Authentication & Security**: Secure JWT authentication with access token validation, refresh token rotation, and role-based route guards (`admin` vs `student`).
* **Magic Login & Password Recovery**: Seamless password reset and magic link sign-in flows powered by Gmail SMTP (Flask-Mail) with expiring verification tokens.
* **Administrative Dashboard & Analytics**: Interactive analytics visualizing student demographic distribution, qualification breakdowns, and total scholarship figures using Recharts.
* **Scholarship Catalog Management**: Complete CRUD operations for administrators to add, update, draft, delete, and monitor scholarship postings.
* **Student & User Record Auditing**: Centralized administrative tables for tracking registered users, submitted student profiles, and historical queries.

---

# Student & Recommendation Workflow

The portal follows an intelligent multi-stage recommendation pipeline:

```text
Student Profile Submission (Marks, Income, Caste, Gender, Education)
                                ↓
        Hard Database Filtering (SQL WHERE Constraint Checks)
                                ↓
        Multi-Dimensional Vectorization ([Income, Marks, Caste, Gender, Education])
                                ↓
        Cosine Similarity Computation (Scikit-Learn)
                                ↓
        Scholarship Ranking by Similarity Score (0.0 to 1.0)
                                ↓
        Personalized Scholarship Cards with Real-Time Deadline Days Left
                                ↓
        Direct External Application via Official Links
```

---

# System Architecture

## Architecture Overview

The project consists of two major decoupled modules:

### 1. Recommendation Engine & Student Portal

Responsible for:

* Collecting student academic and socio-economic data
* Applying database-level criteria checks
* Calculating normalized feature vectors across 5 dimensions:
  * Financial need (normalized inverted income ratio)
  * Academic performance (percentage normalization)
  * Caste category affinity weighting
  * Gender reservation weighting
  * Qualification tier alignment
* Scoring and sorting eligible scholarships by cosine similarity
* Delivering responsive, mobile-friendly scholarship cards with real-time deadline calculations

### 2. Administrative Management & Analytics Module

Responsible for:

* Role-authenticated administrative portal access
* Full lifecycle management for scholarships (Creation, Updates, Deletion, Status toggling)
* Visual analytics dashboard powered by Recharts (Income distribution, qualification trends, student counts)
* Registered user audit logs and student applicant data review
* Administrative account security and credential management

---

# Project Structure

```text
scholarship-portal/
│
├── backend/
│   ├── app.py                         # Flask application entrypoint & API route mapping
│   ├── auth.py                        # Authentication, JWT rotation, password reset & magic login
│   ├── database.py                    # MySQL connection pooling with mysql-connector-python
│   ├── decoder.py                     # Custom JWT admin authorization decorator
│   ├── scholarship.py                 # Admin scholarship CRUD, stats & analytics API
│   ├── scholarshipFilter.py           # ML recommendation engine & cosine similarity ranking
│   ├── student.py                     # Student profile registration & applicant query endpoints
│   ├── requirements.txt               # Backend Python dependencies
│   └── .env.example                   # Backend environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── app/                       # Routing configuration, protected & anonymous route guards
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   └── AnonymousRoute.jsx
│   │   ├── features/
│   │   │   ├── Scholarship/           # Student portal, search form & recommendation result cards
│   │   │   ├── admin/                 # Admin dashboard, Recharts analytics, user/scholarship management
│   │   │   └── user/                  # Authentication pages (Login, Signup, Forgot Password, Magic Link)
│   │   ├── shared/                    # Axios client instance with JWT auto-refresh interceptors
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json                   # Frontend dependencies & scripts
│   ├── vite.config.js                 # Vite build configuration
│   └── .env.example                   # Frontend environment variables template
│
├── database/
│   ├── scholarship_portal_sclrinfo.sql # Scholarships table schema & seed data
│   ├── scholarship_portal_students.sql # Student submission records table schema
│   └── scholarship_portal_users.sql    # User accounts authentication table schema
│
├── .gitignore
└── README.md
```

---

# Tech Stack

## Frontend

* **Framework**: React 19
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Routing**: React Router DOM v7
* **Icons**: Lucide React
* **Data Visualization**: Recharts
* **Notifications**: SweetAlert2, React-Toastify
* **HTTP Client**: Axios (configured with automated refresh token interceptor)

## Backend

* **Framework**: Python / Flask
* **Cross-Origin**: Flask-CORS
* **Security & Auth**: Flask-JWT-Extended, Werkzeug Security
* **Mailing Service**: Flask-Mail (Gmail SMTP for Magic Link / Password Reset)
* **WSGI Production Server**: Gunicorn

## Database

* **RDBMS**: MySQL 8.0+
* **Driver**: `mysql-connector-python`

## Machine Learning & Mathematics

* **Vector Modeling**: Scikit-Learn (`cosine_similarity`)
* **Feature Vectorization**: Custom 5-dimensional weighted feature normalization

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/vighnesh116/scholarship-portal.git
cd scholarship-portal
```

---

## 2. Backend Setup

### Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac / Linux:**
```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Frontend Setup

In a new terminal window:

```bash
cd frontend
npm install
```

---

# Database Setup

## Step 1 — Open MySQL

Log in to your MySQL server (via MySQL CLI or MySQL Workbench):

```bash
mysql -u root -p
```

---

## Step 2 — Create Database

```sql
CREATE DATABASE scholarship_portal;
USE scholarship_portal;
```

---

## Step 3 — Import Schema Files

Run the provided SQL script dumps:

```sql
SOURCE database/scholarship_portal_users.sql;
SOURCE database/scholarship_portal_students.sql;
SOURCE database/scholarship_portal_sclrinfo.sql;
```

This creates:
* `users` table: User accounts, passwords, and roles
* `students` table: Submitted student profile queries and demographic records
* `sclrinfo` table: Scholarship catalog with eligibility rules and application links

---

# Environment Variables Setup

## 1. Backend Environment Variables

In the `backend/` directory, create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Configure your local credentials:

```env
# Server Configuration
PORT=5000

# JWT Authentication
JWT_SECRET_KEY=your_super_secret_jwt_key_here

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=scholarship_portal

# Flask-Mail (Gmail SMTP for Password Reset & Magic Login)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
MAIL_DEFAULT_SENDER=your_email@gmail.com
```

---

## 2. Frontend Environment Variables

In the `frontend/` directory, create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Set the backend API base URL:

```env
VITE_API_URL=http://localhost:5000
```

---



# Running the Project

## 1. Start the Flask Backend Server

From the `backend/` directory with virtual environment activated:

```bash
python app.py
```

Backend will run at: `http://localhost:5000`

---

## 2. Start the React Frontend Server

From the `frontend/` directory:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

# Demo Credentials

For local testing or evaluation:

```text
Admin Account:
Email: admin@example.com
Password: password123

Student Account:
Register a new student account via the /signup page.
```

---

# Screenshots & Demo

## Live Application
🔗 [https://scholarship-mitra.vercel.app/](https://scholarship-mitra.vercel.app/)


# Future Improvements

* **Document OCR Parsing**: Automated extraction of marks and income proof from uploaded PDFs/images.
* **Deadline Notification System**: Automated email/SMS alerts to students when matching scholarship deadlines are approaching.
* **National Scholarship Portal (NSP) Sync**: Direct integration with government APIs for automated application tracking.
* **Community Forum & Mentorship**: Discussion board for scholarship applicants to connect with past recipients.
* **Progressive Web App (PWA)**: Offline caching and mobile-first experience for students in low-connectivity areas.

---

# Security Notes

* `.env` files are strictly excluded from version control via `.gitignore`.
* Passwords are encrypted using salted password hashing (`werkzeug.security`).
* JWT access tokens expire in 24 hours, and refresh tokens rotate every 7 days.
* Admin endpoints are protected with custom authorization decorators (`@admin_required`).
* MySQL queries use parameterized prepared statements to eliminate SQL injection vectors.

---

# Author & Acknowledgements

* **Author**: Vighnesh Poojari ([@vighnesh116](https://github.com/vighnesh116))
* **Mentorship**: Guided by Senior Software Developer @ Synterra

---

# License

This project is open-source and intended for educational and portfolio purposes.