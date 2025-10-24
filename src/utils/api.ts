const API_URL = import.meta.env.VITE_API_URL;

export const crearUsuario = async (usuarioData: {
}) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
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


export const loginUsuario = async (mail: string, contrasenia: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, contrasenia }),
    });
    if (!response.ok) {
      alert("❌ Usuario o contraseña incorrectos");
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    alert("Error de conexión con el servidor");
    return null;
  }
};
