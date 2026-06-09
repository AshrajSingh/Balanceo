import { useRecoilState, useRecoilValue } from "recoil"
import { groupedIncomeState, incomeAtom, isGroupedViewState } from "../store/userAtom"
import ConfirmBox from "./ConfirmBox"
import '../styleSheets/incomePageTable.css'
import { useState } from "react"
import { deleteIncome } from "../services/authService"
import toast from "react-hot-toast"
     
export function IncomePageTable() {
    const [data, setData] = useRecoilState(incomeAtom)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const groupedIncomeData = useRecoilValue(groupedIncomeState);
    const [isGroupedView, setIsGroupedView] = useRecoilState(isGroupedViewState);

    async function deleteItems(row) {

        try {
            const deletedIncome = await deleteIncome(row._id)

            if (deletedIncome) {
                setData(prev => {
                    const updateData = prev.filter((items) => items._id !== row._id)
                     console.log("before:", prev.length, "after:", updateData.length)
                    localStorage.setItem("incomes", JSON.stringify(updateData))
                    return updateData
                })
                toast.success("Income deleted successfully.")
            }


        } catch (error) {
            toast.error("Failed to delete income.")
            console.error("Failed to delete income: ", error)
        }
    }

    function handleConfirmDelete(row) {

        if (!row) return;
        const deleted = deleteItems(row);
        if (!deleted) {
            console.error("deletion Failed")
            toast.error("failed to delete expense")
            return
        }
        setConfirmOpen(false);
    }

    function handleCancelDelete() {
        setConfirmOpen(false);
    }

    if (isGroupedView) {
        //showing grouped data
        return (
            <div className="incomeTable">
                <button className="view-toggle-btn" onClick={() => setIsGroupedView(!isGroupedView)}>Organize</button>

                <table>
                    <thead className="tableHead">
                        <tr>
                            <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Category</th>
                            <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Total Amount</th>
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
                                    <td>{group.category.charAt(0).toUpperCase() + group.category.slice(1)}</td>
                                    <td>{group.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="incomeTable">
            <button className="view-toggle-btn" onClick={() => setIsGroupedView(!isGroupedView)}>Organize</button>
            <table>
                <thead className="tableHead">
                    <tr>
                        <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Category</th>
                        <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Source</th>
                        <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Amount</th>
                        <th style={{ border: "1px solid white", padding: "8px", fontWeight: '500' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* showing added data of the table */}
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "8px" }}>
                                    No data yet
                                </td>
                            </tr>
                        ) : data.map((row, index) => (
                            <tr key={row._id || index}>
                                <td>{row.category.charAt(0).toUpperCase() + row.category.slice(1)}
                                </td>

                                <td>{row.income.charAt(0).toUpperCase() + row.income.slice(1)}</td>

                                <td>
                                    {row.incomeAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </td>

                                <td className="incomeDate">{new Date(row.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}</td>

                                <td style={{ border: 'none' }}>
                                    <ConfirmBox
                                        open={confirmOpen}
                                        message={"Are you sure you want to delete this income?"}
                                        onConfirm={() => handleConfirmDelete(row)}
                                        onCancel={handleCancelDelete}
                                    />
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}