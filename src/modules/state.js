/**
 * Objeto para la administración de estado global,
 * contendrá el estado de la aplicación y
 * un método para suscribirse a cambios en el estado
 **/
const state = {
  data: {},
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  setState(newState) {
    this.data = { ...this.data, ...newState };
    this.subscribers.forEach((callback) => callback(this.data));
  },
};
export default state;
