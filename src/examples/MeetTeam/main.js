import { render, data, addEvent } from '../../rathole'
import './format.css'

export default function MeetTeam(app) {
    /**Url base de llamada de datos */
    data.baseUrl = ''

    /**Cards */
    const column = ({ name, photo, title, description, contact }) =>
        `
  <div class="column_meet">
    <div class="card_meet">
      <img src="${photo}" alt="${name}" style="width:100%">
      <div class="container_meet">
        <h5>${name}</h5>
        <p class="title_meet">${title}</p>
        <p>${description}</p>
        <p>${contact}</p>
        <p><button class="button_meet">Contact</button></p>
      </div>
    </div>
  </div>
    `

    const LoadData = `
  <div class="pre_colum_meet">...</div>
  `
    const ButtonCard = `
    <button id="load-card">Load cards</button>
    
    `

    function renderDOM(...compo) {
        /**Renders */
        render(...compo)
        addEvent('load-card', 'click', fetchData)
    }

    /**Llamada a los datos */
    async function fetchData() {
        console.log('LoadData...')
        const dataList = await data.get('team.json')

        const PageLayout = () => `
        <div class="row_meet">
        ${dataList.map((list) => column(list)).join('')}
        </div>
        `

        renderDOM([PageLayout(), ButtonCard], app)
    }

    /*Renderizamos elementos base */
    renderDOM([LoadData, ButtonCard], app)
}
