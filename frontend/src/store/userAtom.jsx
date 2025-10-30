import { atom, selector } from "recoil";
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

export const expenseAtom = atom({
    key: 'expenseAtom',
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            const saved = localStorage.getItem("expenses")
            const users = localStorage.getItem("user")
            const user = JSON.parse(users)
            const token = user.token
            console.log("token: ", token)

            // if(!token) return

            // if (saved != null) {
            //     setSelf(JSON.parse(saved))
            // }

            fetch(`${apiURL}/expensePage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    const realData = data.map(items => ({
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

export const incomeAtom = atom({
    key: 'incomeAtom',
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            const saved = localStorage.getItem("incomes")
            const users = localStorage.getItem("user")
            const user = JSON.parse(users)
            const token = user.token
            console.log("token from income: ", token)

            // if(!token) return

            // if (saved != null) {
            //     setSelf(JSON.parse(saved))
            // }

            fetch(`${apiURL}/incomePage/income`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json())
                .then(data => {
                    const realData = data.map(items => ({
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
    get: ({get}) => {
        const data = get(incomeAtom);
        
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
        }, {});

        // Convert the object to array for easier mapping
        return Object.values(grouped_Data);
    }
});
export const groupedExpenseState = selector({
    key: 'groupedExpenseState',
    get: ({get}) => {
        const data = get(expenseAtom);
        
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
        }, {});

        // Convert the object to array for easier mapping
        return Object.values(grouped_Data);
    }
});

export const isGroupedViewState = atom({
    key: 'isGroupedViewState',
    default: false
});