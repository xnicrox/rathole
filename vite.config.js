import { defineConfig } from 'vite'
import HtmlCompress from './plugins/HtmlCompress'

export default defineConfig({
    publicDir: true,
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false, // Mantener console.log
                drop_debugger: true,
                passes: 2, // Dos pasadas de optimización
            },
            format: {
                comments: false, // Eliminar comentarios
            },
        },
        rollupOptions: {
            output: {
                entryFileNames: `rathole.js`,
                compact: true,
            },
        },
    },
    plugins: [new HtmlCompress()],
})
