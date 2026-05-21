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
import Footer from "./Footer";
import Navbar from "./Navbar";

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

  const userData = JSON.parse(localStorage.getItem("user") || "{}")
  const user_id = userData?.user_id

  const total_incomes = useTotalIncome().toLocaleString('en-IN', {style: 'currency', currency: 'INR' });
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

  // Function to check if nav item is active
    const isActive = (path) => {
        return location.pathname === path;
    };

  return (
    <div className={"container"}>
     <Navbar />
      <main>
        <section className={"section"}>
          <div className="subSection">
            <h1 className={"title"}>
              <img src={walletImg} alt="Wallet" className={"walletImg"} />
              Income
            </h1>
            <div className={"incomeSummary"}>
              <span className={"summaryLabel"}>Total Income</span>
              <span className={"amount"}>{total_incomes} </span>
            </div>
            <button className={"newIncomeBtn"} onClick={() => setOpen(true)}>+ New Income</button>
          </div>
          <div className="incomeGraph">
            <ResponsiveContainer width="97%" height={360} style={{ borderRadius: '10px', backgroundColor: '#1c1c1f', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
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
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={true}
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={true}
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

      <Footer />
    </div>
  );
};

export default IncomePage;
