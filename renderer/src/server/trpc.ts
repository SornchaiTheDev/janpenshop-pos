import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const procedure = t.procedure
export const middleware = t.middleware

const isAuthed = middleware(({ ctx, next }) => {
  return next({ ctx: { isAuthed: true } })
})

export const protectedProcedure = procedure.use(isAuthed)
