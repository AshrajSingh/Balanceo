import { atom, selector } from "recoil";
import { z } from 'zod'
import { ExpenseItemSchema, type ExpenseItem } from "../validations/expenseDataValidation.js";
import { type IncomeItem, IncomeItemSchema } from "../validations/incomeDataValidation.js";
const apiURL = import.meta.env.VITE_API_URL

export const signUpAtom = atom({
    key: 'signUpAtom',
    default: {
        username: '',
        email: '',
        password: '',
    }
})
export const logInAtom = atom({
    key: 'logInAtom',
    default: {
        user_id: null,
        email: '',
        password: '',
    }
})
export const authAtom = atom({
    key: 'authAtom',
    default: {
        isLoggedIn: false,
        isChecked: false,
        user: null
    }
})

export const expenseAtom = atom<ExpenseItem[]>({
    key: 'expenseAtom',
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            const saved = localStorage.getItem("expenses")
            const users = localStorage.getItem("user")

            if (!users) return

            const user = JSON.parse(users)
            const token = user.token
            console.log("token: ", token)

            if (!token) return

            if (!saved) return

            console.log('expense atom setSelf')
            setSelf(JSON.parse(saved))


            fetch(`${apiURL}/expensePage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json())
                .then(data => {
                    const parsed = z.array(ExpenseItemSchema).parse(data);

                    const realData = parsed.map(items => ({
                        _id: items._id,
                        category: items.category,
                        date: items.date,
                        expense: items.expense,
                        expenseAmount: Number(items.expenseAmount)
                    }))
                    setSelf(realData)
                    localStorage.setItem("expenses", JSON.stringify(realData))
                })
                .catch((err) => console.error("Failed to fetch expenses:", err));

            onSet((newValue) => localStorage.setItem("expenses", JSON.stringify(newValue)))
        }
    ]
})

export const incomeAtom = atom<IncomeItem[]>({
    key: 'incomeAtom',
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            const saved = localStorage.getItem("incomes")
            const users = localStorage.getItem("user")

            if (!users) return

            const user = JSON.parse(users)
            const token = user.token
            console.log("token from income: ", token)

            if (!token) return

            if (!saved) return

            console.log('income setSelf called')
            setSelf(JSON.parse(saved))

            fetch(`${apiURL}/incomePage/income`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json())
                .then(data => {
                    const parsed = z.array(IncomeItemSchema).parse(data)

                    const realData = parsed.map(items => ({
                        _id: items._id,
                        category: items.category,
                        date: items.date,
                        income: items.income,
                        incomeAmount: Number(items.incomeAmount)
                    }))

                    setSelf(realData)
                    localStorage.setItem("incomes", JSON.stringify(realData))

                }).catch((err) => console.error("Failed to fetch income: ", err))

            onSet((newValue) => localStorage.setItem("incomes", JSON.stringify(newValue)))

        }
    ]
})

export const groupedIncomeState = selector({
    key: 'groupedIncomeState',
    get: ({ get }) => {
        const data = get(incomeAtom);

        type GroupedIncome = {
            category: string,
            totalAmount: number,
            items: IncomeItem[]
        }

        const grouped_Data = data.reduce((groups, item) => {
            const category = item.category;
            if (!groups[category]) {
                groups[category] = {
                    category: category,
                    totalAmount: 0,
                    items: []
                };
            }
            groups[category].items.push(item);
            groups[category].totalAmount += Number(item.incomeAmount);
            return groups;
        }, {} as Record<string, GroupedIncome>);

        // Convert the object to array for easier mapping
        return Object.values(grouped_Data);
    }
});
export const groupedExpenseState = selector({
    key: 'groupedExpenseState',
    get: ({ get }) => {
        const data = get(expenseAtom);

        type GroupedExpense = {
            category: string,
            totalAmount: number,
            items: ExpenseItem[]
        }

        const grouped_Data = data.reduce((groups, item) => {
            const category = item.category;
            if (!groups[category]) {
                groups[category] = {
                    category: category,
                    totalAmount: 0,
                    items: []
                };
            }
            groups[category].items.push(item);
            groups[category].totalAmount += Number(item.expenseAmount);
            return groups;
        }, {} as Record<string, GroupedExpense>);

        // Convert the object to array for easier mapping
        return Object.values(grouped_Data);
    }
});

type GroupBy = 'daily' | 'monthly' | 'category'

export function groupTransaction(data: any[], amountKey: string, groupBy: GroupBy) {

    if (groupBy === 'category') {

        const grouped_Data = data.reduce((groups, item) => {
            const category = item.category;

            if (!groups[category]) {
                groups[category] = {
                    category: category,
                    totalAmount: 0,
                    items: []
                };
            }

            groups[category].items.push(item);
            groups[category].totalAmount += Number(item[amountKey]);

            return groups;
        }, {});
        return Object.values(grouped_Data);
    }

    if (groupBy === 'daily') {
        const order = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

        const grouped_data = data.reduce((acc, item) => {
            const key = new Date(item.date).toLocaleDateString('en-US', { weekday: "short" })

            if (!acc[key]) {
                acc[key] = {
                    name: key,
                    totalAmount: 0
                }
            }
            acc[key].totalAmount += Number(item[amountKey])

            return acc
        }, {})
        return order.filter(d => grouped_data[d]).map(d => grouped_data[d]);
    }

    if (groupBy === 'monthly') {
        const order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const grouped_data = data.reduce((acc, item) => {
            const key = new Date(item.date).toLocaleDateString('en-US', { month: "short" })

            if (!acc[key]) {
                acc[key] = {
                    name: key,
                    totalAmount: 0
                }
            }

            acc[key].totalAmount += Number(item[amountKey])

            return acc
        }, {})
        return order.filter(m => grouped_data[m]).map(m => grouped_data[m]);
    }
    return []
}

export const isGroupedViewState = atom({
    key: 'isGroupedViewState',
    default: false
});