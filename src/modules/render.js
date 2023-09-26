/* Función para renderizar un array de componentes en el elemento con el id proporcionado */
const render = (components, targetId) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const combinedComponents = components.join('');
    targetElement.innerHTML = combinedComponents;
  } else {
    console.error(`Element with id '${targetId}' not found.`);
  }
};
export default render;
