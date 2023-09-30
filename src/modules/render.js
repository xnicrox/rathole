/* Función para renderizar un array de componentes en el elemento con el id proporcionado */
const render = (components, targetId) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) targetElement.innerHTML = components.join('')
    else console.error(`Element with id '${targetId}' not found.`)
}

export default render
