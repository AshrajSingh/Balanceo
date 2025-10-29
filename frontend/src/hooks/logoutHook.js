import { useResetRecoilState, useSetRecoilState } from "recoil"
import { authAtom, expenseAtom, incomeAtom } from "../store/userAtom"

export function useResetData() {
    const setAuth = useSetRecoilState(authAtom)
    const resetIncome = useResetRecoilState(incomeAtom)
    const resetExpense = useResetRecoilState(expenseAtom)

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?")

        if (confirmLogout) {
            //clearing data from local storage and recoil state
            localStorage.clear();
            
            resetExpense();
            resetIncome();
            
            setAuth({
                isLoggedIn: false,
                isChecked: true,
                user: null
            })
        }
    }

    return handleLogout;
}