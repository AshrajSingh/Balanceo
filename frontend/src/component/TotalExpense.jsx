import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';
import { expenseAtom } from '../store/userAtom';
import { useEffect, useState } from 'react';

    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
    }

export default function TotalExpense() {
    const data = useRecoilValue(expenseAtom)
    const [colors, setColors] = useState({})
    // localStorage.removeItem("expenseColors") 

    useEffect(() => {
        const savedColors = JSON.parse(localStorage.getItem("expenseColors"))
        const updatedColors = { ...savedColors }

        data.map((items) => {
            if (!updatedColors[items.expense]) {
                updatedColors[items.expense] = generateRandomColor();
            }
        })
        setColors(updatedColors);

        localStorage.setItem("expenseColors", JSON.stringify(updatedColors))

    }, [data])


    return <div>
        <ResponsiveContainer width="85%" height={362} style={{ borderRadius: '10px', backgroundColor: '#212020', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <p>Expense</p>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="expenseAmount"
                    nameKey="expense"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colors[entry.expense] || "#8884d8"} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
}