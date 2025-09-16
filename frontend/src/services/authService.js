import { json } from "zod";
import { expenseModel } from "../../../backend/models/expense";

export async function signInUser({ username, email, password }) {
    // Handle sign-in logic here
    console.log("Signing in with:", username, email, password);

    // You can add API calls or other logic here
    const response = await fetch('http://localhost:5000/api/signIn', {
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

    const logInResponse = await fetch('http://localhost:5000/api/login', {
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

export async function setUserdata({ userId, expense, expenseAmount }) {
    console.log("Fetching data from setUserdata")
    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    console.log("setting user data with: ", userId, expense, expenseAmount)

    const userResponse = await fetch('http://localhost:5000/api/dashboard/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId, expense, expenseAmount })
    })

    try {
        console.log("setUserdata", userResponse)
        const userData = await userResponse.json()

        return userData
    } catch (error) {
        throw error
    }
}

export async function deleteExpenses(expense_id) {
    console.log("deleteExpense called")
    console.log("expenseId in deleteExpense func: ", expense_id);
    const confirmDelete = confirm("You want to delete an item?")

    const users = localStorage.getItem("user")
    const user = JSON.parse(users)
    const token = user.token

    try {

        if (confirmDelete) {

            const confirmed = await fetch(`http://localhost:5000/api/dashboard/delete/${expense_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            const res = await confirmed.json()
            console.log("res from deleteExpenses: ", res)

            return res
        }
    } catch (error) {
        console.error("Error", error)
    }

}