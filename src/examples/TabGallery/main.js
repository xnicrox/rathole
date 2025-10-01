import { virtualDOM, addEvent, state, componentSize } from '../../rathole'
import './format.css'

export default function TabGallery(appSelector) {
    const app = document.querySelector(appSelector)
    if (!app) return console.error(`Elemento no encontrado: ${appSelector}`)

    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'
    const images = [
        { id: 'Nature', src: 'img_nature.jpg' },
        { id: 'Snow', src: 'img_snow.jpg' },
        { id: 'Mountains', src: 'img_mountains.jpg' },
    ]

    const Row = `<div class="row">${images
        .map(
            (i) =>
                `<div class="column"><img id="${i.id}" src="https://www.w3schools.com/howto/${i.src}" alt="${i.id}"></div>`
        )
        .join('')}</div>`

    const PhotoContainer = ({ img, close }) =>
        `<div class="photo_container"><span id="close" class="closebtn" style="display:${
            close ? 'none' : 'block'
        }">&times;</span><img id="expandedImg" src="${
            img || defaultImg
        }" style="display:${
            close ? 'none' : 'block'
        }"><div id="imgtext"></div></div>`

    const container = (e) =>
        `<div class="gallery_container">${Row}${PhotoContainer(e)}</div>`

    const renderDOM = (compo) => {
        if (!(app instanceof Element)) return
        console.log(componentSize(compo))
        try {
            virtualDOM.setVirtualTree(
                `<div class="tab-gallery-wrapper">${compo.join('')}</div>`,
                app
            )
            virtualDOM.commit()
            images.forEach((i) =>
                document.getElementById(i.id)
                    ? addEvent(i.id, 'click', (e) =>
                          state.setState({
                              img: e.srcElement.currentSrc,
                              close: false,
                          })
                      )
                    : null
            )
            document.getElementById('close')
                ? addEvent('close', 'click', () =>
                      state.setState({ close: true })
                  )
                : null
        } catch (error) {
            console.error('Error en renderDOM:', error)
        }
    }

    state.subscribe((e) => {
        console.log('onChange TabGallery:', e)
        renderDOM([container(e)])
    })

    state.setState({ img: defaultImg, close: true })
    renderDOM([container(state.data)])
}
