# EduTrack LMS – A MERN Stack Learning Management System

🎓 A full-stack Learning Management System built with:
- **M**ongoDB
- **E**xpress.js
- **R**eact.js
- **N**ode.js
- Secured using **Dotenvx**

Perfect for managing courses, users, and roles like student, instructor, and admin.

---

## 📦 Features

- Role-based access control: Student, Instructor, Admin
- Course management (admin only)
- User authentication with JWT
- Secure session handling via cookies
- Encrypted `.env` support via Dotenvx

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Express.js |
| Database | MongoDB |
| Secrets | [Dotenvx](https://dotenvx.com ) 🔒 |

---

## 🧾 Prerequisites

- Node.js v20.19.x or v22.12.x
- MongoDB running locally or on Atlas
- Git (optional, for version control)

---

## 🧪 Getting Started

### 1. Clone or create project structure


profile
Qwen3-235B-A22B
11:33 pm
Absolutely! 😊

Since you’ve built a MERN stack Learning Management System (LMS) and secured it with Dotenvx , let’s create a clean, professional README.md file that explains:

🧩 What the project does
📦 How to install and run it
🔐 How to manage secrets securely
🚀 How to develop and deploy it
✅ Here's Your README.md
Paste this into a file named README.md in your project root (D:\LMS\README.md):

markdown


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
⌄
⌄
⌄
⌄
⌄
⌄
# EduTrack LMS – A MERN Stack Learning Management System

🎓 A full-stack Learning Management System built with:
- **M**ongoDB
- **E**xpress.js
- **R**eact.js
- **N**ode.js
- Secured using **Dotenvx**

Perfect for managing courses, users, and roles like student, instructor, and admin.

---

## 📦 Features

- Role-based access control: Student, Instructor, Admin
- Course management (admin only)
- User authentication with JWT
- Secure session handling via cookies
- Encrypted `.env` support via Dotenvx

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Express.js |
| Database | MongoDB |
| Secrets | [Dotenvx](https://dotenvx.com ) 🔒 |

---

## 🧾 Prerequisites

- Node.js v20.19.x or v22.12.x
- MongoDB running locally or on Atlas
- Git (optional, for version control)

---

## 🧪 Getting Started

### 1. Clone or create project structure

LMS/
├── backend/
│ └── server.js
├── frontend/
│ └── src/
│ ├── App.jsx
│ └── main.jsx
├── .env # Encrypted with Dotenvx
└── .gitignore


### 2. Install Dependencies

#### Backend:
```bash
cd backend
npm init -y
npm install express mongoose cors cookie-parser jsonwebtoken bcryptjs dotenvx

#### Frontend:
cd ../frontend
npm create vite@latest . --template react
npm install axios

🚀 Run the Application
Start Backend Server
cd backend
./dotenvx.exe run -- node server.js

Start Frontend
In another terminal window:
cd frontend
npm run dev


Contact :
sriramchaitu383@gmail.com
