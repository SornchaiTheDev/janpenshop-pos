import { z } from 'zod'
import { router, procedure } from '../trpc'
import { authRouter } from '../routers/auth'
import { stockRouter } from '../routers/stock'
import { tagsRouter } from '../routers/tags'

export const appRouter = router({
  hello: procedure
    .input(
      z
        .object({
          text: z.string(),
        })
        .optional()
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input ? input.text : 'World'} !`,
      }
    }),
  auth: authRouter,
  stock: stockRouter,
  tags: tagsRouter,
})

export type AppRouter = typeof appRouter
