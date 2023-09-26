/* Función para agregar un evento a un elemento con el id proporcionado */
const addEvent = (elementId, eventType, callback) => {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    targetElement.addEventListener(eventType, callback);
  } else {
    console.error(`Element with id '${elementId}' not found.`);
  }
};
export default addEvent;
