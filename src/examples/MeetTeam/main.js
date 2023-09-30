import { render, data, addEvent, stores } from '../../rathole'
import './format.css'

export default function MeetTeam(app) {
    /**Stores */
    const socialState = stores.createStore('socialStore')
    stores.subscribe('socialStore', (data) => {
        console.log('onChange socialStore:', data)
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

    const LoadData = `<div class="pre_colum_meet">Company cards</div>`
    const ButtonCard = `<button id="load-card">Load employees</button>`
    const ButtonClose = `<button id="close-card">Close cards</button>`

    /**Mostrar contacto */
    function getSocial(e) {
        console.log('boton:', e.srcElement.id)
        const id = `viewIcons_${e.srcElement.id}`
        const getStore = stores.getStore('socialStore')
        const name = {}
        name[id] = getStore[id] ? false : true
        stores.updateStore('socialStore', name)
        renderDOM([PageLayout(dataList), ButtonClose], app, dataList, id)
    }

    /**Render & events */
    function renderDOM(...compo) {
        //Renders
        render(...compo)

        //Si llega el "dataList", generamos eventos y guardamos en los stores,para controlar las cards
        if (compo[2] !== undefined) {
            addEvent('close-card', 'click', () => reset())
            const getStore = stores.getStore('socialStore')
            const objNames = {}
            compo[2].map((list) => {
                const id = `viewIcons_${list.id}`
                objNames[id] = getStore[id] ? getStore[id] : false
                addEvent(list.id, 'click', getSocial)
            })
            stores.updateStore('socialStore', objNames)
            return
        }
        addEvent('load-card', 'click', fetchData)
    }

    /**Llamada a los datos */
    async function fetchData() {
        console.log('LoadData...')
        dataList = await data.get('team.json')

        renderDOM([PageLayout(dataList), ButtonClose], app, dataList)
    }

    /*Renderizamos elementos base */
    function reset() {
        renderDOM([LoadData, ButtonCard], app)
    }

    reset()
}
