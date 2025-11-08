const API_URL = import.meta.env.VITE_API_URL;

export const verPedidos = async () => {
  try {
    const response = await fetch(`${API_URL}/pedidos`);
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

export const cambiarEstado = async (pedido: { id: any; estado: any; }) => {
    try{
      const response = await fetch(`${API_URL}/pedidos/actualizar/${pedido.id}`, {
      method: 'PACTH',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido.estado),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return;
    }catch (error){
    console.error('❌ Error al eliminar el producto:', error);
    throw error;
    }
}

export const crearPedido = async (pedido: any) => { 
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error al crear el Producto:', error);
    throw error;
  }
};