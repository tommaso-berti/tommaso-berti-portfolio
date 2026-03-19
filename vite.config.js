import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react()
    ],
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
