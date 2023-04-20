import { Stocks } from '@prisma/client'

export type Item = Stocks & { amount: number }
