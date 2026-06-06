// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        rules: {
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/require-await': 'off'
        }
    },
    {
        ignores: ['eslint.config.js', 'prettier.config.js']
    }
]
