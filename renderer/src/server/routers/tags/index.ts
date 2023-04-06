import { protectedProcedure, router } from '../../trpc'
import { prisma } from '../../prisma'

export const tagsRouter = router({
  list: protectedProcedure.query(async () => {
    const tags = await prisma.tag.findMany()
    return tags
  }),
})
