import {z} from 'zod'

export const IncomeItemSchema = z.object({
    _id: z.string(),
    category: z.string(),
    date: z.string(),
    income: z.string(),
    incomeAmount: z.number(),
})

export type IncomeItem = z.infer<typeof IncomeItemSchema>