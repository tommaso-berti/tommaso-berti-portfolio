import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        react(),
        tailwind(),
        svgr()
    ]
})