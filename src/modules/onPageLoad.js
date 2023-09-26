/* Función para ejecutar cuando la página se haya cargado completamente */
const onPageLoad = (callback) => {
  if (document.readyState === 'complete') {
    // Si la página ya está completamente cargada, ejecuta el callback inmediatamente
    callback();
  } else {
    // Si la página aún no está completamente cargada, agrega un escuchador de eventos
    document.addEventListener('DOMContentLoaded', callback);
  }
};

export default onPageLoad;
