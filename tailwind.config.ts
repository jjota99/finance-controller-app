import type { Config } from 'tailwindcss'

const config: Config = {
    important: true,
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['"Inter var", sans-serif'],
        },
    },
    plugins: [],
}
export default config
