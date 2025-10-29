import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';
import { expenseAtom, groupedExpenseState } from '../store/userAtom';
import { useEffect, useState } from 'react';

    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
    }

export default function TotalExpense() {
    const data = useRecoilValue(expenseAtom)
    const [colors, setColors] = useState({})
    const groupedExpenseData = useRecoilValue(groupedExpenseState)
    // localStorage.removeItem("expenseColors") 

    useEffect(() => {
        const savedColors = JSON.parse(localStorage.getItem("groupedExpenseColors"))
        const updatedColors = { ...savedColors }

        groupedExpenseData.map((items) => {
            if (!updatedColors[items.category]) {
                updatedColors[items.category] = generateRandomColor();
            }
        })
        setColors(updatedColors);

        localStorage.setItem("groupedExpenseColors", JSON.stringify(updatedColors))

    }, [groupedExpenseData])


    return <div>
        <ResponsiveContainer width="91%" height={362} style={{ borderRadius: '10px', backgroundColor: '#212020', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <p>Expense</p>
            <PieChart>
                <Pie
                    data={groupedExpenseData}
                    cx="42%"
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