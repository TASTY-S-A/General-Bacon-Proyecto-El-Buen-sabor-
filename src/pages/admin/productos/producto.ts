import type { Producto } from "../../../types/Productos";

const API_URL = import.meta.env.VITE_API_URL;

const Tabla = document.querySelector("#tablaProductos tbody");
const modal = document.getElementById("fondoModal");
const abrirBtn = document.getElementById("btnAbrirFormulario");
const cerrarBtn = document.getElementById("btnCerrarFormulario");
const productoForm = document.getElementById("formularioProducto") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const precioInput = document.getElementById("precio") as HTMLInputElement;
const imagenUrl = document.getElementById("imagenUrl") as HTMLInputElement;

if (modal && abrirBtn && cerrarBtn) {
  abrirBtn.onclick = () => (modal.style.display = "flex");

  cerrarBtn.onclick = () => {
    modal.style.display = "none";
    location.reload(); // recarga la página al cerrar el modal
  };

  // Cerrar modal al hacer clic fuera
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      location.reload(); // También recarga si hacen clic afuera
    }
  };
}


productoForm.addEventListener("submit", (e: SubmitEvent) => {  
  e.preventDefault();

  if (!nombreInput || !precioInput) {
    alert("Faltan datos obligatorios");
    return;
  }
  
  const producto: Producto = {
    nombre: nombreInput.value,
    precio: precioInput.value,
    imagen: imagenUrl.value
  };
  alert(producto.nombre + " " + producto.precio);
  crearProducto(producto);  
});


export const crearProducto = async (ProductoData: {
}) => {
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

const verProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
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


//METODOS FETCH

const llenarTablaProductos = async () => {
  try {
    const productos: Producto[] = await verProductos();
    const tbody = document.querySelector("#tablaProductos tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    productos.forEach((p: Producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td><img src="${p.imagen}" alt="${p.nombre}" width="20" height="20" style="object-fit: cover; border-radius: 8px;"></td>
        <td><button class="eliminarbtn" data-id="${p.id}">Eliminar</button></td>
        `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("❌ Error al llenar la tabla:", error);
  }
};

Tabla?.addEventListener("click", (e) => { // Boton en la Tabla
  const target = e.target as HTMLElement;

  if (target.classList.contains("eliminarbtn")) {
  const id = target.dataset.id;
  if (!id) {
    console.warn("⚠️ El botón no tiene data-id.");
    return;
  } 
  EliminarProducto(id);
  llenarTablaProductos();
  }
});

const EliminarProducto = async (id: string) => { 
  try {
    const response = await fetch(`${API_URL}/productos/eliminar/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    await llenarTablaProductos(); 
    return;
  }
  catch (error) {
    console.error('❌ Error al eliminar la categoria:', error);
    throw error;
  }
};


llenarTablaProductos();