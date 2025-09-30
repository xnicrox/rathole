import { virtualDOM, state, router, addEvent } from '../../rathole'
import './format.css'

export default function NavBar(appSelector) {
    // Obtener el elemento DOM del contenedor usando el selector
    const app = document.querySelector(appSelector)

    if (!app) {
        console.error(
            `No se encontró el elemento con el selector: ${appSelector}`
        )
        return
    }

    /**Recuperamo página sino dejamos la que está por defecto */
    const defaultPage =
        window.location.hash.slice(1) !== ''
            ? window.location.hash.slice(1)
            : 'home'

    /**Estado de la app */
    state.subscribe((data) => {
        console.log('onChange navBar:', data)
        const currentRoute = window.location.hash.slice(1) || defaultPage
        const content = router.getRoute(currentRoute) || router.getRoute('home')
        renderDOM(content)
    })

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

    /**Función de renderizado con virtualDOM */
    function renderDOM(content) {
        // Validar que el contenedor es un elemento DOM válido
        if (!(app instanceof Element)) {
            console.error('El contenedor no es un elemento DOM válido:', app)
            return
        }

        // Proceso de renderizado - agregar contenedor wrapper
        const htmlString = `
        <div class="navbar-wrapper">
            ${BarNav()}
            <div class="content">
                ${content}
            </div>
        </div>`

        try {
            // Actualizar el DOM virtual y aplicar cambios
            virtualDOM.setVirtualTree(htmlString, app)
            virtualDOM.commit()

            // Agregar los event listeners
            if (document.getElementById('home')) {
                addEvent('home', 'click', changeBar)
            }
            if (document.getElementById('about')) {
                addEvent('about', 'click', changeBar)
            }
            if (document.getElementById('contact')) {
                addEvent('contact', 'click', changeBar)
            }
        } catch (error) {
            console.error('Error en renderDOM:', error)
        }
    }

    window.addEventListener('hashchange', () => {
        const currentRoute = window.location.hash.slice(1)
        const content = router.getRoute(currentRoute) || router.getRoute('home')
        renderDOM(content)
    })

    // Establecer estado inicial
    state.setState({ link: defaultPage })

    // Renderizado inicial
    const initialContent =
        router.getRoute(defaultPage) || router.getRoute('home')
    renderDOM(initialContent)
}
