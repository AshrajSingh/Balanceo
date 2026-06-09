import mongoose from "mongoose";

export const expenseModel = mongoose.model('Expense', {
    user_Id: { type: mongoose.Schema.ObjectId, ref: "Users" },
    category: {type: String, required: true},
    expense: {type: String, required: true},
    expenseAmount: {type: Number, required: true},
    date: { type: Date, default: Date.now },
});