# Balanceo — Finances, simplified 💰  

Balanceo is a **full-stack expense tracker web application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
It helps users manage their personal finances by **tracking income, expenses, and balance** with real-time updates and visualizations.  

---

## ✨ Features  

- 🔐 **User Authentication** — Secure login & signup using JWT  
- 📊 **Dashboard Overview** — Displays Total Income, Total Expenses & Balance  
- 📝 **Expense & Income Tables** — Add and delete entries dynamically  
- 🥧 **Real-time Pie Chart** — Visual representation of your finances  
- 💾 **Persistent Data** — Data stored in MongoDB, fetched on reload  
- 📱 **Responsive UI** — Works across desktop, tablet, and mobile  

---

## 🛠️ Tech Stack  

**Frontend**  
- React.js ⚛️  
- Recoil (state management)  
- Chart.js / Recharts (pie chart visualization)  
- CSS (responsive styling)  

**Backend**  
- Node.js (runtime)  
- Express.js (routing & middleware)  
- Mongoose (MongoDB ODM)  
- JSON Web Token (JWT) for authentication  
- dotenv (environment variables)  

**Database**  
- MongoDB (NoSQL database for users, expenses, and income)  

---

## 📂 Project Structure  

Balanceo/
│── backend/ # Node.js + Express + MongoDB backend
│ ├── middlewares/ # Authentication (JWT) and other middleware
│ ├── models/ # Mongoose models (Users, Expenses, Incomes)
│ ├── routes/ # Express route handlers
│ ├── sql/ # (Optional) SQL-related setup or migration files
│ ├── .env # Environment variables (ignored in Git)
│ ├── package.json # Backend dependencies
│ ├── server.js # Entry point for backend
│
│── frontend/ # React frontend
│ ├── public/ # Static files (index.html, favicon, etc.)
│ ├── src/ # Main React source code
│ │ ├── assets/ # Images, fonts, static assets
│ │ ├── component/ # Reusable UI components
│ │ ├── images/ # Image files
│ │ ├── services/ # API service calls (authService, expenseService)
│ │ ├── store/ # Recoil atoms (state management)
│ │ ├── styleSheets/ # CSS stylesheets
│ │ ├── validations/ # Form validations
│ │ ├── wrappers/ # Wrapper components (e.g. TableWrapper)
│ │ ├── App.jsx # Root React component
│ │ ├── main.jsx # React entry point
│ │ ├── index.css # Global CSS
│ │ └── App.css # App-level styling
│ ├── package.json # Frontend dependencies
│
│── .gitignore # Files ignored by Git
│── README.md # Project documentation

---

## ⚡ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd Balanceo

---

###2️⃣Backend Setup
cd backend
npm install

---

**Create a .env file inside backend/ and add:**
MONGO_URI=your-mongodb-connection-url
JWT_SECRET=your-secret-key
PORT=5000

---

**Start backend server:**
npm start

---

**Frontend Setup**
cd ../frontend
npm install
npm start

---

### ▶️ Usage

- Sign up / Log in with your credentials.
- Access your Dashboard to view:
- Total Income
- Total Expenses
- Balance
- Income & Expense tables
- Interactive Pie Chart
- Add or delete entries → updates instantly & persists in the database.

---

### 🔐 Authentication Flow
- On login/signup, the backend issues a JWT token.
- Token is stored in localStorage and sent with every protected API request.
- Expenses & income are tied to the logged-in user via their user_Id.
- Logging out clears the token and user data from localStorage.

---

### 🚀 Future Enhancements
- 📂 Category-wise expense tracking
- 📊 Export data (CSV/PDF)
- 👥 Shared/group expenses
- 🌙 Dark mode UI
- 📱 Mobile version (React Native)
- 🧑‍💻 Author

---

## Developed with ❤️ by Ashraj Singh
---
