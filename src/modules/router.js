/* Objeto para administrar las rutas de la aplicación */
const router = {
    routes: new Map(),

    addRoute: (path, component) => router.routes.set(path, component),

    getRoute: (path) => router.routes.get(path),

    navigate: (path, callback) => {
        const routeComponent = router.routes.get(path)
        routeComponent
            ? callback(routeComponent)
            : console.error(`Route '${path}' not found.`)
    },
}

export default router
