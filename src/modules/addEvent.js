/**
 * Módulo para gestión centralizada de eventos del DOM
 * Controla el estado de elementos con eventos asignados para evitar duplicados
 */

// Set global para rastrear elementos que ya tienen eventos asignados
const elementsWithEvents = new Set()

/**
 * Agregar un evento a un elemento por ID
 * Evita asignar eventos duplicados al mismo elemento
 * @param {string} elementId - ID del elemento del DOM
 * @param {string} eventType - Tipo de evento (click, change, etc.)
 * @param {Function} callback - Función callback del evento
 * @returns {boolean} - true si se asignó el evento, false si ya existía
 */
const addEvent = (elementId, eventType, callback, consoleLog = false) => {
    // Crear clave única para el elemento y tipo de evento
    const eventKey = `${elementId}-${eventType}`

    // Verificar si el evento ya fue asignado
    if (elementsWithEvents.has(eventKey)) {
        if (consoleLog) {
            console.warn(
                `Evento '${eventType}' ya asignado al elemento '${elementId}'`
            )
        }
        return false
    }

    // Buscar el elemento en el DOM
    const element = document.getElementById(elementId)
    if (!element) {
        if (consoleLog) {
            console.error(`Elemento con id '${elementId}' no encontrado`)
        }
        return false
    }

    // Asignar el evento al elemento
    element.addEventListener(eventType, callback)

    // Marcar como procesado para evitar duplicados
    elementsWithEvents.add(eventKey)

    if (consoleLog) {
        console.debug(
            `Evento '${eventType}' asignado a elemento '${elementId}'`
        )
    }
    return true
}

/**
 * Verificar si un elemento ya tiene un tipo de evento asignado
 * @param {string} elementId - ID del elemento
 * @param {string} eventType - Tipo de evento
 * @returns {boolean} - true si ya tiene el evento asignado
 */
const hasEvent = (elementId, eventType) => {
    const eventKey = `${elementId}-${eventType}`
    return elementsWithEvents.has(eventKey)
}

/**
 * Remover un evento del tracking (útil para limpiar estado)
 * @param {string} elementId - ID del elemento
 * @param {string} eventType - Tipo de evento
 */
const removeEventFromTracking = (elementId, eventType) => {
    const eventKey = `${elementId}-${eventType}`
    elementsWithEvents.delete(eventKey)
}

/**
 * Limpiar todos los eventos del tracking
 */
const clearAllEvents = () => {
    elementsWithEvents.clear()
}

/**
 * Obtener estadísticas de eventos asignados
 * @returns {Object} - Información sobre eventos asignados
 */
const getEventStats = () => {
    return {
        totalEvents: elementsWithEvents.size,
        events: Array.from(elementsWithEvents),
    }
}

// Exportar funciones
export default addEvent
export { hasEvent, removeEventFromTracking, clearAllEvents, getEventStats }
