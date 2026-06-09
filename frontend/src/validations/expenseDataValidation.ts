import {z} from 'zod'

export const ExpenseItemSchema = z.object({
    _id: z.string(),
    category: z.string(),
    date: z.string(),
    expense: z.string(),
    expenseAmount: z.number(),
})

export type ExpenseItem = z.infer<typeof ExpenseItemSchema>