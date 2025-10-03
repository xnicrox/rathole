/**
 * Componente TabGallery - Galería de imágenes con vista expandida
 * Permite mostrar una galería de imágenes en miniatura y expandir una imagen al hacer clic
 */

// Importar módulos necesarios de Rathole
import {
    virtualDOM,
    addEvent,
    state,
    componentSize,
    logger,
} from '../../rathole'
import './format.css'

export default function TabGallery(appSelector) {
    const app = document.querySelector(appSelector)
    if (!app) return logger.error(`Elemento no encontrado: ${appSelector}`)

    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'
    const images = [
        { id: 'Nature', src: 'img_nature.jpg' },
        { id: 'Snow', src: 'img_snow.jpg' },
        { id: 'Mountains', src: 'img_mountains.jpg' },
    ]

    /**
     * Template HTML para la fila de imágenes en miniatura
     * Genera el HTML para mostrar todas las imágenes de la galería
     */
    const Row = `<div class="row">${images
        .map(
            (i) =>
                `<div class="column"><img id="${i.id}" src="https://www.w3schools.com/howto/${i.src}" alt="${i.id}"></div>`
        )
        .join('')}</div>`

    const PhotoContainer = ({ img, close }) =>
        `<div class="photo_container">
            <span id="close" class="closebtn" style="display:${
                close ? 'none' : 'block'
            }">&times;</span>
            <img id="expandedImg" src="${img || defaultImg}" style="display:${
                close ? 'none' : 'block'
            }">
            <div id="imgtext"></div>
        </div>`

    /**
     * Template HTML principal del componente
     * Combina la fila de imágenes y el contenedor de imagen expandida
     */
    const container = (e) =>
        `<div class="gallery_container">${Row}${PhotoContainer(e)}</div>`

    /**
     * Función para renderizar el componente en el DOM
     * Actualiza el DOM virtual y asigna eventos a los elementos
     * @param {Array} compo - Array de componentes HTML a renderizar
     */
    const renderDOM = (compo) => {
        // Validar que el contenedor sea un elemento válido
        if (!(app instanceof Element)) return

        // Log del tamaño del componente para debugging
        logger.debug(`Component size: ${componentSize(compo)}`)

        try {
            // Actualizar el DOM virtual con el nuevo HTML
            virtualDOM.setVirtualTree(
                `<div class="tab-gallery-wrapper">${compo.join('')}</div>`,
                app
            )
            virtualDOM.commit()

            // Asignar eventos a las imágenes de la galería

            images.forEach((i) => {
                addEvent(
                    i.id,
                    'click',
                    (e) => {
                        logger.debug(
                            `Click en imagen ${i.id}:`,
                            e.srcElement.currentSrc
                        )

                        state.setState({
                            img: e.srcElement.currentSrc,
                            close: false,
                        })
                    },
                    true
                )
            })

            // Asignar evento al botón de cerrar
            addEvent('close', 'click', () => {
                logger.debug('Click en botón close')
                // Actualizar estado: ocultar imagen expandida
                state.setState({ close: true })
            })
        } catch (error) {
            logger.error('Error en renderDOM:', error)
        }
    }

    // Suscribirse a cambios de estado para re-renderizar automáticamente
    state.subscribe((e) => {
        logger.info('Estado actualizado:', e)
        // Re-renderizar el componente cada vez que cambia el estado
        renderDOM([container(e)])
    })

    // Inicializar el estado del componente
    state.setState({ img: defaultImg, close: true })
    // Renderizar el componente por primera vez
    renderDOM([container(state.data)])
}
