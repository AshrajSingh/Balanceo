import { useTotalExpense } from "./totalExpenseHook";
import { useTotalIncome } from "./totalIncomeHook";

export function useTotalBalance() {
    // const total_income = JSON.parse(localStorage.getItem("total_income"))
    // const total_expense = JSON.parse(localStorage.getItem("total_expense"))

    const total_income = useTotalIncome()
    const total_expense = useTotalExpense()

    const total_balance = total_income - total_expense;
    localStorage.setItem("total_balance", JSON.stringify(total_balance))

    return total_balance
}