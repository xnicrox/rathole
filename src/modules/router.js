/* Objeto para administrar las rutas de la aplicación */
const router = {
  routes: {},
  addRoute(path, component) {
    this.routes[path] = component;
  },
  navigate(path) {
    if (this.routes[path]) {
      Framework.render(this.routes[path], 'app');
    } else {
      console.error(`Route '${path}' not found.`);
    }
  },
};
export default router;
