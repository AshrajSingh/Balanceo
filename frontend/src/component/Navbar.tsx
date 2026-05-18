// Navbar.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "../styleSheets/navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Function to check if nav item is active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <header className="nav">
                <span className="nav-logo" onClick={() => navigate("/")}>BALANCEO</span>
                <nav className="nav-links">
                    {["Home", "Dashboard", "Income", "Expense"].map((item) => {
                        const path = item === "Home" ? "/" : `/${item.toLowerCase()}Page`
                        return (
                            <span
                                key={item}
                                className={`nav-item ${isActive(path) ? "nav-active" : ""}`}
                                onClick={() => navigate(path)}
                            >
                                {item}
                            </span>
                        )
                    })}
                    <span className={`nav-item ${isActive('/userProfile') ? "nav-active" : ""}`} onClick={() => navigate('/userProfile')}>Account</span>
                </nav>

                {/* MOBILE MENU ICON */}
                <div className="mobile-menu-icon">
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>

                {/* MOBILE DROPDOWN */}
                <div className={`mobile-dropdown ${menuOpen ? "active" : ""}`}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/dashboardPage" onClick={closeMenu}>Dashboard</Link>
                    <Link to="/incomePage" onClick={closeMenu}>Income</Link>
                    <Link to="/expensePage" onClick={closeMenu}>Expense</Link>
                    <Link to="/userProfile" onClick={closeMenu}>Profile</Link>
                </div>
            </header>
        </>
    );
}