/* Objeto para el Virtual DOM */
const virtualDOM = {
    virtualTree: null,
    container: null,

    // Método para establecer el árbol virtual
    setVirtualTree(tree, container) {
        // Asegurarnos de que el container es un elemento DOM válido
        if (!(container instanceof Element)) {
            console.error('Container must be a valid DOM element')
            return
        }

        this.container = container

        if (typeof tree === 'string') {
            const template = document.createElement('template')
            template.innerHTML = tree.trim()
            this.virtualTree = template.content.firstElementChild
        } else {
            this.virtualTree = tree
        }
    },

    // Actualiza el DOM real a partir del árbol virtual usando el algoritmo de diferencias mínimas
    commit() {
        // Validación más estricta
        if (!this.virtualTree) {
            console.warn('No virtual tree set')
            return
        }

        if (!(this.container instanceof Element)) {
            console.error('Container is not a valid DOM element')
            return
        }

        try {
            // Si el contenedor está vacío o el contenido es diferente, reemplazar todo
            if (
                !this.container.firstElementChild ||
                this.container.firstElementChild.outerHTML !==
                    this.virtualTree.outerHTML
            ) {
                this.container.innerHTML = ''
                this.container.appendChild(this.virtualTree.cloneNode(true))
                return
            }

            // Si hay contenido, comparar y actualizar
            const currentDOM = this.container.firstElementChild
            const newDOM = this.virtualTree

            const patches = this.diff(currentDOM, newDOM)
            this.patch(currentDOM, patches)
        } catch (error) {
            console.error('Error in virtualDOM commit:', error)
        }
    },

    /* Función para calcular las diferencias entre dos árboles DOM */
    diff(currentNode, newNode) {
        const patches = []

        // Validación de nodos
        if (!currentNode || !newNode) {
            if (!currentNode && newNode) {
                patches.push({ type: 'ADD', node: newNode })
            } else if (currentNode && !newNode) {
                patches.push({ type: 'REMOVE', node: currentNode })
            }
            return patches
        }

        // Asegurarse de que ambos son elementos DOM
        if (
            !(currentNode instanceof Element) ||
            !(newNode instanceof Element)
        ) {
            return patches
        }

        // Comparar atributos
        const currentAttrs = currentNode.attributes
        const newAttrs = newNode.attributes

        // Verificar atributos modificados o nuevos
        for (const attr of newAttrs) {
            const currentAttrValue = currentNode.getAttribute(attr.name)
            if (currentAttrValue !== attr.value) {
                patches.push({
                    type: 'ATTR',
                    name: attr.name,
                    value: attr.value,
                })
            }
        }

        // Verificar atributos eliminados
        for (const attr of currentAttrs) {
            if (!newNode.hasAttribute(attr.name)) {
                patches.push({
                    type: 'REMOVE_ATTR',
                    name: attr.name,
                })
            }
        }

        // Comparar contenido de texto si no tienen hijos
        if (!currentNode.children.length && !newNode.children.length) {
            if (currentNode.textContent !== newNode.textContent) {
                patches.push({
                    type: 'TEXT',
                    value: newNode.textContent,
                })
            }
            return patches
        }

        // Comparar hijos
        const currentChildren = Array.from(currentNode.children)
        const newChildren = Array.from(newNode.children)
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
                case 'ATTR':
                    if (node) {
                        node.setAttribute(patch.name, patch.value)
                    }
                    break
                case 'REMOVE_ATTR':
                    if (node) {
                        node.removeAttribute(patch.name)
                    }
                    break
                case 'TEXT':
                    if (node) {
                        node.textContent = patch.value
                    }
                    break
                case 'REPLACE':
                    if (node && node.parentNode) {
                        node.parentNode.replaceChild(
                            patch.newNode.cloneNode(true),
                            patch.oldNode
                        )
                    }
                    break
                case 'ADD':
                    if (node) {
                        node.appendChild(patch.node.cloneNode(true))
                    }
                    break
                case 'REMOVE':
                    if (patch.node && patch.node.parentNode) {
                        patch.node.parentNode.removeChild(patch.node)
                    }
                    break
                case 'NODE':
                    if (node && node.children) {
                        this.patch(node.children[patch.index], patch.patches)
                    }
                    break
            }
        })
    },
}

export default virtualDOM
