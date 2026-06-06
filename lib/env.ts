import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod'

export const env = createEnv({
    server: {},
    client: {
        NEXT_PUBLIC_PERSONAL_API_URL: z.string()
    },
    runtimeEnv: {
        NEXT_PUBLIC_PERSONAL_API_URL: process.env.NEXT_PUBLIC_PERSONAL_API_URL
    }
})
