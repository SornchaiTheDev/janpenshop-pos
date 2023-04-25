import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@/server/routers/_app'
import { createContext } from '@/server/context/createContext'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
