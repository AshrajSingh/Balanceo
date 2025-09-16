import { atom } from "recoil";
import { expenseModel } from "../../../backend/models/expense";


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

            // const existingUser = expenseModel.find({user_Id: user.user_id})

            if (saved != null) {
                setSelf(JSON.parse(saved))
            }

            fetch("http://localhost:5000/api/dashboard",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("fetched from backend: ", data)
                    // if(user.user_id == ){}
                    const realData = data.map(items => ({
                        expense_id: items._id,
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
            const saved = localStorage.getItem("income")

            if (saved != null) {
                setSelf(JSON.parse(saved))
            }

            onSet((newValue) => localStorage.setItem("income", JSON.stringify(newValue)))
        }
    ]
})

