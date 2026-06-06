// @ts-check

/** @type {import('prettier').Config} */

const config = {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    tabWidth: 4,
    printWidth: 80,
    plugins: ['prettier-plugin-tailwindcss']
}

export default config
