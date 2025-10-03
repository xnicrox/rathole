/**
 * Logger básico para Rathole
 * Solo tipos de log y activar/desactivar
 */

class Logger {
    constructor() {
        this.enabled = true
        this.logs = {
            error: true,
            warn: true,
            info: true,
            debug: true,
        }
    }

    /**
     * Activar o desactivar todos los logs
     * @param {boolean} enabled - Estado del logger
     */
    setEnabled(enabled) {
        this.enabled = enabled
    }

    /**
     * Activar o desactivar un tipo específico de log
     * @param {string} type - Tipo de log (error, warn, info, debug)
     * @param {boolean} enabled - Estado del tipo de log
     */
    setLogType(type, enabled) {
        if (this.logs.hasOwnProperty(type)) {
            this.logs[type] = enabled
        }
    }

    /**
     * Verificar si un tipo de log está habilitado
     * @param {string} type - Tipo de log
     * @returns {boolean} Si está habilitado
     */
    isEnabled(type) {
        return this.enabled && this.logs[type]
    }

    /**
     * Log de error
     * @param {any} message - Mensaje o datos
     */
    error(message) {
        if (this.isEnabled('error')) {
            console.error(message)
        }
    }

    /**
     * Log de advertencia
     * @param {any} message - Mensaje o datos
     */
    warn(message) {
        if (this.isEnabled('warn')) {
            console.warn(message)
        }
    }

    /**
     * Log de información
     * @param {any} message - Mensaje o datos
     */
    info(message) {
        if (this.isEnabled('info')) {
            console.info(message)
        }
    }

    /**
     * Log de debug
     * @param {any} message - Mensaje o datos
     */
    debug(message) {
        if (this.isEnabled('debug')) {
            console.debug(message)
        }
    }
}

// Crear instancia singleton
const logger = new Logger()

export default logger
