import { useEffect, useState } from "react";
import AmountWrapper from "../wrappers/AmountWrapper";
import StatsCard from "../wrappers/StatsCard";
import '../styleSheets/statsCard.css'
import '../styleSheets/dashboard.css'
import '../styleSheets/homePage.css'
import '../styleSheets/incomePage.css'
import MonthlyExpensesChart from "../wrappers/ExpenseGraph";
import IncomeGraph from "../component/IncomeGraph.jsx";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, expenseAtom, incomeAtom } from "../store/userAtom.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useResetData } from "../hooks/logoutHook.js";


// display this page when user is succesfully signed in/loggend in 
export default function Dashboard() {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [auth, setAuth] = useRecoilState(authAtom)
    const incomeData = useRecoilValue(incomeAtom)
    const expenseData = useRecoilValue(expenseAtom)
    const resetData = useResetData()

    const navigate = useNavigate()

    console.log("isLoggedIn in Dashboard.jsx: ", auth.isLoggedIn)

    useEffect(() => {
        document.body.style.display = "block"
        document.body.style.background = "black"
        document.body.style.color = "white"

        return () => {
            document.body.style.display = ""
            document.body.style.background = ""
            document.body.style.color = ""
        }
    }, [])

    // Adding amounts of all income and displaying total income
    useEffect(() => {
        //Adding income amounts
        if (incomeData) {
            //const total_income = incomes.reduce((total, item) => total + Number(item.incomeAmount), 0)
            const total_income = incomeData.map(items => Number(items.incomeAmount)).reduce((total, amount) => total + amount, 0)
            console.log("Total Income: ", total_income)
            setTotalIncome(total_income)

            localStorage.setItem("total_income", JSON.stringify(total_income))

        } else {
            setTotalIncome(0)
            toast.error("No income found.")
        }
    }, [incomeData])


    // Adding amounts of all expenses and displaying total expenses
    useEffect(() => {
        //Adding expense amounts
        if (expenseData) {
            const total_expenses = expenseData.map(items => Number(items.expenseAmount)).reduce((total, amount) => total + amount, 0)
            console.log("Total Expense: ", total_expenses)
            setTotalExpenses(total_expenses)

            localStorage.setItem("total_expense", JSON.stringify(total_expenses))

        } else {
            setTotalExpenses(0)
            toast.error("No expenses found.")
        }
    }, [expenseData])


    // CALCULATING BALANCE
    useEffect(() => {
        const balance = totalIncome - totalExpenses
        console.log("Balance: ", balance)
        setTotalBalance(balance)
        localStorage.setItem("total_balance", JSON.stringify(balance))
    }, [totalIncome, totalExpenses])


    function handleLogout() {
        resetData()
        navigate("/", { replace: true })
    }

    return <div className="dashboard">
        <div className="container">
            <header className={"header"}>
                <span className={"home-logo"} onClick={()=>navigate("/")}>BALANCEO</span>
                <button className={"signOut"} onClick={handleLogout}>Sign Out</button>
            </header>
            <AmountWrapper>
                <StatsCard title={'Total Expense'} value={`Rs ${totalExpenses}`} />
                <StatsCard title={'Total Income'} value={`Rs ${totalIncome}`} />
                <StatsCard title={'Total Balance'} value={`Rs ${totalBalance}`} />
            </AmountWrapper>
            <MonthlyExpensesChart />
            <IncomeGraph />

            <footer className="home-footer">
                <div className="footerInfo">

                    <div className="navigations">
                        <h4>Navigation Links</h4>
                        <li>
                            <span onClick={() => navigate("/")}>Home</span>
                        </li>

                        <li>
                            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
                        </li>

                        <li>
                            <span onClick={() => navigate("/incomePage")}>Incomes</span>
                        </li>

                        <li>
                            <span onClick={() => navigate("/expensePage")}>Expenses</span>
                        </li>
                        <li>
                            <span onClick={() => navigate("/account")}>Account</span>
                        </li>
                    </div>

                    <div className="contact">
                        <h4>Contact Us</h4>
                        <p>Address: <a href="">Chhattissgarh, India</a></p>
                        <p>Email: <a href="mailto:support.balanceo@gmail.com">support.balanceo@gmail.com</a> </p>
                        <span style={{ display: 'block', marginTop: '8rem' }}>Register For Free
                            <Link to="/login" className="home-getstarted">
                                Get Started
                            </Link>
                        </span>
                    </div>

                    <div className="footer-about">
                        <h3>About Balanceo</h3>
                        <span>Balanceo is your personal finance companion designed to simplify money management. It helps you track your income and expenses effortlessly, visualize your spending habits through dynamic charts, and stay in control of your financial goals. Whether you’re budgeting for the month or reviewing past transactions, Balanceo keeps everything organized, secure, and accessible anytime, anywhere.</span>
                    </div>
                </div>

                <div className="footer-content">
                    <h1>Finances, Simplified</h1>
                    <p className="footer-word">BALANCEO</p>
                </div>
            </footer>
        </div>
    </div>
}