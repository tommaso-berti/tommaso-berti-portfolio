import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const analyzeBundle = process.env.ANALYZE === 'true'

export default defineConfig({
    plugins: [
        react(),
        analyzeBundle &&
            visualizer({
                filename: 'dist/bundle-stats.html',
                gzipSize: true,
                brotliSize: true,
                open: false,
            }),
    ].filter(Boolean),
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return undefined;
                    if (id.includes("react-markdown") || id.includes("remark-gfm")) return "vendor-markdown";
                    if (
                        id.includes("@mui/material") ||
                        id.includes("@mui/icons-material") ||
                        id.includes("@emotion")
                    ) {
                        return "vendor-mui";
                    }
                    if (
                        id.includes("/react/") ||
                        id.includes("/react-dom/") ||
                        id.includes("react-router-dom")
                    ) {
                        return "vendor-react";
                    }
                    return "vendor";
                },
            },
        },
    },
})
