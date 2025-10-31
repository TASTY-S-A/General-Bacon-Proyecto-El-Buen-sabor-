import type { Producto } from "../../../types/Productos";

const API_URL = import.meta.env.VITE_API_URL;

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

//METODOS FETCH