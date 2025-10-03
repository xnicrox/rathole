/**
 * Módulo para gestión centralizada de datos
 * Maneja solicitudes HTTP con logging y gestión de errores
 */

// Importar logger para logging centralizado
import logger from './logger.js'

const data = {
    baseUrl: '',

    /**
     * Realizar solicitud GET a una URL
     * @param {string} url - URL relativa al baseUrl
     * @returns {Promise<any>} - Datos JSON de la respuesta
     */
    async get(url) {
        const fullUrl = `${this.baseUrl}${url}`
        logger.debug(`Solicitud GET a: ${fullUrl}`)

        try {
            const response = await fetch(fullUrl)

            if (!response.ok) {
                const errorMsg = `HTTP error! Status: ${response.status} para ${fullUrl}`
                logger.error(errorMsg)
                throw new Error(errorMsg)
            }

            const result = await response.json()
            logger.info(`Datos obtenidos exitosamente de: ${fullUrl}`, {
                recordCount: Array.isArray(result) ? result.length : 'N/A',
            })
            return result
        } catch (error) {
            logger.error(`Error en solicitud GET a ${fullUrl}:`, error)
            throw error // Re-lanzar el error para que el componente pueda manejarlo
        }
    },

    /**
     * Realizar solicitud POST a una URL
     * @param {string} url - URL relativa al baseUrl
     * @param {any} data - Datos a enviar en el body
     * @returns {Promise<any>} - Datos JSON de la respuesta
     */
    async post(url, data) {
        const fullUrl = `${this.baseUrl}${url}`
        logger.debug(`Solicitud POST a: ${fullUrl}`, data)

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorMsg = `HTTP error! Status: ${response.status} para ${fullUrl}`
                logger.error(errorMsg)
                throw new Error(errorMsg)
            }

            const result = await response.json()
            logger.info(`Datos enviados exitosamente a: ${fullUrl}`)
            return result
        } catch (error) {
            logger.error(`Error en solicitud POST a ${fullUrl}:`, error)
            throw error // Re-lanzar el error para que el componente pueda manejarlo
        }
    },

    /**
     * Configurar la URL base para las solicitudes
     * @param {string} url - URL base
     */
    setBaseUrl(url) {
        this.baseUrl = url
        logger.info(`Base URL configurada: ${url}`)
    },
}

export default data
