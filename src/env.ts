import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
    server: {
        UPLOADTHING_SECRET: z.string(),
        UPLOADTHING_APP_ID: z.string(),
        CDN_ORIGIN: z.string()
    },
    clientPrefix: 'VITE_',
    client: {
        VITE_APP_NAME: z.string().default('Personal Site'),
        VITE_UPLOADTHING_TOKEN: z.string()
    },

    runtimeEnv: import.meta.env,
    emptyStringAsUndefined: true
})
