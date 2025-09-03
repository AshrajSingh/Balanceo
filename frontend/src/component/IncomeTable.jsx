import TableWrapper from "../wrappers/TableWrapper";
import '../styleSheets/TableWrapper.css'
import { useRecoilState } from "recoil";
import { expenseAtom, incomeAtom } from "../store/userAtom";
import { useState } from "react";

export default function IncomeTable() {
    const [data, setData] = useRecoilState(incomeAtom)
    const [isAdding, setIsAdding] = useState(false)
    const [newRow, setNewRow] = useState({ source: '', amount: '' })

    function handleBlur() {
        if (newRow.source.trim() !== '' && newRow.amount.trim() !== '') {
            setData(prev => ([...prev, { ...newRow, amount: Number(newRow.amount) }]))
            setNewRow({ source: '', amount: '' })
            setIsAdding(false)
        }
        if (newRow.source.trim() === '' && newRow.amount.trim() === "") {
            setIsAdding(false)
        }
    }

    function deleteItems(index) {
        const confirmDelete = confirm("You want to delete an item?")
        if (confirmDelete) {
            setData((prev) => {
                const updatedData = prev.filter((_, i) => i !== index)
                localStorage.setItem("incomeColors", JSON.stringify(updatedData))

                return updatedData
            })
        }
    }

    return <div style={{ flex: '50%' }}>
        <TableWrapper>
            <p>Income Sources</p>
            <table>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px", fontWeight: '300' }}>Source</th>
                        <th style={{ border: "1px solid black", padding: "8px", fontWeight: '300' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* showing added data of the table */}
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center", padding: "8px" }}>
                                    No data yet
                                </td>
                            </tr>
                        ) : data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.source}</td>
                                <td>
                                    {row.amount}
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button onClick={() => deleteItems(index)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    {/* adding data into the table when button is clicked */}
                    {
                        isAdding && (
                            <tr>
                                <td>
                                    <input type="text" placeholder="Enter Source" value={newRow.source} onChange={(e) => setNewRow((prev) => ({ ...prev, source: e.target.value }))} onBlur={handleBlur} autoFocus />
                                </td>
                                <td>
                                    <input type="text" placeholder="Enter Amount" value={newRow.amount} onChange={(e) => setNewRow((prev) => ({ ...prev, amount: e.target.value }))} onBlur={handleBlur} />

                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={() => setIsAdding(true)}> + add items</button>
        </TableWrapper>
    </div>
}
