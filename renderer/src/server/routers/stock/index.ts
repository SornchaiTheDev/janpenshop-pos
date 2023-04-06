import { protectedProcedure, router } from '../../trpc'
import { z } from 'zod'
import { prisma } from '../../prisma'

export const stockRouter = router({
  addItem: protectedProcedure
    .input(
      z.object({
        barcode: z.string(),
        name: z.string(),
        retailPrice: z.number(),
        wholesalePrice: z.number(),
        cost: z.number(),
        tags: z.array(z.string()),
        stockAmount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const isExisted = await prisma.stocks.findFirst({
        where: {
          barcode: input.barcode,
        },
      })
      if (isExisted) {
        throw new Error('Item already existed')
      }
      // check if tags already in tags table
      const existingTags = await Promise.all(
        input.tags.map((name) => prisma.tag.findUnique({ where: { name } }))
      )
      // Filter out any tags that already exist
      const newTags = input.tags.filter((_, index) => !existingTags[index])
      // Create any new tags
      const createdTags = await Promise.all(
        newTags.map((name) => prisma.tag.create({ data: { name } }))
      )
      // Combine the existing and new tags
      const allTags = [...existingTags, ...createdTags].filter(
        (tag) => tag != null
      )

      const item = await prisma.stocks.create({
        data: {
          barcode: input.barcode,
          name: input.name,
          retailPrice: input.retailPrice,
          wholesalePrice: input.wholesalePrice,
          cost: input.cost,
          tags: {
            connect: allTags.map((tag) => ({ id: tag?.id })),
          },
          stockAmount: {
            create: {
              amount: input.stockAmount,
            },
          },
        },
        include: {
          tags: true,
          stockAmount: true,
        },
      })

      return item
    }),
  deleteAll: protectedProcedure.mutation(async () => {
    const deleted = await prisma.stocks.deleteMany()
    console.log(deleted)
  }),
})
