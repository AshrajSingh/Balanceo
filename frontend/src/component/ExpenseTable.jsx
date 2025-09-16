import TableWrapper from "../wrappers/TableWrapper";
import '../styleSheets/TableWrapper.css'
import { useRecoilState } from "recoil";
import { expenseAtom } from "../store/userAtom";
import { useState } from "react";
import { deleteExpenses, setUserdata } from "../services/authService";

export default function ExpenseTable() {
    const [data, setData] = useRecoilState(expenseAtom)
    const [isAdding, setIsAdding] = useState(false)
    const [newRow, setNewRow] = useState({ expense: '', expenseAmount: '' })

    async function handleBlur() {
        const userData = localStorage.getItem("user")
        const id_data = JSON.parse(userData)
        const id = id_data.user_id

        if (newRow.expense.trim() !== '' && newRow.expenseAmount.trim() !== '') {
            console.log("setUserData params: ", id, newRow.expense, newRow.expenseAmount)

            const payload = {
                userId: id,
                expense: newRow.expense,
                expenseAmount: Number(newRow.expenseAmount)
            }

            console.log("after payload: ", payload)
            const userData = await setUserdata(payload)
            console.log("userData from ExpenseTable.jsx", userData)
            setData(prev => [...prev, userData])

            setNewRow({ expense: '', expenseAmount: '' })
            setIsAdding(false)
        }
        if (newRow.expense.trim() === '' && newRow.expenseAmount.trim() === "") {
            setIsAdding(false)
        }
    }

    async function deleteItems(row) {
        console.log("expense id in jsx: ", row.expense_id)
        const deletedItem = await deleteExpenses(row.expense_id)
        console.log("deleted item: ", deletedItem.deleteExpense._id)

        if (deletedItem) {
            setData(prev => {
                const updated = prev.filter(exp => exp._id !== row.expense_id);
                localStorage.setItem("expenses", JSON.stringify(updated));
                return updated;
            });

        }
    }

    return <div style={{ flex: '50%' }}>
        <TableWrapper>
            <p>Expense Sources</p>
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
                            <tr key={row._id || index}>
                                <td>{row.expense}</td>
                                <td>
                                    {row.expenseAmount}
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button onClick={() => deleteItems(row, index)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    {/* adding data into the table when button is clicked */}
                    {
                        isAdding && (
                            <tr>
                                <td>
                                    <input type="text" placeholder="Enter Source" value={newRow.expense} onChange={(e) => setNewRow((prev) => ({ ...prev, expense: e.target.value }))} onBlur={handleBlur} autoFocus />
                                </td>
                                <td>
                                    <input type="text" placeholder="Enter Amount" value={newRow.expenseAmount} onChange={(e) => setNewRow((prev) => ({ ...prev, expenseAmount: e.target.value }))} onBlur={handleBlur} />

                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={() => setIsAdding(true)}>+ add items</button>
        </TableWrapper>
    </div>
}