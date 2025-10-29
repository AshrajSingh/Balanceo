import mongoose from "mongoose";

export const incomeModel = mongoose.model('Income', {
    user_Id: { type: mongoose.Schema.ObjectId, ref: "Users" },
    category: {type: String, required: true},
    income: { type: String, required: true },
    incomeAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})