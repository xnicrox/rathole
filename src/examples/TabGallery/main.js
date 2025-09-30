import { virtualDOM, addEvent, state, componentSize } from '../../rathole'
import './format.css'

export default function TabGallery(appSelector) {
    // Obtener el elemento DOM del contenedor usando el selector
    const app = document.querySelector(appSelector)

    if (!app) {
        console.error(
            `No se encontró el elemento con el selector: ${appSelector}`
        )
        return
    }

    // Imagen por defecto para la galería
    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'

    /**Componentes de la galería */

    // Componente que contiene la fila de imágenes en miniatura
    const Row = `
<div class="row">
  <div class="column">
    <img id="Nature" src="https://www.w3schools.com/howto/img_nature.jpg" alt="Nature" >
  </div>
  <div class="column">
    <img id="Snow" src="https://www.w3schools.com/howto/img_snow.jpg" alt="Snow" >
  </div>
  <div class="column">
    <img id="Mountains" src="https://www.w3schools.com/howto/img_mountains.jpg" alt="Mountains" >
  </div>
</div>
`

    // Componente que muestra la imagen expandida
    const PhotoContainer = ({ img, close }) =>
        `
<div class="photo_container">
  <span id="close"class="closebtn" style="display:${
      close ? 'none' : 'block'
  }">&times;</span>
  <img id="expandedImg" src="${img ? img : defaultImg}" style="display:${
      close ? 'none' : 'block'
  }">
  <div id="imgtext"></div>
</div>
    `

    // Componente principal que contiene toda la galería
    const container = (e) => `
  <div class="gallery_container">
    ${Row}
    ${PhotoContainer(e)}
  </div>`

    /** Suscripción a cambios de estado y eventos */
    state.subscribe((e) => {
        console.log('onChange TabGallery:', e)
        const { img, close } = e
        renderDOM([container({ img, close })], app)
    })

    // Manejador para cambiar la imagen expandida
    function changeImg(e) {
        state.setState({ img: e.srcElement.currentSrc, close: false })
    }

    // Manejador para cerrar la imagen expandida
    function close() {
        state.setState({ close: true })
    }

    // Función para renderizar el DOM virtual
    function renderDOM(compo, el) {
        // Validar que el contenedor es un elemento DOM válido
        if (!(el instanceof Element)) {
            console.error('El contenedor no es un elemento DOM válido:', el)
            return
        }

        // Mostrar el tamaño del componente (para debugging)
        console.log(componentSize(compo))

        // Proceso de renderizado - agregar contenedor wrapper
        const htmlString = `
        <div class="tab-gallery-wrapper">
            ${compo.join('')}
        </div>`

        try {
            // Actualizar el DOM virtual y aplicar cambios
            virtualDOM.setVirtualTree(htmlString, el)
            virtualDOM.commit()

            // Agregar los event listeners
            if (document.getElementById('Nature')) {
                addEvent('Nature', 'click', changeImg)
            }
            if (document.getElementById('Snow')) {
                addEvent('Snow', 'click', changeImg)
            }
            if (document.getElementById('Mountains')) {
                addEvent('Mountains', 'click', changeImg)
            }
            if (document.getElementById('close')) {
                addEvent('close', 'click', close)
            }
        } catch (error) {
            console.error('Error en renderDOM:', error)
        }
    }

    // Establecer estado inicial
    state.setState({ img: defaultImg, close: true })

    // Renderizado inicial de la galería
    renderDOM([container(state.data)], app)
}
