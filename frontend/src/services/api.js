// ARCHIVO: frontend/src/services/api.js

const API_BASE_URL = 'http://localhost:8000/api'; // La URL base de tu API de Django

/**
 * Función genérica para realizar peticiones a la API.
 * @param {string} endpoint El endpoint al que se llamará (ej. '/members/')
 * @param {object} options Opciones para la petición fetch (método, body, headers, etc.)
 * @returns {Promise<any>} La respuesta de la API en formato JSON.
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Aquí iría el token de autenticación en el futuro
      // 'Authorization': `Bearer ${getToken()}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // Si la respuesta no es 2xx, lanzamos un error para que sea capturado por el .catch()
      const errorData = await response.json().catch(() => ({ message: 'Error en la respuesta del servidor' }));
      throw new Error(errorData.detail || errorData.message || 'Ocurrió un error en la petición');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    throw error; // Re-lanzamos el error para que el componente que llama pueda manejarlo
  }
};

// Definimos las funciones específicas para cada recurso de la API
export const api = {
  members: {
    getAll: () => request('/members/'),
    getById: (id) => request(`/members/${id}/`),
    create: (data) => request('/members/', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/members/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/members/${id}/`, { method: 'DELETE' }),
  },
  // Aquí podrías añadir otros recursos como:
  // payments: { ... },
  // classes: { ... },
};
