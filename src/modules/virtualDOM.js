const virtualDOM = {
    virtualTree: null,
    container: null,

    setVirtualTree(tree, container) {
        if (!(container instanceof Element))
            return console.error('Container must be a valid DOM element')
        this.container = container
        if (typeof tree === 'string') {
            const template = document.createElement('template')
            template.innerHTML = tree.trim()
            this.virtualTree = template.content.firstElementChild
        } else {
            this.virtualTree = tree
        }
    },

    commit() {
        if (!this.virtualTree || !(this.container instanceof Element)) return
        try {
            if (!this.container.firstElementChild) {
                this.container.appendChild(this.virtualTree.cloneNode(true))
                return
            }
            const patches = this.diff(
                this.container.firstElementChild,
                this.virtualTree
            )
            if (patches.length > 0)
                this.patch(this.container.firstElementChild, patches)
        } catch (error) {
            console.error('Error in virtualDOM commit:', error)
        }
    },

    diff(currentNode, newNode) {
        const patches = []
        if (!currentNode && newNode) return [{ type: 'ADD', node: newNode }]
        if (currentNode && !newNode)
            return [{ type: 'REMOVE', node: currentNode }]
        if (
            !currentNode ||
            !newNode ||
            !(currentNode instanceof Element) ||
            !(newNode instanceof Element)
        )
            return patches
        if (currentNode.tagName !== newNode.tagName)
            return [{ type: 'REPLACE', oldNode: currentNode, newNode }]

        // Comparar atributos
        for (const attr of newNode.attributes) {
            if (currentNode.getAttribute(attr.name) !== attr.value) {
                patches.push({
                    type: 'ATTR',
                    name: attr.name,
                    value: attr.value,
                })
            }
        }
        for (const attr of currentNode.attributes) {
            if (!newNode.hasAttribute(attr.name)) {
                patches.push({ type: 'REMOVE_ATTR', name: attr.name })
            }
        }

        // Comparar texto si no tienen hijos
        if (!currentNode.children.length && !newNode.children.length) {
            if (currentNode.textContent !== newNode.textContent) {
                patches.push({ type: 'TEXT', value: newNode.textContent })
            }
            return patches
        }

        // Comparar hijos
        const currentChildren = Array.from(currentNode.children)
        const newChildren = Array.from(newNode.children)
        const maxLength = Math.max(currentChildren.length, newChildren.length)

        for (let i = 0; i < maxLength; i++) {
            if (!currentChildren[i] && newChildren[i]) {
                patches.push({
                    type: 'ADD_CHILD',
                    index: i,
                    node: newChildren[i],
                })
            } else if (currentChildren[i] && !newChildren[i]) {
                patches.push({ type: 'REMOVE_CHILD', index: i })
            } else {
                const childPatches = this.diff(
                    currentChildren[i],
                    newChildren[i]
                )
                if (childPatches.length > 0) {
                    patches.push({
                        type: 'NODE',
                        index: i,
                        patches: childPatches,
                    })
                }
            }
        }
        return patches
    },

    patch(node, patches) {
        patches.forEach((patch) => {
            if (!node) return
            switch (patch.type) {
                case 'ATTR':
                    node.setAttribute(patch.name, patch.value)
                    break
                case 'REMOVE_ATTR':
                    node.removeAttribute(patch.name)
                    break
                case 'TEXT':
                    node.textContent = patch.value
                    break
                case 'REPLACE':
                    if (node.parentNode)
                        node.parentNode.replaceChild(
                            patch.newNode.cloneNode(true),
                            node
                        )
                    break
                case 'ADD':
                case 'ADD_CHILD':
                    node.appendChild(patch.node.cloneNode(true))
                    break
                case 'REMOVE':
                    if (patch.node?.parentNode)
                        patch.node.parentNode.removeChild(patch.node)
                    break
                case 'REMOVE_CHILD':
                    if (node.children[patch.index])
                        node.removeChild(node.children[patch.index])
                    break
                case 'NODE':
                    if (node.children)
                        this.patch(node.children[patch.index], patch.patches)
                    break
            }
        })
    },
}

export default virtualDOM
