import { Prisma } from '@prisma/client'

export type FilterHistory = Prisma.HistoryGetPayload<{
  select: { billId: true; totalPrice: true; items: true }
}>

export type History = Prisma.HistoryGetPayload<{
  include: { items: true }
}>
