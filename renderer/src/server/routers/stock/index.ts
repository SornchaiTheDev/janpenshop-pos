import { protectedProcedure, router } from '../../trpc'
import { z } from 'zod'
import { prisma } from '../../prisma'

export const stockRouter = router({
  addItem: protectedProcedure
    .input(
      z.object({
        barcode: z.string(),
        name: z.string(),
        price: z.number(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
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
          price: input.price,
          tags: {
            connect: allTags.map((tag) => ({ id: tag?.id })),
          },
        },
        include: {
          tags: true,
        },
      })

      return item
    }),
  deleteAll: protectedProcedure.mutation(async () => {
    const deleted = await prisma.stocks.deleteMany()
    console.log(deleted)
  }),
  getItem: protectedProcedure.query(() => {
    return prisma.stocks.findMany({
      include: { tags: true },
      orderBy: { name: 'asc' },
    })
  }),
  editItem: protectedProcedure
    .input(
      z.object({
        barcode: z.string(),
        name: z.string(),
        price: z.number(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
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

      const item = await prisma.stocks.update({
        where: {
          barcode: input.barcode,
        },
        data: {
          name: input.name,
          price: input.price,
          tags: {
            set: allTags.map((tag) => ({ id: tag?.id })),
          },
        },
        include: {
          tags: true,
        },
      })

      return item
    }),
  deleteItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const deleted = await prisma.stocks.delete({
        where: {
          barcode: input,
        },
      })
      return deleted
    }),
  listWithPagination: protectedProcedure
    .input(z.object({ pageIndex: z.number(), pageSize: z.number() }))
    .mutation(async ({ input }) => {
      const { pageIndex, pageSize } = input
      const totalPage = Math.ceil((await prisma.stocks.count()) / pageSize)
      const items = await prisma.stocks.findMany({
        skip: pageIndex * pageSize,
        take: pageSize,
        include: {
          tags: true,
        },
      })

      return { items, totalPage }
    }),
})
