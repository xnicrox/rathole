import { render, addEvent, state, componentSize } from '../../rathole'
import './format.css'

export default function TabGallery(app) {
    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'

    /**Components */

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

    const container = (e) => `
  <div class="gallery_container">
    ${Row}
    ${PhotoContainer(e)}
  </div>`

    /** Subcribe componets & events */
    state.subscribe((e) => {
        console.log('onChange TabGallery:', e)
        const { img, close } = e
        renderDOM([container({ img, close })], app)
    })

    state.setState({ img: defaultImg, close: true })

    function changeImg(e) {
        state.setState({ img: e.srcElement.currentSrc, close: false })
    }

    function close() {
        state.setState({ close: true })
    }

    function renderDOM(compo, el) {
        /**size */
        console.log(componentSize(compo))
        /**Renders */
        render(compo, el)
        /**Events */
        addEvent('Nature', 'click', changeImg)
        addEvent('Snow', 'click', changeImg)
        addEvent('Mountains', 'click', changeImg)
        addEvent('close', 'click', close)
    }

    renderDOM([container(state.data)], app)
}
