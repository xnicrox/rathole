import { virtualDOM, state, router, addEvent, logger } from '../../rathole'
import './format.css'

export default function NavBar(appSelector) {
    // Obtener el elemento DOM del contenedor usando el selector
    const app = document.querySelector(appSelector)

    if (!app) {
        logger.error(
            `No se encontró el elemento con el selector: ${appSelector}`
        )
        return
    }

    /**Recuperar página o usar la que está por defecto */
    const defaultPage = window.location.hash.slice(1) || 'home'

    /**Estado de la app */
    state.subscribe((data) => {
        logger.info('Estado NavBar actualizado:', data)
        const currentRoute = window.location.hash.slice(1) || defaultPage
        const content = router.getRoute(currentRoute) || router.getRoute('home')
        renderDOM(content)
    })

    /**Componentes */

    const BarNav = () => {
        const element = state.data
        const navigationItems = [
            { id: 'home', href: '#home', label: 'Home' },
            { id: 'about', href: '#about', label: 'About Us' },
            { id: 'contact', href: '#contact', label: 'Contact' },
        ]

        return `
 <nav id="bar" class="navbar">
    <ul>
        <li><strong>${element.link}</strong></li>
    </ul>
    <ul>
        ${navigationItems
            .map(
                (item) => `
        <li><a id="${item.id}" href="${item.href}" role="button" class="${
            element.link !== item.id ? 'outline' : ''
        }">${item.label}</a></li>
        `
            )
            .join('')}
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
        logger.debug('Navegación seleccionada:', e.srcElement.id)
        state.setState({ link: e.srcElement.id })
    }

    /**Función de renderizado con virtualDOM */
    function renderDOM(content) {
        // Validar que el contenedor es un elemento DOM válido
        if (!(app instanceof Element)) {
            logger.error('El contenedor no es un elemento DOM válido:', app)
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
            virtualDOM
                .commit()

                [
                    // Agregar los event listeners (el sistema centralizado previene duplicados)
                    ('home', 'about', 'contact')
                ].forEach((item) => {
                    addEvent(item, 'click', changeBar)
                })
        } catch (error) {
            logger.error('Error en renderDOM:', error)
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
