import { transform } from 'unpic/providers/netlify'

export const netlifyTransformer = import.meta.env.DEV ? undefined : transform
