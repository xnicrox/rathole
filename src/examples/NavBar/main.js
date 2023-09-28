import { render, state, router, addEvent } from '../../rathole'
import './format.css'

export default function NavBar(app) {
    /**Recuperamo página sino dejamos la que está por defecto */
    const defaultPage =
        window.location.hash.slice(1) !== ''
            ? window.location.hash.slice(1)
            : 'home'

    /**Estado de la app */
    state.subscribe((data) => {
        console.log('onChange navBar:', data)
    })

    state.setState({ link: defaultPage })

    /**Componets */

    const BarNav = () => {
        const element = state.data
        return `
 <nav id="bar" class="navbar">
    <ul>
        <li><strong>${element.link}</strong></li>
    </ul>
    <ul>
        <li><a id="home" href="#home" role="button" class="${
            element.link !== 'home' ? 'outline' : ''
        }">Home</a></li>
        <li><a id="about" href="#about" role="button" class="${
            element.link !== 'about' ? 'outline' : ''
        }">About Us</a></li>
        <li><a id="contact"" href="#contact" role="button" class="${
            element.link !== 'contact' ? 'outline' : ''
        }">Contact</a></li>
    </ul>
</nav>
    `
    }

    const HomeComponent = '<h1>Welcome to the Home Page</h1>'
    const AboutComponent = '<h1>About Us</h1>'
    const ContactComponent = '<h1>Contact Us</h1>'

    /**Routing  */
    router.addRoute('home', HomeComponent)
    router.addRoute('about', AboutComponent)
    router.addRoute('contact', ContactComponent)

    /**Cambios en la barra*/
    function changeBar(e) {
        console.log('option:', e.srcElement.id)
        state.setState({ link: e.srcElement.id })
    }

    /**Pasamos calback la funcion de render */
    function renderDOM(el) {
        render([BarNav(), el], app)

        addEvent('home', 'click', changeBar)
        addEvent('about', 'click', changeBar)
        addEvent('contact', 'click', changeBar)
    }

    window.addEventListener('hashchange', () => {
        const currentRoute = window.location.hash.slice(1)
        router.navigate(currentRoute, renderDOM)
    })

    router.navigate(defaultPage, renderDOM)
}
