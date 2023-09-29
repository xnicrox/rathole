import { defineConfig } from 'vite'
import HtmlCompress from './plugins/HtmlCompress'

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
    plugins: [new HtmlCompress()],
})
