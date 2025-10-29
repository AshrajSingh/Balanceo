import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { groupedIncomeState, incomeAtom } from "../store/userAtom";
import '../styleSheets/expenseGraph.css'

function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
}

export default function Income_Graph() {
    const [colors, setColors] = useState({})
    const data = useRecoilValue(incomeAtom)
    const groupedData = useRecoilValue(groupedIncomeState)
    // localStorage.removeItem("incomeColors")

    useEffect(() => {
        const savedColors = JSON.parse(localStorage.getItem("updatedIncomeColors"))
        const updatedColors = { ...savedColors }

        groupedData.map((items) => {
            if (!updatedColors[items.category]) {
                updatedColors[items.category] = generateRandomColor();
            }

        })
        setColors(updatedColors);


        localStorage.setItem("updatedIncomeColors", JSON.stringify(updatedColors))

    }, [groupedData])

    return <div>
        <ResponsiveContainer width="85%" height={290} style={{ borderRadius: '10px', backgroundColor: '#212020', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <p>Income</p>
            <PieChart>
                <Pie
                    data={groupedData}
                    cx="47%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="totalAmount"
                    nameKey="category"
                    label
                >
                    {groupedData.map((entry, index) => (
                        <Cell key={index} fill={colors[entry.category]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
}
