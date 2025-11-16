const API_URL = import.meta.env.VITE_API_URL;


export const crearCategoria = async (CategoriaData: {
}) => {
  try {
    const response = await fetch(`${API_URL}/categoria`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CategoriaData),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('❌ Error al crear categoria:', error);
    throw error;
  }
};

export const verCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/categoria`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('❌ Error al obtener las categorias:', error);
    throw error;
  }
};

export const EliminarCategoria = async (id: string) => { 
  try {
    const response = await fetch(`${API_URL}/categoria/eliminar/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return;
  }
  catch (error) {
    console.error('❌ Error al eliminar la categoria:', error);
    throw error;
  }
};

export const actualizarCategoria = async (CategoriaData: {
}) => {
  try {
    const response = await fetch(`${API_URL}/categoria`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CategoriaData),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error(' Error al actualizar categoria:', error);
    throw error;
  }
};