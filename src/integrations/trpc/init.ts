import superjson from 'superjson'
import { TRPCError, initTRPC } from '@trpc/server'

export async function createContext() {
    return {}
}

type Context = ReturnType<typeof createContext>

const t = initTRPC.context<Context>().create({
    transformer: superjson
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(() => {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
})
