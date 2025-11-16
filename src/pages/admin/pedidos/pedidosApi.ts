import { cambiarStock } from "../productos/productoApi";

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

export const cambiarEstado = async (id: any, estado: any) => {
  try {
    const response = await fetch(`${API_URL}/pedidos/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }), 
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) { 
    console.error('Error al actualizar el pedido:', error);
    throw error;
  }
};


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
      alert("No hay suficiente stock");
      throw new Error(`No hay suficiente stock`);
    }
    const listaProductos = [];
    for (const producto of pedido.productos) {
      await cambiarStock(producto.id, -producto.cantidad);
      listaProductos.push(producto.id);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear el Pedido:', error);
    throw error;
  }
};

export const verPedidosId = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/pedidos/${id}`);
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
