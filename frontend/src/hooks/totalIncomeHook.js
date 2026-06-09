import { useRecoilValue } from "recoil";
import { incomeAtom } from "../store/userAtom";
import { useMemo, useState } from "react";

export function useTotalIncome() {
    const incomeData = useRecoilValue(incomeAtom)

    //Adding income amounts wrapping inside useMemo
    const total_income = useMemo(() => {
        return incomeData.reduce((total, item) => total + Number(item.incomeAmount), 0)
    }, [incomeData])

    localStorage.setItem("total_income", JSON.stringify(total_income))

    return total_income
}