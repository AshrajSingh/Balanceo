import TableWrapper from "../wrappers/TableWrapper";
import '../styleSheets/TableWrapper.css'
import '../styleSheets/expenseGraph.css'
import { useRecoilValue } from "recoil";
import { groupedIncomeState, incomeAtom } from "../store/userAtom";


import React from "react";
import { useNavigate } from "react-router-dom";

export default function IncomeTable() {
    const groupedIncomeData = useRecoilValue(groupedIncomeState)
    const navigate = useNavigate()


    return <div style={{ flex: '50%' }}>
        <TableWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0 2rem 0px'}}>
            <p>Income Sources</p> <button className="view-toggle-btn" onClick={() => navigate("/incomePage")}>See all</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px", fontWeight: '300' }}>Category</th>
                        <th style={{ border: "1px solid black", padding: "8px", fontWeight: '300' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groupedIncomeData.length === 0 ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center", padding: "8px" }}>
                                    No data yet
                                </td>
                            </tr>
                        ) : groupedIncomeData.map((group, index) => (
                            <tr key={index}>
                                <td>{group.category}</td>
                                <td>{group.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </TableWrapper>
    </div>
}
