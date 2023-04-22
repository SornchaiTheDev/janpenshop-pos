import { z } from 'zod'
import { router, procedure } from '../trpc'
import { authRouter } from './auth'
import { stockRouter } from './stock'
import { tagsRouter } from './tags'
import { historyRouter } from './history'

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
  history: historyRouter,
})

export type AppRouter = typeof appRouter
