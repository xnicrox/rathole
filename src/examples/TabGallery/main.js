/**
 * Componente TabGallery - Galería de imágenes con vista expandida
 * Permite mostrar una galería de imágenes en miniatura y expandir una imagen al hacer clic
 */

// Importar módulos necesarios de Rathole
import {
    virtualDOM, // Sistema de DOM virtual para renderizado eficiente
    addEvent, // Gestor de eventos del DOM
    state, // Sistema de estado reactivo
    componentSize, // Utilidad para medir el tamaño de componentes
    logger, // Sistema de logging optimizado
} from '../../rathole'
import './format.css' // Estilos CSS para el componente

/**
 * Función principal del componente TabGallery
 * @param {string} appSelector - Selector CSS del elemento contenedor
 */
export default function TabGallery(appSelector) {
    // Obtener el elemento contenedor del DOM
    const app = document.querySelector(appSelector)
    if (!app) return logger.error(`Elemento no encontrado: ${appSelector}`)

    // Configuración de imágenes
    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'
    const images = [
        { id: 'Nature', src: 'img_nature.jpg' },
        { id: 'Snow', src: 'img_snow.jpg' },
        { id: 'Mountains', src: 'img_mountains.jpg' },
    ]

    // El control de eventos ahora se maneja centralmente en addEvent.js

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

    /**
     * Template HTML para el contenedor de imagen expandida
     * @param {Object} params - Parámetros del componente
     * @param {string} params.img - URL de la imagen a mostrar
     * @param {boolean} params.close - Si la imagen está cerrada (oculta)
     * @returns {string} HTML del contenedor de imagen expandida
     */
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
     * @param {Object} e - Estado actual del componente
     * @returns {string} HTML completo del componente
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
            // Aplicar los cambios al DOM real
            virtualDOM.commit()

            // Asignar eventos a las imágenes de la galería
            // addEvent ahora maneja automáticamente la prevención de duplicados
            images.forEach((i) => {
                // Evento click en imagen: expande la imagen seleccionada
                addEvent(i.id, 'click', (e) => {
                    logger.debug(
                        `Click en imagen ${i.id}:`,
                        e.srcElement.currentSrc
                    )
                    // Actualizar estado: mostrar imagen expandida y ocultar botón close
                    state.setState({
                        img: e.srcElement.currentSrc,
                        close: false,
                    })
                })
            })

            // Asignar evento al botón de cerrar
            // addEvent maneja automáticamente la prevención de duplicados
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
