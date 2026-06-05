/// <reference types="vitest" />
import mdx from '@mdx-js/rollup'
import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        devtools(),
        netlify(),
        viteTsConfigPaths({
            projects: ['./tsconfig.json']
        }),
        tailwindcss(),
        {
            enforce: 'pre',
            ...mdx({
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [
                        rehypePrettyCode,
                        {
                            theme: { dark: 'github-dark', light: 'github-light' },
                            keepBackground: false
                        }
                    ]
                ]
            })
        },
        tanstackStart(),
        viteReact({ include: /\.(jsx|tsx|mdx)$/ })
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}']
    }
})
