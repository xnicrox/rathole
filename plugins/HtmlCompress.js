export default function HtmlCompress() {
    return {
        name: 'html-compress',
        transform(code, id) {
            // Solo procesar archivos .js dentro de src/, ignorar node_modules y archivos de Vite
            if (!id.includes('src/') || id.includes('node_modules')) {
                return code
            }

            // Comprimir template literals que contienen HTML
            return code.replace(/`([^`]*<[^`]*)`/gs, (match) => {
                return match
                    .replace(/\n\s*/g, '') // Eliminar saltos de línea y espacios al inicio
                    .replace(/>\s+</g, '><') // Eliminar espacios entre etiquetas
                    .replace(/\s{2,}/g, ' ') // Reducir múltiples espacios a uno
                    .trim()
            })
        },
    }
}
