import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '../prisma'

export async function createContext(opts: CreateNextContextOptions) {
  return {
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
