import express from 'express'
import userAuthentication from '../middlewares/userAuthentication.js'
import { incomeModel } from '../models/income.js'

const app = express()
app.use(express.json())
const router = express.Router()

router.get("/incomePage/income", userAuthentication, async (req, res) => {
    try {
        const existingIncomes = await incomeModel.find({ user_Id: req.user.user_id })
        res.status(200).json(existingIncomes)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.post("/incomePage/income/add", userAuthentication, async (req, res) => {
    try {
        const { category, income, incomeAmount } = req.body;

        const newIncome = new incomeModel({
            user_Id: req.user.user_id,
            category: category,
            income: income,
            incomeAmount: Number(incomeAmount)
        })
        const savedIncomes = await newIncome.save()

        console.log("Saved incomes: ", savedIncomes)
        res.status(200).json(savedIncomes)
    }
    catch (error) {
        console.error("Error saving income:", error)
        res.status(500).json({ msg: error.message }) 
    }
})

router.delete("/incomePage/delete/income/:income_id", userAuthentication, async (req, res)=>{
    const {income_id} = req.params
    console.log("income_id in router: ", income_id)

    try{
        const deleteIncome = await incomeModel.findByIdAndDelete({
            _id: income_id,
            user_Id: req.user.user_id
        })

        res.status(200).json({msg: "Income Deleted", deleteIncome})
    } catch (error) {
        console.error("Error deleting income:", error)
        res.status(500).json({ msg: error.message })
    }
})


export default router
