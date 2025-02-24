/* Objeto para el Virtual DOM */
const virtualDOM = {
    virtualTree: null,

    // Método para establecer el árbol virtual
    setVirtualTree(tree) {
        if (typeof tree === 'string') {
            const template = document.createElement('template')
            template.innerHTML = tree.trim()
            this.virtualTree = template.content
        } else {
            this.virtualTree = tree
        }
    },

    // Actualiza el DOM real a partir del árbol virtual usando el algoritmo de diferencias mínimas
    commit() {
        if (!this.virtualTree) {
            console.warn('No virtual tree set')
            return
        }

        const currentDOM = document.body
        const newDOM = this.virtualTree

        // Llamamos a la función diff para comparar los árboles
        const patches = this.diff(currentDOM, newDOM)

        // Aplicamos los cambios al DOM real
        this.patch(currentDOM, patches)
    },

    /* Función para calcular las diferencias entre dos árboles DOM */
    diff(currentNode, newNode) {
        const patches = []

        // Si no hay nuevo nodo, marcar para eliminar
        if (!newNode) {
            patches.push({ type: 'REMOVE', node: currentNode })
            return patches
        }

        // Si no hay nodo actual pero hay nuevo, marcar para agregar
        if (!currentNode) {
            patches.push({ type: 'ADD', node: newNode })
            return patches
        }

        // Si los nodos son diferentes, reemplazar
        if (!currentNode.isEqualNode(newNode)) {
            patches.push({
                type: 'REPLACE',
                oldNode: currentNode,
                newNode: newNode,
            })
            return patches
        }

        // Comparar hijos
        const currentChildren = Array.from(currentNode.childNodes)
        const newChildren = Array.from(newNode.childNodes)

        const maxLength = Math.max(currentChildren.length, newChildren.length)

        for (let i = 0; i < maxLength; i++) {
            const childPatches = this.diff(currentChildren[i], newChildren[i])
            if (childPatches.length > 0) {
                patches.push({ type: 'NODE', index: i, patches: childPatches })
            }
        }

        return patches
    },

    patch(node, patches) {
        patches.forEach((patch) => {
            switch (patch.type) {
                case 'REPLACE':
                    node.parentNode.replaceChild(
                        patch.newNode.cloneNode(true),
                        patch.oldNode
                    )
                    break
                case 'ADD':
                    node.appendChild(patch.node.cloneNode(true))
                    break
                case 'REMOVE':
                    patch.node.parentNode.removeChild(patch.node)
                    break
                case 'NODE':
                    this.patch(node.childNodes[patch.index], patch.patches)
                    break
            }
        })
    },
}

export default virtualDOM
