import { render, addEvent, stores, virtualDOMx } from '../../rathole'
import './format.css'

export default function VideoGallery(app) {
    /**Stores */
    const socialState = stores.createStore('videoStore')
    stores.subscribe('videoStore', (data) => {
        console.log('onChange videoStore:', data)
    })

    const urlBaseImg = 'https://www.w3schools.com/howto/'

    const imagesCompo = (cover) => `<img src="${urlBaseImg + cover}" alt="">`
    const videoCompo = (file) =>
        `<video src="${file}" controls preload="auto" autoplay playinsline>;`

    const videoCard = ({ id, cover, video, description }) => {
        const choose = stores.getStore('videoStore')[id]

        return `
    <div class="responsive" >
    <div class="gallery">
      <button id=${id}>
      ${choose ? videoCompo(video) : imagesCompo(cover)}
      </button>
      <div class="desc">${description}</div>
    </div>
  </div>
    `
    }

    const Gallery = () => {
        return `
    <div id="container_v_card" class="container_video_card">
    ${videoCard({
        id: 'video1',
        cover: 'img_5terre.jpg',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'video1',
    })}
    ${videoCard({
        id: 'video2',
        cover: 'img_forest.jpg',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description: 'video2',
    })}
    ${videoCard({
        id: 'video3',
        cover: 'img_lights.jpg',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        description: 'video3',
    })}
        <div class="clearfix"></div>
    </div>
        `
    }

    function playVideo() {
        const video = {}
        video[this.id] = true
        stores.updateStore('videoStore', video)
        RenderDOM(this.id)
    }

    function RenderDOM(id) {
        //render([Gallery()], app)
        virtualDOMx.render(Gallery(), id)
        virtualDOMx.commit()

        addEvent('video1', 'click', playVideo)
        addEvent('video2', 'click', playVideo)
        addEvent('video3', 'click', playVideo)
    }

    /**Set states */

    stores.updateStore('videoStore', {
        video1: false,
        video2: false,
        video3: false,
    })

    render([Gallery()], app)

    RenderDOM('container_v_card')
}
