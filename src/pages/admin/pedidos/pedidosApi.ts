const API_URL = import.meta.env.VITE_API_URL;

export const EliminarProducto = async (id: string) => { 
  try {
    const response = await fetch(`${API_URL}/productos/eliminar/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return;
  }
  catch (error) {
    console.error('❌ Error al eliminar el producto:', error);
    throw error;
  }
};


export const verProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('❌ Error al obtener el producto:', error);
    throw error;
  }
};