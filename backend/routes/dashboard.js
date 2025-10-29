import express from 'express'
import { expenseModel } from '../models/expense.js'

const app = express()
app.use(express.json())
const router = express.Router()

//GET ALL EXPENSES
router.get("/expensePage", async function (req, res) {
    try {
        console.log("log from dashboard.js")
        userData = localStorage.getItem("user")
        const data = JSON.parse(userData)
        console.log("Data: ", data)
        // const user_id = req.params.userId

        // console.log("User_Id: ", user_id)
        // console.log("expenseModel user_id: ", expenseModel.userId)
        const existingUser = await expenseModel.findOne({ user_Id: user_id })

        console.log("expense ExistingUser: ", existingUser)

        res.status(200).json(existingUser)
    } catch (error) {

    }
})


export default router