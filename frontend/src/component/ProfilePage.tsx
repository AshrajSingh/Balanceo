import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import "../styleSheets/profilePage.css";
import { useRecoilValue } from "recoil";
import { expenseAtom, groupedExpenseState, groupedIncomeState, groupTransaction, incomeAtom } from "../store/userAtom.js";
import { toast } from "react-hot-toast";

// @ts-ignore
import SignOutConfirm from "./signOutConfirm.jsx";
// @ts-ignore
import { useResetData } from "../hooks/logoutHook.js";
import Navbar from "./Navbar.js";

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
interface TooltipData {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}
const CustomTooltip = ({ active, payload, label }: TooltipData) => {
  if (active && payload && payload.length) {
    const payloadItem = payload[0]
    return (
      <div className="pp-tooltip">
        <p className="pp-tooltip-label">{label}</p>
        <p className="pp-tooltip-value">₹ {payloadItem?.value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// ── Custom Dot for peak highlight ─────────────────────────────────────────────
const PeakDot = (props: any) => {
  const { cx, cy, value, data, dataKey } = props;
  const max = Math.max(...data.map((d: any) => d[dataKey]));
  if (value === max) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={7} fill="#00c49f" />
        <circle cx={cx} cy={cy} r={3} fill="#161618" />
        <rect x={cx - 28} y={cy - 30} width={56} height={22} rx={6} fill="#00c49f" />
        <text x={cx} y={cy - 14} textAnchor="middle" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="#000" fontWeight="700">
          ₹{(value / 1000).toFixed(1)}k
        </text>
      </g>
    );
  }
  return <circle cx={cx} cy={cy} r={5} fill="#00c49f" stroke="#161618" strokeWidth={2} />;
};

const ExpenseDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props;
  return <circle cx={cx} cy={cy} r={5} fill="#ff4d4d" stroke="#161618" strokeWidth={2} />;
};

const BlueDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props;
  return <circle cx={cx} cy={cy} r={5} fill="#3464ff" stroke="#161618" strokeWidth={2} />;
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [view, setView] = useState("income");
  const incomeData = useRecoilValue(incomeAtom)
  const expenseData = useRecoilValue(expenseAtom)
  const [openSignOut, setOpenSignOut] = useState(false)
  const resetData = useResetData() as () => void;

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userData.username || "Username";
  const email = userData.user || "email@example.com";
  const initial = username.charAt(0).toUpperCase();
  const total_income = JSON.parse(localStorage.getItem('total_income') || 'total_income').toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  const total_expense = JSON.parse(localStorage.getItem('total_expense') || 'total_expense').toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  const total_balance = JSON.parse(localStorage.getItem('total_balance') || 'total_balance').toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  const incomePieColors: Record<string, string> = JSON.parse(localStorage.getItem('updatedIncomeColors') ?? '{}')
  const expensePieColors: Record<string, string> = JSON.parse(localStorage.getItem('groupedExpenseColors') ?? '{}')

  useEffect(() => {
    document.body.style.display = "block";
    return () => { document.body.style.display = ""; };
  }, []);

  const dailyData = useMemo(() =>
    groupTransaction(view === 'income' ? incomeData : expenseData,
      view === 'income' ? 'incomeAmount' : 'expenseAmount',
      'daily'
    ), [view, incomeData, expenseData]
  );

  const categoryData = useMemo(() =>
    groupTransaction(view === 'income' ? incomeData : expenseData,
      view === 'income' ? 'incomeAmount' : 'expenseAmount',
      'category'
    ), [view, incomeData, expenseData]
  );

  const monthlyData = useMemo(() =>
    groupTransaction(view === 'income' ? incomeData : expenseData,
      view === 'income' ? 'incomeAmount' : 'expenseAmount',
      'monthly'
    ), [view, incomeData, expenseData]
  );

  // const transactions = view === "income" ? transactionsIncome : transactionsExpense;
  const pieColors: Record<string, string> = view === "income" ? incomePieColors : expensePieColors;
  const lineColor = view === "income" ? "#00c49f" : "#ff4d4d";
  const amtColor = (amt: string) => amt.startsWith("+") ? "#00c49f" : "#ff4d4d";
  const totalPie = categoryData.reduce((s: any, d: any) => s + d.totalAmount, 0);
  const DotComponent = view === "income" ? (p: any) => <PeakDot {...p} data={dailyData} dataKey="totalAmount" /> : ExpenseDot;

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
    <div className="pp-root">
      <Navbar />

      <main className="pp-main">

        {/* ── HERO PROFILE CARD ───────────────────────────────────────── */}
        <section className="pp-hero-card">
          <div className="pp-hero-accent-bar" />

          <div className="pp-hero-left">
            <div className="pp-avatar">
              <span className="pp-avatar-initial">{initial}</span>
            </div>
            <div className="pp-identity">
              <h1 className="pp-username">{username}</h1>
              <p className="pp-email">{email}</p>
              <span className="pp-member-pill">● Member since Jan 2024</span>
              <button className="pp-edit-btn">Edit Profile</button>
            </div>
          </div>

          <div className="pp-hero-divider" />

          <div className="pp-hero-stats">
            <div className="pp-stat-pill pp-stat-income">
              <div className="pp-stat-bar pp-stat-bar-teal" />
              <div className="pp-stat-content">
                <span className="pp-stat-label">TOTAL INCOME</span>
                <span className="pp-stat-value pp-teal">+{total_income}</span>
              </div>
            </div>
            <div className="pp-stat-pill pp-stat-expense">
              <div className="pp-stat-bar pp-stat-bar-red" />
              <div className="pp-stat-content">
                <span className="pp-stat-label">TOTAL EXPENSE</span>
                <span className="pp-stat-value pp-red">-{total_expense}</span>
              </div>
            </div>
            <div className="pp-stat-pill pp-stat-balance">
              <div className="pp-stat-bar pp-stat-bar-blue" />
              <div className="pp-stat-content">
                <span className="pp-stat-label">NET BALANCE</span>
                <span className="pp-stat-value pp-blue">{total_balance}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOGGLE ──────────────────────────────────────────────────── */}
        <div className="pp-toggle-wrap">
          <div className="pp-toggle">
            <button
              className={`pp-toggle-btn ${view === "income" ? "pp-toggle-active" : ""}`}
              onClick={() => setView("income")}
            >
              Income
            </button>
            <button
              className={`pp-toggle-btn ${view === "expense" ? "pp-toggle-active" : ""}`}
              onClick={() => setView("expense")}
            >
              Expense
            </button>
          </div>
        </div>

        {/* ── DAILY CHART ─────────────────────────────────────────────── */}
        <section className="pp-card pp-chart-daily">
          <div className="pp-card-header">
            <span className="pp-card-title">DAILY {view.toUpperCase()}</span>
            <span className="pp-badge pp-badge-teal">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={dailyData ?? []} margin={{ top: 30, right: 24, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e22" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8a8a9a", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#444455", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
                tickFormatter={(v) => `₹${v / 1000}k`}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke={lineColor}
                strokeWidth={3}
                dot={DotComponent}
                activeDot={{ r: 7, fill: lineColor, stroke: "#161618", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* ── PIE + MONTHLY ROW ───────────────────────────────────────── */}
        <div className="pp-row">

          {/* Pie chart */}
          <section className="pp-card pp-chart-pie">
            <div className="pp-card-header">
              <span className="pp-card-title">{view.toUpperCase()} BY CATEGORY</span>
            </div>
            <div className="pp-pie-wrap">
              <div className="pp-pie-chart">
                <ResponsiveContainer width={220} height={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={90}
                      dataKey="totalAmount"
                      nameKey="category"
                      paddingAngle={2}
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={pieColors[_.category]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#ffffff", border: "1px solid #2a2a30", borderRadius: 8, color: "#ffffff" }}
                      formatter={(v) => [`₹${v.toLocaleString()}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pp-pie-center">
                  <span className="pp-pie-total">₹{(totalPie / 1000).toFixed(0)}k</span>
                  <span className="pp-pie-total-label">total</span>
                </div>
              </div>

              <div className="pp-pie-legend">
                {categoryData?.map((d, i) => (
                  <div key={i} className="pp-legend-row">
                    <span className="pp-legend-dot" style={{ background: pieColors[d.category] }} />
                    <span className="pp-legend-name">{d.category}</span>
                    <span className="pp-legend-pct">{d.totalAmount}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Monthly line */}
          <section className="pp-card pp-chart-monthly">
            <div className="pp-card-header">
              <span className="pp-card-title">MONTHLY {view.toUpperCase()}</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData ?? []} margin={{ top: 16, right: 24, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3464ff" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#3464ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e22" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8a8a9a", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#444455", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
                  tickFormatter={(v) => `₹${v}`}
                  width={44}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#3464ff"
                  strokeWidth={3}
                  dot={(p: any) => <BlueDot cx={p.cx} cy={p.cy} />}
                  activeDot={{ r: 7, fill: "#3464ff", stroke: "#161618", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

        </div>

        {/* ── TRANSACTIONS TABLE ──────────────────────────────────────── */}
        {/* <section className="pp-card pp-table-section">
          <div className="pp-card-header">
            <span className="pp-card-title">RECENT {view.toUpperCase()} TRANSACTIONS</span>
            <span className="pp-badge pp-badge-teal">Jun 2024</span>
          </div>

          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th className="pp-th-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className={i % 2 === 0 ? "pp-row-alt" : ""}>
                    <td className="pp-td-date">{t.date}</td>
                    <td className="pp-td-desc">{t.desc}</td>
                    <td>
                      <span className="pp-category-pill">{t.category}</span>
                    </td>
                    <td className="pp-td-amount" style={{ color: amtColor(t.amount) }}>
                      {t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section> */}

        {/* ── BOTTOM ACTIONS ──────────────────────────────────────────── */}
        <div className="pp-actions">
          <button className="pp-action-signout" onClick={() => setOpenSignOut(true)}>Sign Out</button>
          <button className="pp-action-edit">Edit Profile</button>
        </div>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="pp-footer">
        <div className="pp-footer-inner">
          <span className="pp-footer-logo">BALANCEO</span>
          <span className="pp-footer-tagline">Finances, Simplified</span>
          <span className="pp-footer-copy">© 2026 Balanceo. All rights reserved.</span>
        </div>
      </footer>

      {/* ── SIGN OUT CONFIRMATION ────────────────────────────────────── */}
      {openSignOut ? (
        <SignOutConfirm
          message="Are you sure you want to sign out?"
          onCancel={handleCancel}
          onConfirm={handleLogout}
        />
      ) : null}

    </div>
  );
}
