// Objeto para el Virtual DOM
const virtualDOMx = {
    // Representación del árbol de elementos virtuales
    virtualTree: null,

    // Renderiza un componente en el Virtual DOM
    render(component, app) {
        // Aquí, en lugar de realizar manipulaciones directas del DOM, actualizamos el árbol virtual
        this.virtualTree = component
        this.app = app
    },

    // Actualiza el DOM real a partir del árbol virtual
    commit() {
        //document.body.innerHTML = this.virtualTree;

        //const currentDOM = document.body;
        const currentDOM = document.getElementById(this.app)

        //----------------
        const parser = new DOMParser()
        const newDOM = parser.parseFromString(this.virtualTree, 'text/html')
            .body.firstChild

        // Llamamos a la función diff para comparar los árboles
        const patches = this.diff(currentDOM, newDOM)

        console.log(`patches:`, patches)

        // Aplicamos los cambios al DOM real
        this.patch(currentDOM, patches)
    },

    // Función para calcular las diferencias entre dos árboles DOM
    diff(currentNode, newNode) {
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
                        const childPatches = this.diff(currentChild, newChild)
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

    // Función para aplicar los "parches" al DOM real
    patch(currentNode, patches) {
        console.log(`currentNode:${currentNode} patches:${patches}`)
        // Función para aplicar los "parches" al DOM real

        patches.forEach((patch) => {
            switch (patch.type) {
                case 'REPLACE':
                    // Reemplazar el nodo actual con el nuevo nodo
                    console.log('REPLACE')
                    const newNode = patch.node.cloneNode(true)
                    currentNode.parentNode.replaceChild(newNode, currentNode)
                    break

                case 'NODE':
                    // Aplicar "parches" a los hijos del nodo actual
                    this.patch(
                        currentNode.childNodes[patch.index],
                        patch.patches
                    )
                    break

                case 'REMOVE':
                    // Eliminar el nodo actual
                    currentNode.removeChild(currentNode.childNodes[patch.index])
                    break

                case 'ADD':
                    // Agregar el nuevo nodo al nodo actual
                    currentNode.appendChild(patch.node.cloneNode(true))
                    break

                default:
                    // Tipo de "parche" no reconocido
                    console.error(`Tipo de parche no reconocido: ${patch.type}`)
            }
        })
    },
}

export default virtualDOMx
