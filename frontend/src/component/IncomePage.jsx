import { useEffect, useRef, useState } from "react";
import "../styleSheets/incomePage.css";
import walletImg from "../images/walletImg.png";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IncomePageTable } from "./IncomePageTable";
import toast from "react-hot-toast";
import { setUserIncome } from "../services/authService";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupedIncomeState, incomeAtom, isGroupedViewState } from "../store/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { useResetData } from "../hooks/logoutHook";
import "../styleSheets/homePage.css"
import SignOutConfirm from "./signOutConfirm";
import { useTotalIncome } from "../hooks/totalIncomeHook";

const IncomePage = () => {
  const [data, setData] = useRecoilState(incomeAtom)
  const [open, setOpen] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(true)

  const [isGroupedView, setIsGroupedView] = useRecoilState(isGroupedViewState)
  const groupedIncomeData = useRecoilValue(groupedIncomeState);
  const navigate = useNavigate()
  const categoryRef = useRef("")
  const incomeRef = useRef("")
  const incomeAmountRef = useRef("")
  const resetData = useResetData()

  const userData = JSON.parse(localStorage.getItem("user"))
  const user_id = userData.user_id

  const total_incomes = useTotalIncome();
  console.log("Income data: ", data)


  useEffect(() => {
    document.body.style.display = "block"
  }, [])

  function handleInputChange(e, ref) {
    ref.current = e.target.value
  }

  async function saveIncome() {
    setOpen(false)

    const category = categoryRef.current?.trim().charAt(0).toUpperCase() + categoryRef.current?.trim().slice(1).toLowerCase();
    const income = incomeRef.current?.trim().charAt(0).toUpperCase() + incomeRef.current?.trim().slice(1).toLowerCase();
    const incomeAmount = incomeAmountRef.current?.trim();

    //checking whether all fields are filled
    if (!category || !income || !incomeAmount) {
      toast.error("Please fill all fields")
    }

    const payload = {
      user_id: user_id,
      category: category,
      income: income,
      incomeAmount: Number(incomeAmount)
    }

    console.log("Payload in incomeTable.jsx: ", payload)

    const response = await setUserIncome(payload)

    console.log("response from setUserIncome: ", response)

    setData(prev => [...prev, response])
    localStorage.setItem("incomes", JSON.stringify([...data, response]))

  }

  function handleCancel() {
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
          <div className="subSection">
            <h1 className={"title"}>
              <img src={walletImg} alt="Wallet" className={"walletImg"} />
              Income
            </h1>
            <div className={"incomeSummary"}>
              <span className={"summaryLabel"}>Total Income</span>
              <span className={"amount"}>Rs {total_incomes} </span>
            </div>
            <button className={"newIncomeBtn"} onClick={() => setOpen(true)}>+ New Income</button>
          </div>
          <div className="incomeGraph">
            <ResponsiveContainer width="96%" height={360} style={{ borderRadius: '10px', backgroundColor: '#212020', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
              {/* <p>Income Over Time</p> */}
              <LineChart
                data={isGroupedView ?
                  // Transform grouped data for the chart
                  Object.values(groupedIncomeData).map(group => ({
                    name: group.category,
                    amount: group.totalAmount
                  }))
                  :
                  // Transform regular data for the chart
                  data.map(item => ({
                    name: item.income,
                    amount: Number(item.incomeAmount)
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
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3464ff"
                  strokeWidth={3}
                  dot={{ fill: '#050e2eff', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#3464ff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* <img src={walletImg} alt="Wallet" className={styles.walletImg} /> */}
        </section>

        <section className={"incomeListSection"}>
          <div className={"incomeItem"}>
            <h2 className={"incomeListTitle"}>Income List</h2>
            <IncomePageTable />
          </div>
        </section>


        <div>
          {open && (
            <div className={"overlay"}>
              <div className={"dialog"}>
                <div className="title-image">
                  <h2 className={"addIncomeTitle"}>
                    Add Income
                    <img src={walletImg} alt="Wallet" className={"walletImg"} />
                  </h2>
                </div>

                <input type="text" className={"input"} placeholder="Enter income category..." onChange={e => handleInputChange(e, categoryRef)} />

                <input type="text" className={"input"} placeholder="Enter income source..." onChange={e => handleInputChange(e, incomeRef)} />

                <input type="number" className={"input"} placeholder="Enter income amount..." onChange={e => handleInputChange(e, incomeAmountRef)} />

                <div className={"actions"}>
                  <button className={"cancel"} onClick={() => setOpen(false)} >
                    Cancel
                  </button>

                  <button className={"save"} onClick={saveIncome}>Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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

export default IncomePage;
