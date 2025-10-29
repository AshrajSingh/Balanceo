
const apiURL = import.meta.env.VITE_API_URL
export async function signInUser({ username, email, password }) {
    // Handle sign-in logic here
    console.log("Signing in with:", username, email, password);

    // You can add API calls or other logic here
    const response = await fetch(`${apiURL}/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    try {

        const data = await response.json();
        console.log("signin backend response: ", data)
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data
    } catch (error) {
        // throw new Error (error.message || 'Something Went wrong')
        console.error("Auth service error:", error);
        throw error; // Re-throw the error for further handling
    }
}

//--------------------------------------------------------------------------------------------------------

export async function logInUser({ email, password }) {
    console.log("Logging in with:", email, password);

    const logInResponse = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    try {
        console.log("Response: ", logInResponse)
        const loginData = await logInResponse.json()
        if (!logInResponse.ok) {
            throw new Error(loginData.message)
        }
        return loginData;
    } catch (error) {
        throw error
    }
}

//--------------------------------------------------------------------------------------------------------

export async function setUserdata({ user_id, category, expense, expenseAmount }) {
    console.log("Fetching data from setUserdata")

    // GET USER TOKEN FROM LOCAL STORAGE
    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    console.log("setting user data with: ", user_id, category, expense, expenseAmount)

    const userResponse = await fetch(`${apiURL}/expensePage/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ user_id, category, expense, expenseAmount })
    })

    try {
        console.log("setUserdata", userResponse)
        const userData = await userResponse.json()
        console.log("userData from setUserdata: ", userData)

        return userData
    } catch (error) {
        throw error
    }
}

export async function deleteExpenses(expense_id) {
    console.log("deleteExpense called")
    console.log("expenseId in deleteExpense func: ", expense_id);

    // GET USER TOKEN FROM LOCAL STORAGE
    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    try {

        const confirmed = await fetch(`${apiURL}expensePage/delete/${expense_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        const res = await confirmed.json()
        console.log("res from deleteExpenses: ", res)

        return res

    } catch (error) {
        console.error("Error", error)
    }

}

// INCOME ROUTES 
//--------------------------------------------------------------------------------------------------------

export async function setUserIncome({ user_id, category, income, incomeAmount }) {
    console.log("income api called")
    console.log("income params in authService: ", user_id, category, income, incomeAmount)

    // GET USER TOKEN FROM LOCAL STORAGE
    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    const incomeResponse = await fetch(`${apiURL}/incomePage/income/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ user_id, category, income, incomeAmount })
    })

    try {
        console.log("incomeResponse: ", incomeResponse)
        const incomeData = await incomeResponse.json();
        return incomeData
    } catch (error) {
        console.error("Income API error: ", error)
    }
}

export async function deleteIncome(income_id) {
    console.log("deleteIncome called")
    console.log("income_id in deleteIncome func: ", income_id);

    // GET USER TOKEN FROM LOCAL STORAGE
    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    try {
        const confirmed = await fetch(`${apiURL}/incomePage/delete/income/${income_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        const res = await confirmed.json()
        console.log("res from deleteIncome: ", res)

        return res

    } catch (error) {
        console.error("Error", error)
    }
}