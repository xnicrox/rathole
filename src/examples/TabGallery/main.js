import { render, addEvent, state } from '../../rathole'
import './format.css'

export default function TabGallery(app) {
    /**Components */

    const defaultImg = 'https://www.w3schools.com/howto/img_nature.jpg'

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

    const PhotoContainer = (img = defaultImg) =>
        `
<div class="photo_container">
  <span id="close"class="closebtn">&times;</span>
  <img id="expandedImg" src="${img}">
  <div id="imgtext"></div>
</div>
    `

    const container = (img) => `
  <div class="gallery_container">
    ${Row}
    ${PhotoContainer(img)}
  </div>`

    /** Subcribe componets & events */
    state.subscribe((e) => {
        const { img } = e
        renderDOM([container(img)], app)
    })

    function changeImg(e) {
        console.log(e)
        const { img } = state.data
        state.setState({ img: e.srcElement.currentSrc })
    }

    function close() {
        document.querySelector('.photo_container').style.display = 'none'
    }

    function renderDOM(compo, el) {
        /**Renders */
        render(compo, el)
        /**Events */
        addEvent('Nature', 'click', changeImg)
        addEvent('Snow', 'click', changeImg)
        addEvent('Mountains', 'click', changeImg)
        addEvent('close', 'click', close)
    }

    renderDOM([container()], app)
}
