import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { incomeAtom } from "../store/userAtom";

function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
}

export default function Income_Graph() {
    const [colors, setColors] = useState({})
    const data = useRecoilValue(incomeAtom)
    // localStorage.removeItem("incomeColors")

    useEffect(() => {
        const savedColors = JSON.parse(localStorage.getItem("incomeColors"))
        const updatedColors = { ...savedColors }

        data.map((items) => {
            if (!updatedColors[items.source]) {
                updatedColors[items.source] = generateRandomColor();
            }

        })
        setColors(updatedColors);


        localStorage.setItem("incomeColors", JSON.stringify(updatedColors))

    }, [data])

    return <div>
        <ResponsiveContainer width="85%" height={360} style={{ borderRadius: '10px', backgroundColor: '#212020', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <p>Income</p>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="amount"
                    nameKey="source"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colors[entry.source]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
}
