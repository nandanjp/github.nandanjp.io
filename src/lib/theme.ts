import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import * as z from 'zod'

const storageKey = '_preferred-theme'
const setThemeValidator = z.union([
    z.literal('light'),
    z.literal('dark'),
    z.literal('system')
])
export type ThemeType = z.infer<typeof setThemeValidator>

export const getThemeServerFn = createServerFn().handler(
    async () => (getCookie(storageKey) ?? 'system') as ThemeType
)

export const setThemeServerFn = createServerFn({ method: 'POST' })
    .inputValidator(setThemeValidator)
    .handler(async ({ data }) => setCookie(storageKey, data))
