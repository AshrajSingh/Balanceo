# SETTLE_UP
A web application to track income and expenses with real-time graph updates and interactive dashboard.

# 💰 Expense Tracker

An application to track your **income** and **expenses** with real-time graph updates.  
Built with **React, Recoil, Node.js, Express, and MongoDB**.

---

## ✨ Features
- 🔐 User authentication (Login / Signup)  
- 📊 Dashboard with:
  - Total Income  
  - Total Expenses  
  - Total Balance  
- 📜 Tables for managing:
  - Income entries  
  - Expense entries  
- 🥧 Real-time pie chart for visualizing income vs expenses  
- ⚡ Responsive and user-friendly interface  

---

## 🛠 Tech Stack
- **Frontend:**
  - React
  - Recoil
  - CSS  
- **Backend:**
  - Node.js
  - Express  
- **Database:**
  - MongoDB  
- **Others:**
  - Chart.js / Recharts (for graphs)
  - React-hot-toast for pop-up messages

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)  
- [MongoDB](https://www.mongodb.com/) (local or cloud e.g. Atlas)  
- npm or yarn package manager  

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
#Set up environment variable
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

# Run backend
cd backend
npm start

# Run frontend
cd ../frontend
npm start
```
## Future Improvements
- ➕ Add budget goals
- Export data to CSV/PDF
- Dark mode support
- Mobile app version
- ✏️ Edit expenses/income entries  
- 🏷️ Categorization of transactions  
- 🔎 Filters for easier viewing  
- 📑 Summarization of monthly/yearly expenses
  
---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

###Author
-Ashraj Singh
