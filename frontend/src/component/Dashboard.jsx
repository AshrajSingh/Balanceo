import { useEffect } from "react";
import AmountWrapper from "../wrappers/AmountWrapper";
import StatsCard from "../wrappers/StatsCard";
import '../styleSheets/statsCard.css'
import '../styleSheets/dashboard.css'
import MonthlyExpensesChart from "../wrappers/ExpenseGraph";
import IncomeGraph from "./incomeGraph.jsx";
// display this page when user is succesfully signed in/loggend in 
export default function Dashboard() {

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

    return <div className="dashboard">
        <div style={{ backgroundColor: '#2d2d2d' }}>
            <button>Log Out</button>
            <AmountWrapper>
                <StatsCard title={'Total Expense'} value={"Rs 15000"} />
                <StatsCard title={'Total Income'} value={"Rs 25000"} />
                <StatsCard title={'Total Balance'} value={"Rs 10000"} />
            </AmountWrapper>
            <MonthlyExpensesChart />
            <IncomeGraph />
        </div>
    </div>
}