/* Objeto para el Virtual DOM */
const virtualDOM = {
    // Representación del árbol de elementos virtuales
    virtualTree: null,
    // Renderiza un componente en el Virtual DOM
    render(component) {
        // Aquí, en lugar de realizar manipulaciones directas del DOM, actualizamos el árbol virtual
        this.virtualTree = component
    },

    // Actualiza el DOM real a partir del árbol virtual usando el algoritmo de diferencias mínimas
    commit() {
        const currentDOM = document.body
        const newDOM = this.virtualTree

        // Llamamos a la función diff para comparar los árboles
        const patches = this.diff(currentDOM, newDOM)

        // Aplicamos los cambios al DOM real
        this.patch(currentDOM, patches)
    },

    /* Función para calcular las diferencias entre dos árboles DOM */
    diff(currentDOM, newDOM) {
        const patches = []

        // Caso base: Si los nodos son diferentes, reemplazar todo el subárbol
        if (!currentNode.isEqualNode(newNode)) {
            patches.push({ type: 'REPLACE', node: newNode })
        } else {
            // Comparar los hijos de los nodos
            const currentChildren = currentNode.childNodes
            const newChildren = newNode.childNodes

            // Asegurarse de que haya hijos para comparar
            if (currentChildren.length > 0 || newChildren.length > 0) {
                for (
                    let i = 0;
                    i < Math.max(currentChildren.length, newChildren.length);
                    i++
                ) {
                    const currentChild = currentChildren[i]
                    const newChild = newChildren[i]

                    if (currentChild && newChild) {
                        // Si ambos nodos existen, compararlos recursivamente
                        const childPatches = diff(currentChild, newChild)
                        patches.push({
                            type: 'NODE',
                            index: i,
                            patches: childPatches,
                        })
                    } else if (currentChild) {
                        // Si solo existe el nodo actual, eliminar el nodo actual
                        patches.push({ type: 'REMOVE', index: i })
                    } else if (newChild) {
                        // Si solo existe el nuevo nodo, agregar el nuevo nodo
                        patches.push({ type: 'ADD', node: newChild })
                    }
                }
            }
        }

        return patches
    },

    patch(currentNode, patches) {
        const patchActions = {
            // Reemplazar el nodo actual con el nuevo nodo
            REPLACE: ({ node, newNode }) =>
                node.parentNode.replaceChild(newNode.cloneNode(true), node),
            // Aplicar "parches" a los hijos del nodo actual
            NODE: ({ node, index, patches }) =>
                patch(node.childNodes[index], patches),
            // Eliminar el nodo actual
            REMOVE: ({ node, index }) =>
                node.removeChild(node.childNodes[index]),
            // Agregar el nuevo nodo al nodo actual
            ADD: ({ node, newNode }) =>
                node.appendChild(newNode.cloneNode(true)),
        }

        patches.forEach(({ type, node: newNode, index, patches }) => {
            patchActions[type]?.({ node, newNode, index, patches })
        })
    },
}

export default virtualDOM
