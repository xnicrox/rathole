import './css/pico.min.css'
import './css/style.css'
// import * as rh from './src/rathole';
// console.log ({rh});
// import {render, state, addEvent} from './src/rathole';
// console.log ({render, state, addEvent});
import TabGallery from './src/examples/TabGallery/main'
import MeetTeam from './src/examples/MeetTeam/main'
import NavBar from './src/examples/NavBar/main'
import VideoGallery from './src/examples/VideoGallery/main'

const example1 = new TabGallery('tab-gallery')

const example2 = new MeetTeam('meet-team')

const example3 = new NavBar('nav-bar')

const example4 = new VideoGallery('video-gallery')
