# 🌍 WanderWorks

WanderWorks is a full-stack platform for discovering and booking workspaces, where individuals can reserve spaces for remote work while traveling or rent them for small-scale startups to host meetings, hackathons, workshops, and other events. It enables remote workers to find suitable workspaces and attend meetings while traveling across various states.



## 📌 Features

- 🔐 **User Authentication**: Only logged-in users can interact with the platform features.
- 🏢 **Workspace Management**: Any authenticated user can add a new workspace with details like name, location, and pricing.
- ⭐ **User Reviews**: Users can add and view reviews for each workspace to help others make informed decisions.
- 🗓️ **Bookings**: Workspaces can be booked for specific time periods.
- 💰 **Dynamic Pricing**: The booking cost is automatically calculated based on the selected time period and the workspace’s hourly rate.
- 🧾 **Payment Integration**: Payments can be made through **Razorpay (test mode)** for secure and easy transactions.
- 🎟️ **Ticket Generation**: After a successful payment, a downloadable booking ticket is generated as confirmation.

---

## 🏗️ Project Structure

WanderWorks/    
├── wanderworks-frontend/ # Frontend in React + Redux  
├── wanderworks-backend/ # Backend in Express + Sequelize (MVC)  
└── README.md # Project documentation  



## 🚀 Tech Stack

### Frontend
- React
- Redux
- Axios
- React Router DOM

### Backend
- Node.js with Express
- PostgreSQL
- Sequelize (ORM)

---

### 📁 Backend Overview (MVC Pattern)

**Directory: `wanderworks-backend/src`**

- `config/` – Database configuration
- `controllers/` – Business logic for handling requests
- `middleware/` – Middleware for authentication, error handling, etc.
- `models/` – Sequelize models for database tables
- `repositories/` – Data access logic
- `routes/` – API routes
- `services/` – Service layer for business rules
- `app.js` – Application setup
- `server.js` – Server entry point



### 📁 Frontend Overview

**Directory: `wanderworks-frontend/src`**

- `components/` – Reusable UI components
- `pages/` – Route-based page components
- `redux/` – Redux store and slices
- `routes/` – Route definitions
- `services/` – API interaction with backend
- `App.js` – Main application logic
- `.env` – Environment-specific frontend configs (e.g., API base URL)

---

## 🛠️ Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/WanderWorks.git
cd WanderWorks
```
#### 2.backend setup
```bash
cd wanderworks-backend
npm install
cd src
node server.js
```
#### 3.frontend setup
```bash
cd wanderworks-frontend
npm install
# Create a .env file with REACT_APP_API_URL=http://localhost:4000/api
npm start
```
this version of this project is still under progress 
Made with ❤️ by Kaviraj   
