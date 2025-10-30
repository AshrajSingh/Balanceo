import { useEffect, useRef, useState } from "react";
import walletImg from "../images/walletImg.png";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import toast from "react-hot-toast";
import { setUserdata } from "../services/authService";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, expenseAtom, groupedExpenseState, isGroupedViewState } from "../store/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { useResetData } from "../hooks/logoutHook";
import "../styleSheets/homePage.css"
import { ExpensePageTable } from "./ExpensePageTable";
import SignOutConfirm from "./signOutConfirm";
import { useTotalExpense } from "../hooks/totalExpenseHook";

const ExpensePage = () => {
  const [data, setData] = useRecoilState(expenseAtom);
  const [open, setOpen] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(true)
  const [isGroupedView, setIsGroupedView] = useRecoilState(isGroupedViewState);
  const groupedExpenseData = useRecoilValue(groupedExpenseState);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const categoryRef = useRef("");
  const expenseRef = useRef("");
  const expenseAmountRef = useRef("");
  const resetData = useResetData();
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_id = userData.user_id;
  const total_expenses = useTotalExpense();

  useEffect(() => {
    document.body.style.display = "block";
  }, []);

  function handleInputChange(e, ref) {
    // Remove leading/trailing spaces as user types
    ref.current = e.target.value.replace(/^\s+/g, ''); // Remove leading spaces
  }

  async function saveExpense() {
    try {
      setOpen(false);

      // Trim the values and set first letter to upercase even if the user typed it lowercase
      const category = categoryRef.current?.trim().charAt(0).toUpperCase() + categoryRef.current?.trim().slice(1).toLowerCase();
      const expense = expenseRef.current?.trim().charAt(0).toUpperCase() + expenseRef.current?.trim().slice(1).toLowerCase();
      const expenseAmount = expenseAmountRef.current?.trim();

      // Check if any field is empty after trimming
      if (!category || !expense || !expenseAmount) {
        toast.error("Please fill all fields");
        return; // Add return to prevent further execution
      }

      const payload = {
        user_id: user_id,
        category: category,
        expense: expense,
        expenseAmount: Number(expenseAmount),
      };
      console.log("Payload in expenseTable.jsx: ", payload);
      const response = await setUserdata(payload);
      console.log("response from setUserExpense: ", response);
      setData((prev) => [...prev, response]);
      localStorage.setItem("expenses", JSON.stringify([...data, response]));
    }
    catch (error) {
      console.error("Error adding expense: ", error)
      toast.error("Failed to add expense!")
    }

  }

  function handleCancel(){
    setOpenSignOut(false)
  }

  function handleLogout() {
      setOpenSignOut(false)
      resetData();
      navigate("/", { replace: true });
      toast.success("Logout successful!")
  }

  return (
    <div className={"container"}>
      <header className={"header"}>
        <span className={"home-logo"} onClick={() => navigate("/")}>BALANCEO</span>
        <SignOutConfirm
          open={openSignOut}
          message={"Are you sure you want to sign out?"}
          onConfirm={() => handleLogout()}
          onCancel={handleCancel}
        />
      </header>
      <main>
        <section className={"section"}>
          <div className={"subSection"}>
            <h1 className={"title"}>
              <img src={walletImg} alt="Wallet" className="walletImg" />
              Expense
            </h1>
            <div className={"expenseSummary"}>
              <span className={"summaryLabel"}>Total Expense</span>
              <span className={"amount"}>Rs {total_expenses} </span>
            </div>
            <button className={"newExpenseBtn"} onClick={() => setOpen(true)}>+ New Expense</button>
          </div>
          <div className={"incomeGraph"}>
            <ResponsiveContainer width="95%" height={360} style={{
              borderRadius: "10px", backgroundColor: "#212020", boxShadow: "rgba(0, 0, 0, 0.4) 2px 4px 11px",
            }}
            >
              {/* <p>Expense Over Time</p> */}
              <LineChart
                data={isGroupedView ?
                  // Transform grouped data for the chart
                  Object.values(groupedExpenseData).map(group => ({
                    name: group.category,
                    amount: group.totalAmount
                  }))
                  :
                  // Transform regular data for the chart
                  data.map(item => ({
                    name: item.expense,
                    amount: Number(item.expenseAmount)
                  }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#fc0000ff"
                  strokeWidth={3}
                  dot={{ fill: "#380909ff", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "#FF5630" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


        </section>

        <section className={"expenseListSection"}>
          <div className={"expenseItem"}>
            <h2 className={"expenseListTitle"}>Expense List</h2>
            <ExpensePageTable />
          </div>
        </section>

        <div>
          {open && (
            <div className={"overlay"}>
              <div className={"dialog"}>
                <div className={"title-image"}>
                  <h2 className={"addExpenseTitle"}>
                    Add Expense
                    <img src={walletImg} alt="Wallet" className="walletImg" />
                  </h2>
                </div>
                <input
                  type="text" className={"input"} placeholder="Enter expense category..." onChange={e => handleInputChange(e, categoryRef)}
                />
                <input
                  type="text" className={"input"} placeholder="Enter expense source..." onChange={e => handleInputChange(e, expenseRef)}
                />
                <input
                  type="number" className={"input"} placeholder="Enter expense amount..." onChange={e => handleInputChange(e, expenseAmountRef)}
                />
                <div className={"actions"}>
                  <button className={"cancel"} onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button className={"save"} onClick={saveExpense}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={"home-footer"}>
        <div className={"footerInfo"}>

          <div className={"navigations"}>
            <h4>Navigation Links</h4>
            <li>
              <span onClick={() => navigate("/", { replace: true })}>Home</span>
            </li>

            <li>
              <span onClick={() => navigate("/dashboard", { replace: true })}>Dashboard</span>
            </li>

            <li>
              <span onClick={() => navigate("/incomePage", { replace: true })}>Incomes</span>
            </li>

            <li>
              <span onClick={() => navigate("/expensePage", { replace: true })}>Expenses</span>
            </li>
            <li>
              <span onClick={() => navigate("/account", { replace: true })}>Account</span>
            </li>
          </div>

          <div className="contact">
            <h4>Contact Us</h4>
            <p>Address: <a href="">Chhattissgarh, India</a></p>
            <p>Email: <a href="mailto:support.balanceo@gmail.com">balanceo.services@gmail.com</a> </p>
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
  );
};

export default ExpensePage;
