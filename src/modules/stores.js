/* Objeto para la gestión de "stores" */
const stores = {
  data: {},
  subscribers: {},

  // Función para crear un nuevo "store" o acceder a uno existente
  createStore(storeName) {
    if (!this.data[storeName]) {
      this.data[storeName] = {};
      this.subscribers[storeName] = [];
    }
    return this.data[storeName];
  },

  // Función para suscribirse a cambios en un "store"
  subscribe(storeName, callback) {
    if (!this.subscribers[storeName]) {
      this.subscribers[storeName] = [];
    }
    this.subscribers[storeName].push(callback);
  },

  // Función para actualizar un "store"
  updateStore(storeName, newData) {
    if (this.data[storeName]) {
      this.data[storeName] = { ...this.data[storeName], ...newData };
      this.subscribers[storeName].forEach((callback) => callback(this.data[storeName]));
    }
  },

  // Función para obtener el estado actual de un "store"
  getStore(storeName) {
    return this.data[storeName];
  },
};
export default stores;
