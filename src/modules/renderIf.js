import render from './render'

const renderIf = (condition, component, targetId) => {
    const targetElement = document.getElementById(targetId)

    !condition
        ? targetElement
            ? (targetElement.innerHTML = '')
            : console.error(`Element with id '${targetId}' not found.`)
        : render([component], targetId)
}

export default renderIf
