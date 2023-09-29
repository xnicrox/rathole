export default function HtmlCompress() {
    return {
        name: 'html-compress',
        transform(code, id) {
            console.log(`HtmlCompress  ${id}`)
            return code.replace(/>\s+</g, '><')
        },
    }
}
