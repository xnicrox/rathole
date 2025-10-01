const virtualDOM = {
    virtualTree: null, // Árbol virtual en memoria
    container: null, // Contenedor DOM donde se renderiza

    /**
     * Establece el árbol virtual y el contenedor DOM
     * @param {string|Element} tree - HTML string o elemento DOM
     * @param {Element} container - Elemento contenedor del DOM real
     */
    setVirtualTree(tree, container) {
        if (!(container instanceof Element))
            return console.error('Container must be a valid DOM element')
        this.container = container
        if (typeof tree === 'string') {
            const t = document.createElement('template')
            t.innerHTML = tree.trim()
            this.virtualTree = t.content.firstElementChild
        } else this.virtualTree = tree
    },

    /**
     * Aplica los cambios del árbol virtual al DOM real
     * Compara el DOM actual con el virtual y aplica solo las diferencias
     */
    commit() {
        if (!this.virtualTree || !(this.container instanceof Element)) return
        try {
            // Si el contenedor está vacío, insertar el árbol completo
            if (!this.container.firstElementChild)
                return this.container.appendChild(
                    this.virtualTree.cloneNode(true)
                )
            // Calcular diferencias y aplicar parches
            const patches = this.diff(
                this.container.firstElementChild,
                this.virtualTree
            )
            if (patches.length)
                this.patch(this.container.firstElementChild, patches)
        } catch (e) {
            console.error('Error in virtualDOM commit:', e)
        }
    },

    /**
     * Algoritmo de diff para comparar dos árboles DOM
     * @param {Element} c - Nodo actual (current)
     * @param {Element} n - Nodo nuevo (new)
     * @returns {Array} Lista de parches a aplicar
     */
    diff(c, n) {
        const p = []
        // Casos base: nodos agregados o eliminados
        if (!c && n) return [{ type: 'ADD', node: n }]
        if (c && !n) return [{ type: 'REMOVE', node: c }]
        if (!c || !n || !(c instanceof Element) || !(n instanceof Element))
            return p
        // Si el tipo de nodo cambió, reemplazar completo
        if (c.tagName !== n.tagName)
            return [{ type: 'REPLACE', oldNode: c, newNode: n }]

        // Comparar atributos modificados o nuevos
        for (const a of n.attributes)
            if (c.getAttribute(a.name) !== a.value)
                p.push({ type: 'ATTR', name: a.name, value: a.value })
        // Detectar atributos eliminados
        for (const a of c.attributes)
            if (!n.hasAttribute(a.name))
                p.push({ type: 'REMOVE_ATTR', name: a.name })

        // Si no tienen hijos, comparar solo el texto
        if (!c.children.length && !n.children.length) {
            if (c.textContent !== n.textContent)
                p.push({ type: 'TEXT', value: n.textContent })
            return p
        }

        // Comparar hijos recursivamente
        const cc = Array.from(c.children),
            nc = Array.from(n.children),
            max = Math.max(cc.length, nc.length)
        for (let i = 0; i < max; i++) {
            if (!cc[i] && nc[i])
                p.push({ type: 'ADD_CHILD', index: i, node: nc[i] })
            else if (cc[i] && !nc[i]) p.push({ type: 'REMOVE_CHILD', index: i })
            else {
                const cp = this.diff(cc[i], nc[i])
                if (cp.length) p.push({ type: 'NODE', index: i, patches: cp })
            }
        }
        return p
    },

    /**
     * Aplica los parches al DOM real
     * @param {Element} node - Nodo DOM a modificar
     * @param {Array} patches - Lista de parches a aplicar
     */
    patch(node, patches) {
        patches.forEach((p) => {
            if (!node) return
            switch (p.type) {
                case 'ATTR': // Actualizar atributo
                    return node.setAttribute(p.name, p.value)
                case 'REMOVE_ATTR': // Eliminar atributo
                    return node.removeAttribute(p.name)
                case 'TEXT': // Actualizar texto
                    return (node.textContent = p.value)
                case 'REPLACE': // Reemplazar nodo completo
                    return node.parentNode?.replaceChild(
                        p.newNode.cloneNode(true),
                        node
                    )
                case 'ADD':
                case 'ADD_CHILD': // Agregar hijo
                    return node.appendChild(p.node.cloneNode(true))
                case 'REMOVE': // Eliminar nodo
                    return p.node?.parentNode?.removeChild(p.node)
                case 'REMOVE_CHILD': // Eliminar hijo
                    return (
                        node.children[p.index] &&
                        node.removeChild(node.children[p.index])
                    )
                case 'NODE': // Aplicar parches a hijo recursivamente
                    return (
                        node.children &&
                        this.patch(node.children[p.index], p.patches)
                    )
            }
        })
    },
}

export default virtualDOM
