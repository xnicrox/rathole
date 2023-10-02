/* Objeto para el Virtual DOM */
const virtualDOM = {
    // Representación del árbol de elementos virtuales
    virtualTree: null,
    appTree: null,

    // Renderiza un componente en el Virtual DOM
    render(component, app) {
        // Actualizamos el árbol virtual
        this.virtualTree = component
        this.appTree = app
    },

    // Actualiza el DOM real a partir del árbol virtual usando el algoritmo de diferencias mínimas
    commit() {
        const currentDOM = document.querySelector(this.appTree)
        const newDOM = this.virtualTree

        // Llamamos a la función diff para comparar los árboles
        const patches = this.diff(currentDOM, newDOM)

        // Aplicamos los cambios al DOM real
        this.patch(currentDOM, patches)
    },

    /* Función para calcular las diferencias entre dos árboles DOM */
    diff(currentDOM, newDOM) {
        const patches = []

        // Implementa el algoritmo de diferencias mínimas aquí

        return patches
    },

    patch(currentNode, patches) {
        const patchActions = {
            // Reemplazar el nodo actual con el nuevo nodo
            REPLACE: ({ node, newNode }) =>
                node.parentNode.replaceChild(newNode.cloneNode(true), node),
            // Aplicar "parches" a los hijos del nodo actual
            NODE: ({ node, index, patches }) =>
                this.patch(node.childNodes[index], patches),
            // Eliminar el nodo actual
            REMOVE: ({ node, index }) =>
                node.removeChild(node.childNodes[index]),
            // Agregar el nuevo nodo al nodo actual
            ADD: ({ node, newNode }) =>
                node.appendChild(newNode.cloneNode(true)),
        }

        patches.forEach(({ type, node: newNode, index, patches }) => {
            const action = patchActions[type]
            if (action) {
                action({ node: currentNode, newNode, index, patches })
                return
            }
            console.error(`Tipo de parche no reconocido: ${type}`)
        })
    },
}

export default virtualDOM
