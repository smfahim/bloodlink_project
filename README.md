# 🩸 BloodLink — Blood Donation Application

![BloodLink Banner](https://img.shields.io/badge/BloodLink-Blood%20Donation%20App-cc0000?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-00d084?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)

> **BloodLink** is a web-based blood donation platform that connects blood donors with people in urgent need. Fast, free, and life-saving.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Author](#author)

---

## 📖 About the Project

In emergency situations, finding the right blood donor quickly can be the difference between life and death. **BloodLink** provides a centralized digital platform where:

- Donors can register and manage their profiles
- Recipients can search for available donors by blood group and city
- Urgent blood requests can be posted and responded to instantly
- Admins can monitor and manage the entire system

---

## ✨ Features

### Core Features
- 🔐 User Registration & Login (JWT Authentication)
- 🧑‍⚕️ Donor Profile Management
- 🔍 Search Donors by Blood Group & City
- 🚨 Post & Respond to Urgent Blood Requests
- 📊 Admin Dashboard

### Advanced Features
- 📍 Location-Based Donor Filtering
- 📜 Donation History Tracking
- 🔔 Notification System *(coming soon)*
- 📱 Fully Responsive UI

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js (Vite), CSS              |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB (Mongoose)                |
| Auth       | JWT (JSON Web Tokens), bcrypt     |
| Dev Tools  | VS Code, Postman, Git & GitHub    |
| Deployment | Vercel (Frontend)                 |

---

## 📁 Project Structure

```
bloodlink/
│
├── client/                         # React Frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── Stats.jsx
│       │   ├── Search.jsx
│       │   ├── DonorList.jsx
│       │   ├── UrgentRequests.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   └── Admin.jsx
│       ├── styles/
│       │   └── main.css
│       ├── App.jsx
│       └── main.jsx
│
├── server/                         # Node.js + Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   └── requestController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Donor.js
│   │   └── BloodRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   └── requestRoutes.js
│   └── server.js
│
├── .env
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bloodlink.git
cd bloodlink
```

---

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder (see [Environment Variables](#environment-variables))

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint            | Description         | Access  |
|--------|---------------------|---------------------|---------|
| POST   | `/api/auth/register` | Register new user  | Public  |
| POST   | `/api/auth/login`    | Login user         | Public  |
| GET    | `/api/auth/me`       | Get current user   | Private |

### Donor Routes — `/api/donors`

| Method | Endpoint              | Description              | Access  |
|--------|-----------------------|--------------------------|---------|
| GET    | `/api/donors`          | Get all donors           | Public  |
| GET    | `/api/donors/search`   | Search by group & city   | Public  |
| POST   | `/api/donors`          | Register as donor        | Private |
| PUT    | `/api/donors/:id`      | Update donor profile     | Private |
| DELETE | `/api/donors/:id`      | Delete donor profile     | Private |

### Blood Request Routes — `/api/requests`

| Method | Endpoint               | Description            | Access  |
|--------|------------------------|------------------------|---------|
| GET    | `/api/requests`         | Get all requests       | Public  |
| POST   | `/api/requests`         | Post a blood request   | Private |
| PUT    | `/api/requests/:id`     | Update request         | Private |
| DELETE | `/api/requests/:id`     | Delete request         | Private |

---

## 📸 Screenshots

| Homepage Hero | Donor List | Urgent Requests |
|---|---|---|
| ![Hero](./screenshots/hero.png) | ![Donors](./screenshots/donors.png) | ![Requests](./screenshots/requests.png) |

---

## 👨‍💻 Author

**S.M. Fahim Ahmed**
Student ID: 232-112-002
Department of Computer Science & Engineering

- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">Made with ❤️ for saving lives — BloodLink 🩸</p>
