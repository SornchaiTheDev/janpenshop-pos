import { middleware } from '../trpc'

export const isAuthed = middleware(({ ctx, next }) => {
  return next({ ctx: { isAuthed: true } })
})
