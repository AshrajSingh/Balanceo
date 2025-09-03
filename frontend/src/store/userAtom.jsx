import { atom } from "recoil";

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
        ({setSelf, onSet}) => {
            const saved = localStorage.getItem("expenses")

            if (saved != null) {
                setSelf(JSON.parse(saved))
            }

            onSet((newValue) => localStorage.setItem("expenses", JSON.stringify(newValue)))
        }
    ]
})

export const incomeAtom = atom({
    key: 'incomeAtom',
    default: [],
    effects: [
        ({setSelf, onSet}) => {
            const saved = localStorage.getItem("income")

            if (saved != null) {
                setSelf(JSON.parse(saved))
            }

            onSet((newValue) => localStorage.setItem("income", JSON.stringify(newValue)))
        }
    ]
})

