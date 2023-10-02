import { render, addEvent, stores } from '../../rathole'
import './format.css'

export default function VideoGallery(app) {
    /**Stores */
    const socialState = stores.createStore('videoStore')
    stores.subscribe('videoStore', (data) => {
        console.log('onChange videoStore:', data)
    })

    const urlBase = 'https://www.w3schools.com/howto/'

    const videoCard = ({ id, img, description }) => `
    <div class="responsive" >
    <div class="gallery">
      <button id=${id}>
        <img src="${urlBase + img}" alt="Cinque Terre">
      </button>
      <div class="desc">${description}</div>
    </div>
  </div>
    `

    const Gallery = () => {
        return `
    <div class="container_video_card">
    ${videoCard({
        id: 'video1',
        img: 'img_5terre.jpg',
        description: 'video1',
    })}
    ${videoCard({
        id: 'video2',
        img: 'img_forest.jpg',
        description: 'video2',
    })}
    ${videoCard({
        id: 'video3',
        img: 'img_lights.jpg',
        description: 'video3',
    })}
    ${videoCard({
        id: 'video4',
        img: 'img_mountains.jpg',
        description: 'video4',
    })}
        <div class="clearfix"></div>
    </div>
        `
    }

    function playVideo() {
        const video = {}
        video[this.id] = true
        stores.updateStore('videoStore', video);
    }

    function RenderDOM() {
        render([Gallery()], app)
        addEvent('video1', 'click', playVideo)
        addEvent('video2', 'click', playVideo)
        addEvent('video3', 'click', playVideo)
        addEvent('video4', 'click', playVideo)
    }

    /**Set states */

    stores.updateStore('videoStore', {
        video1: false,
        video2: false,
        video3: false,
        video4: false,
    })

    RenderDOM()
}
