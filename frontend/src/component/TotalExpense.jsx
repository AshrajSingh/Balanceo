import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';
import { expenseAtom, groupedExpenseState } from '../store/userAtom';
import { useEffect, useState } from 'react';



export default function TotalExpense() {
    const data = useRecoilValue(expenseAtom)
    const colors = JSON.parse(localStorage.getItem("expense_colors")) || {}
    const groupedExpenseData = useRecoilValue(groupedExpenseState)


    return <div>
        <ResponsiveContainer width="75%" height={320} style={{ borderRadius: '10px', backgroundColor: '#1c1c1f', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <p>Expense</p>
            <PieChart>
                <Pie
                    data={groupedExpenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="totalAmount"
                    nameKey="category"
                    label
                >
                    {groupedExpenseData.map((entry, index) => (
                        <Cell key={index} fill={colors[entry.category]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
}