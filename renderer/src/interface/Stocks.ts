import { Prisma } from '@prisma/client'

export type Stocks = Prisma.StocksGetPayload<{ include: { tags: true } }>
