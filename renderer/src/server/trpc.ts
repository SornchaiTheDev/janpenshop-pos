import { initTRPC } from '@trpc/server'
import { Context } from './context/createContext'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const procedure = t.procedure
export const middleware = t.middleware

const isAuthed = middleware(({ ctx, next }) => {
  return next({ ctx: { isAuthed: true } })
})

export const protectedProcedure = procedure.use(isAuthed)
