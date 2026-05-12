import { Link, useNavigate } from "react-router-dom"
import { authAtom } from "../store/userAtom"
import { useRecoilValue } from "recoil"
import "../styleSheets/footer.css"

export default function Footer() {
    const auth = useRecoilValue(authAtom)
    const navigate = useNavigate()

    const total_income = JSON.parse(localStorage.getItem("total_income") || '0').toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    const total_expense = JSON.parse(localStorage.getItem("total_expense") || '0').toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    const total_balance = JSON.parse(localStorage.getItem("total_balance") || '0').toLocaleString('en-IN', { style: 'currency', currency: 'INR' })

    return (
        <>
            {/* Footer */}
            <footer className={"home-footer"}>
                <div className={"footerInfo"}>

                    {auth.isLoggedIn ? (
                        <div className="snapshot">
                            <h4>YOUR SNAPSHOT <hr /></h4>
                            {/* <hr /> */}
                            <li>
                                <h1>Total Income: <span style={{ color: '#00c49f' }}>+ {total_income}</span></h1>
                            </li>

                            <li>
                                <h1>Total Expense:<span style={{ color: '#ff4d4d' }}>- {total_expense}</span></h1>
                            </li>

                            <li>
                                <h1>Total Balance:<span style={{ color: '#3464ff' }}>{total_balance}</span></h1>
                            </li>
                        </div>
                    ) : (
                        <div className="snapshot">
                            <h4>GET STARTED</h4>
                            <hr />
                            <p style={{ color: '#8a8a9a', marginBottom: '1rem', lineHeight: '1.6' }}>
                                Track your income and expenses in one place. Free forever.
                            </p>
                            <Link to="/login" className="home-getstarted">
                                Create Free Account
                            </Link>
                        </div>
                    )}

                    <div className={"navigations"}>
                        <h4>QUICK LINKS <hr /></h4>
                        {/* <hr /> */}
                        <li onClick={() => navigate("/", { replace: true })}>
                            <span>Home</span>
                        </li>

                        <li onClick={() => navigate("/dashboardPage", { replace: true })}>
                            <span>Dashboard</span>
                        </li>

                        <li onClick={() => navigate("/incomePage", { replace: true })}>
                            <span>Incomes</span>
                        </li>

                        <li onClick={() => navigate("/expensePage", { replace: true })}>
                            <span>Expenses</span>
                        </li>
                        <li onClick={() => navigate("/userProfile", { replace: true })}>
                            <span>Account</span>
                        </li>
                    </div>

                    <div className="contact">
                        <h4>BALANCEO <hr /></h4>

                        <h5> Finances, Simplified</h5>
                        <p> <a href="mailto:support.balanceo@gmail.com">balanceo.services@gmail.com</a> </p>
                        <p>Chhattissgarh, India</p>
                    </div>

                </div>

                <div className="footer-content">
                    <p className="footer-word">BALANCEO</p>
                    <hr />
                    <p className="pp-footer-inner" style={{ margin: '1rem auto' }}>
                        <span className="pp-footer-logo"> Balanceo </span>
                        <span className="pp-footer-tagline"> Track every rupee · Finances, Simplified. </span>
                        <span className="pp-footer-copy"> &copy; 2026 BALANCEO. All rights reserved. </span>
                    </p>
                </div>
            </footer>
        </>
    )
}