/* Función para renderizar componentes condicionalmente */
const renderIf = (condition, component, targetId) => {
  if (condition) {
    Framework.render(component, targetId);
  } else {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerHTML = '';
    } else {
      console.error(`Element with id '${targetId}' not found.`);
    }
  }
};
export default renderIf;
