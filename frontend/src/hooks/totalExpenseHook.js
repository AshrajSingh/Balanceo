import { useRecoilValue } from "recoil";
import { expenseAtom } from "../store/userAtom";
import { useState } from "react";

export function useTotalExpense() {
    const expenseData = useRecoilValue(expenseAtom)

    //Adding expense amounts
        const total_expenses = expenseData.map(items => Number(items.expenseAmount)).reduce((total, amount) => total + amount, 0)
        console.log("Total Expense: ", total_expenses)

        localStorage.setItem("total_expense", JSON.stringify(total_expenses))

    return total_expenses
}