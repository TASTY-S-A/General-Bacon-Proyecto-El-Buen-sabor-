import type { Producto } from "../../../types/Productos";

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

export const crearProducto = async (ProductoData: Producto) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ProductoData),
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

export const verProductosCategoria = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/productos/obtenerPorCategoria/${id}`);
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

export const obtenerProductoPorId = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
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
}

export const sumarStock = async (id: string, stock: number) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return;
  }
  catch (error) {
    console.error('❌ Error al actualizar el stock:', error);
    throw error;
  }
}