import { useSetRecoilState } from 'recoil';
import { expenseAtom, incomeAtom } from '../store/userAtom';

const apiURL = import.meta.env.VITE_API_URL;

export function useRefreshData() {
    const setExpenses = useSetRecoilState(expenseAtom);
    const setIncomes = useSetRecoilState(incomeAtom);

    const refreshData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.token) return;

            console.log('before fetch useRefresh.jsx ')
            // Fetch expenses
            const expenseResponse = await fetch(`${apiURL}/expensePage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const expenseData = await expenseResponse.json();
            const processedExpenses = expenseData.map(items => ({
                _id: items._id,
                category: items.category,
                date: items.date,
                expense: items.expense,
                expenseAmount: Number(items.expenseAmount)
            }));
            setExpenses(processedExpenses);
            localStorage.setItem("expenses", JSON.stringify(processedExpenses));

            // Fetch incomes
            const incomeResponse = await fetch(`${apiURL}/incomePage/income`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const incomeData = await incomeResponse.json();
            const processedIncomes = incomeData.map(items => ({
                _id: items._id,
                category: items.category,
                date: items.date,
                income: items.income,
                incomeAmount: Number(items.incomeAmount)
            }));
            setIncomes(processedIncomes);
            localStorage.setItem("income", JSON.stringify(processedIncomes));
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
    };

    return refreshData;
}