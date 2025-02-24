import { virtualDOM, data, addEvent, stores } from '../../rathole'
import './format.css'

export default function MeetTeam(appSelector) {
    // Obtener el elemento DOM del contenedor usando el selector
    const app = document.querySelector(appSelector)

    if (!app) {
        console.error(
            `No se encontró el elemento con el selector: ${appSelector}`
        )
        return
    }

    /**Stores */
    const socialState = stores.createStore('socialStore')
    stores.subscribe('socialStore', (data) => {
        console.log('onChange socialStore:', data)
        // Actualizar la vista cuando cambie el estado
        if (dataList) {
            renderDOM([PageLayout(dataList), ButtonClose], app, dataList)
        }
    })

    //Url base de llamada de datos
    data.baseUrl = ''
    //Listado de datos
    let dataList

    /**Cards */

    const socialIcons = (id) => {
        const visibility = stores.getStore('socialStore')
        return `
  <div class="footer-social-icons" style="display:${
      visibility[id] ? 'block' : 'none'
  }">
    <ul class="social-icons">
          <li><a href="#" class="social-icon"> <i class="fa fa-facebook"></i></a></li>
          <li><a href="#" class="social-icon"> <i class="fa fa-twitter"></i></a></li>
          <li><a href="#" class="social-icon"> <i class="fa fa-rss"></i></a></li>
          <li><a href="#" class="social-icon"> <i class="fa fa-youtube"></i></a></li>
          <li><a href="#" class="social-icon"> <i class="fa fa-linkedin"></i></a></li>
    </ul>
  </div>
  `
    }

    const column = ({ id, name, photo, title, description, contact }) => {
        const visibility = stores.getStore('socialStore')
        return `
  <div class="column_meet">
    <div class="card_meet">
      <img src="${photo}" alt="${name}" style="width:100%">
      <div class="container_meet">
        <h5>${name}</h5>
        <p class="title_meet">${title}</p>
        ${socialIcons(`viewIcons_${id}`)}
        <p>${description}</p>
        <p>${contact}</p>
        <p><button id=${id} class="button_meet">${
            visibility[`viewIcons_${id}`] ? 'Close' : 'Contact'
        }</button></p>
      </div>
    </div>
  </div>
    `
    }

    // Div contenedor de las cards
    const PageLayout = (data) => `
     <div class="row_meet">
     ${data.map((list) => column(list)).join('')}
     </div>
     `

    // Modificar los componentes para que tengan una estructura consistente
    const LoadData = `
    <div class="meet-team-content">
        <div class="pre_colum_meet">Company cards</div>
        <button id="load-card" class="button_meet">Load employees</button>
    </div>`

    const ButtonClose = `
    <div class="meet-team-content">
        <button id="close-card" class="button_meet">Close cards</button>
    </div>`

    /**Render & events */
    function renderDOM(compo, el) {
        // Proceso de renderizado
        const htmlString = `
        <div class="meet-team-container">
            ${Array.isArray(compo) ? compo.join('') : compo}
        </div>`

        try {
            // Actualizar el DOM virtual y aplicar cambios
            virtualDOM.setVirtualTree(htmlString, el)
            virtualDOM.commit()

            // Agregar los event listeners según el caso
            if (compo[1] !== undefined) {
                // Si tenemos datos, agregar eventos para las cards
                if (document.getElementById('close-card')) {
                    addEvent('close-card', 'click', () => {
                        console.log('Cerrando cards...')
                        reset()
                    })
                }

                const getStore = stores.getStore('socialStore')
                const objNames = {}
                compo[0].forEach((list) => {
                    const id = `viewIcons_${list.id}`
                    objNames[id] = getStore[id] ? getStore[id] : false

                    if (document.getElementById(list.id)) {
                        addEvent(list.id, 'click', getSocial)
                    }
                })
                stores.updateStore('socialStore', objNames)
            } else {
                // Si no hay datos, agregar evento para cargar
                if (document.getElementById('load-card')) {
                    addEvent('load-card', 'click', fetchData)
                }
            }
        } catch (error) {
            console.error('Error en renderDOM:', error)
        }
    }

    /**Mostrar contacto */
    function getSocial(e) {
        e.preventDefault()
        console.log('boton:', e.target.id)
        const id = `viewIcons_${e.target.id}`
        const getStore = stores.getStore('socialStore')
        const name = {}
        name[id] = !getStore[id]
        stores.updateStore('socialStore', name)
    }

    /**Llamada a los datos */
    async function fetchData(e) {
        e.preventDefault()
        console.log('LoadData...')
        try {
            dataList = await data.get('team.json')
            if (dataList) {
                renderDOM([PageLayout(dataList), ButtonClose], app, dataList)
            }
        } catch (error) {
            console.error('Error cargando datos:', error)
        }
    }

    /*Renderizamos elementos base */
    function reset() {
        console.log('Reseteando estado...')
        // Limpiar el estado
        dataList = null
        stores.updateStore('socialStore', {})
        // Volver al estado inicial
        renderDOM([LoadData], app)
    }

    reset()
}
