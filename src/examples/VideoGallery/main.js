import { render, addEvent, stores} from '../../rathole'
import './format.css'

export default function VideoGallery(app) {

    const urlBase='https://www.w3schools.com/howto/';
    const Gallery=`
    <div class="responsive">
  <div class="gallery">
    <a target="_blank" href="${urlBase}img_5terre.jpg">
      <img src="${urlBase}img_5terre.jpg" alt="Cinque Terre">
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>

<div class="responsive">
  <div class="gallery">
    <a target="_blank" href="${urlBase}img_forest.jpg">
      <img src="${urlBase}img_forest.jpg" alt="Forest">
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>

<div class="responsive">
  <div class="gallery">
    <a target="_blank" href="${urlBase}img_lights.jpg">
      <img src="${urlBase}img_lights.jpg" alt="Northern Lights">
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>

<div class="responsive">
  <div class="gallery">
    <a target="_blank" href="${urlBase}img_mountains.jpg">
      <img src="${urlBase}img_mountains.jpg" alt="Mountains">
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>

<div class="clearfix"></div>
    `

    render([Gallery],app)


}