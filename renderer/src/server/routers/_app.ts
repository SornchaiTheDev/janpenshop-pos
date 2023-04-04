import { z } from 'zod'
import { router, procedure } from '../trpc'

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
})

export type AppRouter = typeof appRouter
