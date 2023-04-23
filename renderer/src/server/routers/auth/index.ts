import { router, procedure, protectedProcedure } from '../../trpc'
import { z } from 'zod'
import { prisma } from '@/server/prisma'
import bcrypt from 'bcrypt'

export const authRouter = router({
  getUser: protectedProcedure.query(async () => {
    return await prisma.users.findFirst()
  }),
  change: procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.users.deleteMany()
      const user = await prisma.users.create({
        data: {
          username: input.username,
          password: bcrypt.hashSync(input.password, 10),
        },
      })
      return user
    }),
  login: procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      let isSamePassword = false

      const user = await prisma.users.findFirst({
        where: {
          username: input.username,
        },
      })

      if (user) {
        isSamePassword = await bcrypt.compare(input.password, user.password)
      }

      return { isAuthed: isSamePassword }
    }),
  list: procedure.query(() => {
    const users = prisma.users.findMany()
    return users
  }),
  delete: procedure.mutation(async () => {
    await prisma.users.deleteMany()
  }),
})
