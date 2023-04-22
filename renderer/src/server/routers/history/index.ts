import { protectedProcedure, router } from '../../trpc'
import { z } from 'zod'
import { prisma } from '../../prisma'

export const historyRouter = router({
  addHistory: protectedProcedure
    .input(
      z.object({
        billId: z.string(),
        totalPrice: z.number(),
        discount: z.number(),
        items: z.array(
          z.object({
            name: z.string(),
            barcode: z.string(),
            amount: z.number(),
            price: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { billId, items, totalPrice, discount } = input

      await prisma.history.create({
        data: {
          billId,
          totalPrice,
          discount,
          items: {
            create: items.map((item) => ({
              name: item.name,
              barcode: item.barcode,
              amount: item.amount,
              price: item.price,
            })),
          },
        },
      })
    }),
  getHistory: protectedProcedure.query(async () => {
    return await prisma.history.findMany({
      include: {
        items: true,
      },
    })
  }),
  selectHistory: protectedProcedure
    .input(z.object({ billId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.history.findUnique({
        where: {
          billId: input.billId,
        },
        include: {
          items: true,
        },
      })
    }),
})
