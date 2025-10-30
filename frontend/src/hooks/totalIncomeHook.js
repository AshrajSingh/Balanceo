import { useRecoilValue } from "recoil";
import { incomeAtom } from "../store/userAtom";
import { useState } from "react";

export function useTotalIncome() {
    const incomeData = useRecoilValue(incomeAtom)

    //Adding income amounts
    const total_income = incomeData.map(items => Number(items.incomeAmount)).reduce((total, amount) => total + amount, 0)
    console.log("Total Income: ", total_income)

    localStorage.setItem("total_income", JSON.stringify(total_income))

    return total_income
}