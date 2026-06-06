import { transform } from 'unpic/providers/netlify'

export const netlifyTransformer = import.meta.env.DEV ? undefined : transform
export const netlifyCdn = import.meta.env.DEV ? undefined : ('netlify' as const)
