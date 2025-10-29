import express from 'express'
import { expenseModel } from '../models/expense.js'
import userAuthentication from '../middlewares/userAuthentication.js'

const app = express()
app.use(express.json())
const router = express.Router()

router.get("/expensePage", userAuthentication, async (req, res) => {

    try {
        const existingExpenses = await expenseModel.find({ user_Id: req.user.user_id })
        res.status(200).json(existingExpenses)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
})


router.post("/expensePage/add", userAuthentication, async function (req, res) {
    try {
        const {category, expense, expenseAmount } = req.body;

        const newExpense = new expenseModel({
            user_Id: req.user.user_id,
            category: category,
            expense: expense,
            expenseAmount: Number(expenseAmount)
        })
        const savedExpenses = await newExpense.save()

        console.log("Saved expenses: ", savedExpenses)
        res.status(200).json(savedExpenses)
    }
    catch (error) {
        console.error("Error saving expense: ", error)
        res.status(500).json({ msg: error.message })
    }
})


router.delete("/expensePage/delete/:expense_id", userAuthentication, async function (req, res) {
    const { expense_id } = req.params
    console.log("expense_id in router: ", expense_id)

    try {

        const deleteExpense = await expenseModel.findByIdAndDelete({
            _id: expense_id,
            user_Id: req.user.user_id
        })

        if (!deleteExpense) {
            res.status(401).json({ message: 'Expense not found' })
        }

        res.status(200).json({ message: 'Expense Deleted', deleteExpense })

    } catch (error) {
        console.error(error)
    }
})

export default router;