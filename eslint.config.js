import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        }
    },
])
