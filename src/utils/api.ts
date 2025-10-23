const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/usuarios';

export const crearUsuario = async (usuarioData: {
}) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    throw error;
  }
};