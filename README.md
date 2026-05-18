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

---

## ⚡ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd Balanceo
```

---

###2️⃣Backend Setup
```bash
cd backend
npm install
```

---

**Create a .env file inside backend/ and add:**
```bash
MONGO_URI=your-mongodb-connection-url
JWT_SECRET=your-secret-key
PORT=5000
```
---

**Start backend server:**
```bash
npm start
```

---

**Frontend Setup**
```bash
cd ../frontend
npm install
npm start
```

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
