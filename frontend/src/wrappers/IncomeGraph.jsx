import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { groupedIncomeState, incomeAtom } from "../store/userAtom";
import '../styleSheets/expenseGraph.css'

export default function Income_Graph() {
    const colors = JSON.parse(localStorage.getItem("income_colors")) || {}
    const data = useRecoilValue(incomeAtom)
    const groupedData = useRecoilValue(groupedIncomeState)
    // localStorage.removeItem("incomeColors")


    return <div>
        <ResponsiveContainer width="75%" height={270} style={{ borderRadius: '10px', backgroundColor: '#1c1c1f', boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' }}>
            <PieChart>
                <Pie
                    data={groupedData}
                    cx="53%"
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
