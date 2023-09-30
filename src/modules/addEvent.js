/* Función para agregar un evento a un elemento con el id proporcionado */
const addEvent = (elementId, eventType, callback) => {
    const element = document.getElementById(elementId)
    if (element) element.addEventListener(eventType, callback)
    else console.error(`El id '${elementId}' not found`)
}
export default addEvent
