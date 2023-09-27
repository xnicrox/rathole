import { defineConfig } from 'vite'

export default defineConfig({
    publicDir: true,
    build: {
        minify: true,
        rollupOptions: {
            output: {
                entryFileNames: `rathole.js`,
            },
        },
    },
})
