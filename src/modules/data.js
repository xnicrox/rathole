/* Objeto para la gestión de datos */
const data = {
  baseUrl: '',

  // Función para realizar solicitudes GET a una URL
  async get(url) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  },

  // Función para realizar solicitudes POST a una URL
  async post(url, data) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

export default data;
