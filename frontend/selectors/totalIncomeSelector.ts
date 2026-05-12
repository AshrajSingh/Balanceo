import { selector } from 'recoil';
//@ts-ignore
import { incomeAtom, expenseAtom } from "../src/store/userAtom.js";

type IncomeItem = {
    incomeAmount: number
}

export const totalIncomeSelector = selector<number>({
    key: 'totalIncomeSelector',
    get: ({ get }) => {
        const incomeData = get(incomeAtom);
        return incomeData.reduce((total, item) => total + item.incomeAmount, 0)
    }
});

export const TotalExxpenseSelector = selector<number>({
    key: 'totalExxpenseSelector',
    get: ({ get }) => {
        const expenseData = get(expenseAtom);
        return expenseData.reduce((total, item) => total + item.expenseAmount, 0)
    }
});

export const TotalBalanceSelector = selector<number>({
    key: 'totalBalanceSelector',
    get: ({ get }) => {
        const totalIncome = get(totalIncomeSelector)
        const totalExpense = get(TotalExxpenseSelector)
        return totalIncome - totalExpense
    }
})