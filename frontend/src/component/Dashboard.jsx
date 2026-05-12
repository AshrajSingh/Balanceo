import { useEffect, useState } from "react";
import AmountWrapper from "../wrappers/AmountWrapper";
import StatsCard from "../wrappers/StatsCard";
import '../styleSheets/statsCard.css'
import '../styleSheets/dashboard.css'
import { useRefreshData } from "../hooks/useRefreshData";
import '../styleSheets/homePage.css'
import '../styleSheets/incomePage.css'
import MonthlyExpensesChart from "../wrappers/ExpenseGraph";
import IncomeGraph from "../component/IncomeGraph.jsx";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, expenseAtom, incomeAtom } from "../store/userAtom.tsx";
import { Link, useNavigate } from "react-router-dom";

import SignOutConfirm from "./signOutConfirm.jsx";
import { useTotalIncome } from "../hooks/totalIncomeHook.js";
import { useTotalExpense } from "../hooks/totalExpenseHook.js";
import { useTotalBalance } from "../hooks/totalBalanceHook.js";
import userIcon from '../images/user-icon.png'
import Footer from "./Footer.jsx";


// display this page when user is succesfully signed in/loggend in 
export default function Dashboard() {
    const [openSignOut, setOpenSignOut] = useState(false)
    const [auth, setAuth] = useRecoilState(authAtom)
    // const refreshData = useRefreshData()
    console.log("isLoggedIn in Dashboard.jsx: ", auth.isLoggedIn)

    const total_income = useTotalIncome().toLocaleString('en-IN', {style: 'currency', currency: 'INR' })
    const total_expense = useTotalExpense().toLocaleString('en-IN', {style: 'currency', currency: 'INR' })
    const total_balance = useTotalBalance().toLocaleString('en-IN', {style: 'currency', currency: 'INR' })

    const navigate = useNavigate()

    if(!auth.isLoggedIn) return null

    useEffect(() => {
        document.body.style.display = "block"
        document.body.style.background = "black"
        document.body.style.color = "white"

        // Refresh data when dashboard mounts
        // refreshData()

        return () => {
            document.body.style.display = ""
            document.body.style.background = ""
            document.body.style.color = ""
        }
    }, [])


    // Function to check if nav item is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return <div className="dashboard">
        <div className="container">
            {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
            <header className="pp-nav">
                <span className="pp-nav-logo" onClick={() => navigate("/")}>BALANCEO</span>
                <nav className="pp-nav-links">
                    {["Home", "Dashboard", "Income", "Expense"].map((item) => {
                        const path = item === "Home" ? "/" : `/${item.toLowerCase()}Page`
                        return (
                            <span
                                key={item}
                                className={`pp-nav-item ${isActive(path) ? "pp-nav-active" : ""}`}
                                onClick={() => navigate(path)}
                            >
                                {item}
                            </span>
                        )
                    })}
                    <span className="pp-nav-item" onClick={() => navigate('/userProfile')}>Account</span>
                </nav>
            </header>
            <AmountWrapper>
                <div className="pp-stat-pill pp-stat-income" style={{width: '30%', height: '4.5rem'}}>
                    <div className="pp-stat-bar pp-stat-bar-teal" />
                    <div className="pp-stat-content">
                        <span className="pp-stat-label" style={{fontSize: '0.85rem'}}>TOTAL INCOME</span>
                        <span className="pp-stat-value pp-teal">+{total_income}</span>
                    </div>
                </div>
                <div className="pp-stat-pill pp-stat-expense" style={{width: '30%', height: '4.5rem'}}>
                    <div className="pp-stat-bar pp-stat-bar-red" />
                    <div className="pp-stat-content">
                        <span className="pp-stat-label" style={{fontSize: '0.85rem'}}>TOTAL EXPENSE</span>
                        <span className="pp-stat-value pp-red">-{total_expense}</span>
                    </div>
                </div>
                <div className="pp-stat-pill pp-stat-balance" style={{width: '30%', height: '4.5rem'}}>
                    <div className="pp-stat-bar pp-stat-bar-blue" />
                    <div className="pp-stat-content">
                        <span className="pp-stat-label" style={{fontSize: '0.85rem'}}>NET BALANCE</span>
                        <span className="pp-stat-value pp-blue">₹{total_balance}</span>
                    </div>
                </div>
            </AmountWrapper>
            <MonthlyExpensesChart />
            <IncomeGraph />

            <Footer />
            
        </div>
    </div>
}