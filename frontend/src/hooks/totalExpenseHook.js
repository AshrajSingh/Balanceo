import { useRecoilValue } from "recoil";
import { expenseAtom } from "../store/userAtom";
import { useMemo, useState } from "react";

export function useTotalExpense() {
    const expenseData = useRecoilValue(expenseAtom)

    //Adding expense amounts
    const total_expenses = useMemo(() => {
        return expenseData.reduce((total, items) => total + Number(items.expenseAmount), 0)
    }, [expenseData])
    console.log("Total Expense: ", total_expenses)

    localStorage.setItem("total_expense", JSON.stringify(total_expenses))

    return total_expenses
}