import { Link, useNavigate } from "react-router-dom";
import phoneMockup from "../images/phone-mockup.png"
import expenseChart from "../images/expense-chart.png"
import incomeChart from "../images/income-chart.png"
import expenseTable from "../images/expense-table.png"
import incomeTable from "../images/income-table.png"
import "../styleSheets/homePage.css";
import { useRecoilValue } from "recoil";
import { authAtom } from "../store/userAtom";
import { useEffect } from "react";

export default function HomePage() {
  const auth = useRecoilValue(authAtom)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.display = "block"
    // document.body.style.background = "linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 100%)"

    return () => {
      document.body.style.display = ""
      document.body.style.background = ""
    }
  }, [])

  //checking if the user is already visited and logged in
  useEffect(() => {
    setTimeout(() => {
      console.log("setTimeout called....!!")
      const haveVisited = sessionStorage.getItem("haveVisited")

      // Check if this is the first visit in this session
      if (!haveVisited && auth.isLoggedIn) {
        sessionStorage.setItem("haveVisited", 'true')

        navigate("/dashboard", { replace: true })
      }
      else {
        sessionStorage.setItem("haveVisited", 'true')
      }
    }, 1000)
  }, [auth.isLoggedIn, navigate])



  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">
          <Link to={"/"}>BALANCEO</Link>
        </div>
        <Link to="/login" className="home-signin">
          Get Started
        </Link>
      </header>

      {/* Main split content */}
      <div className="home-content">
        {/* Left: Text */}
        <div className="home-text">
          <h1 className="home-title">Track your expenses</h1>
          <p className="home-subtitle">
            BALANCEO is a digital service to manage your money with ease.
          </p>

          <Link to="/login" className="home-getstarted">
            Get Started
          </Link>

          <ul className="home-features">
            <li>
              <span className="checkmark">✔</span>
              Track income, expenses, and savings all in one place
            </li>
            <li>
              <span className="checkmark">✔</span>
              Visualize trends with intuitive charts
            </li>
            <li>
              <span className="checkmark">✔</span>
              Set and achieve your financial goals
            </li>
          </ul>
        </div>

        {/* Right: Phone mockup */}
        <div className="home-mockup">
          <img src={phoneMockup} alt="BALANCEO app mockup" />
        </div>
      </div>

      {/* Why Choose Balanceo? */}
      <div>
        <div className="reason">
          <h2>Why choose BALANCEO?</h2>
          <p>BALANCEO isn’t just another expense tracker—it’s a thoughtfully designed platform built for people who want clarity, control, and collaboration in their financial lives. Whether you're splitting costs with friends, managing monthly budgets, or tracking income sources, BALANCEO brings everything together in one intuitive dashboard. With smart analytics, clean visuals, and seamless group features, it turns financial chaos into calm. If you're tired of juggling spreadsheets or forgetting who paid what, BALANCEO is the upgrade your wallet deserves.</p>
        </div>
      </div>

      {/* Describing features with images */}
      <div>
        <div className="home-body">
          <div className="left-body">
            <h3>Your Spending List</h3>
            <p>Get a detailed view of all your expenses at a glance.</p>
            <img src={expenseTable} alt="expense table" />
          </div>
          <div className="right-body">
            {/* This div will show the img of pie chart for the expenses */}
            <h3>Spending Snapshots</h3>
            <p>Visualize your spending patterns with our interactive pie chart.</p>
            <img src={expenseChart} alt="Pie-chart" />
          </div>

        </div>

        <div className="home-body">
          <div className="left-body">
            <h3>Track Your Inflow</h3>
            <p>Keep tabs on your incoming funds effortlessly.</p>
            <img src={incomeTable} alt="income table" />
          </div>
          <div className="right-body">
            {/* This div will show the img of pie chart for the expenses */}
            <h3>Where Money Comes From</h3>
            <p>Understand the sources of your income.</p>
            <img src={incomeChart} alt="Pie-chart" />
          </div>

        </div>
      </div>


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
  );
}