import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { groupedIncomeState } from "../store/userAtom";
import '../styleSheets/expenseGraph.css'
import useGenerateColor from "../hooks/generateColor";

export default function Income_Graph() {
    const groupedData = useRecoilValue(groupedIncomeState);
    const { generateIncomeColors } = useGenerateColor();

    return (
        <div>
            <ResponsiveContainer 
                width="75%" 
                height={370} 
                style={{ 
                    borderRadius: '10px', 
                    backgroundColor: '#1c1c1f', 
                    boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 11px' 
                }}
            >
                <PieChart>
                    <Pie
                        data={groupedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="totalAmount"
                        nameKey="category"
                        label
                    >
                        {groupedData.map((entry, index) => (
                            <Cell 
                                key={index} 
                                fill={generateIncomeColors(entry.category)} 
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}