import { useResetRecoilState, useSetRecoilState } from "recoil"
import { authAtom, expenseAtom, incomeAtom } from "../store/userAtom"

export function useResetData() {
    const setAuth = useSetRecoilState(authAtom)
    const resetIncome = useResetRecoilState(incomeAtom)
    const resetExpense = useResetRecoilState(expenseAtom)

    const handleLogout = () => {

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

    return handleLogout;
}