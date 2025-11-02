import type { Producto } from "../../../types/Productos";
import { verCategorias } from "../categorias/categoriaApi";
import { crearProducto, EliminarProducto, verProductos } from "./productoApi";


const Tabla = document.querySelector("#tablaProductos tbody");
const modal = document.getElementById("fondoModal");
const abrirBtn = document.getElementById("btnAbrirFormulario");
const cerrarBtn = document.getElementById("btnCerrarFormulario");
const productoForm = document.getElementById("formularioProducto") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const precioInput = document.getElementById("precio") as HTMLInputElement;
const imagenUrl = document.getElementById("imagenUrl") as HTMLInputElement;
const stockInput = document.getElementById("stock") as HTMLInputElement;
const contenedorCategorias = document.getElementById("categoriasCheckboxes");

if (modal && abrirBtn && cerrarBtn) {
  abrirBtn.onclick = async () => { //Abrir ventana
  modal.style.display = "flex";
  await renderizarCategorias();
};

  cerrarBtn.onclick = () => { //Cerrar ventana
    modal.style.display = "none";
    llenarTablaProductos(); // recarga la tabla al cerrar el modal
  };

  window.onclick = (e) => { //Cerrar ventana al hacer clic fuera
    if (e.target === modal) {
      modal.style.display = "none";
      llenarTablaProductos(); // También recarga la tabla si hacen clic afuera
    }
  };
}

productoForm.addEventListener("submit", async (e: SubmitEvent) => {  
  e.preventDefault();
  const categoriaSeleccionada = document.querySelector('input[name="categoria"]:checked') as HTMLInputElement;
  console.log(document.querySelectorAll('input[name="categoria"]'));
  if (!nombreInput || !precioInput || !stockInput || !categoriaSeleccionada) {
    alert("Faltan datos obligatorios");
    return;
  }
  
  const producto: Producto = {
    nombre: nombreInput.value,
    precio: precioInput.valueAsNumber,
    imagen: imagenUrl.value,
    stock: stockInput.valueAsNumber, 
    categoria: {
      id: parseInt(categoriaSeleccionada.value)
    }
  };
  console.log(producto.categoria?.nombre);
  await crearProducto(producto);  
  llenarTablaProductos();
});


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
        <td>${p.stock}</td>
        <td>${p.categoria?.nombre}</td>
        <td><img src="${p.imagen}" alt="${p.nombre}" width="80" height="80" style="object-fit: cover; border-radius: 8px;"></td>
        <td><button class="eliminarbtn" data-id="${p.id}">Eliminar</button></td>
        `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("❌ Error al llenar la tabla:", error);
  }
};


Tabla?.addEventListener("click", async (e) => { // Boton de eliminar en la Tabla
  const target = e.target as HTMLElement;

  if (target.classList.contains("eliminarbtn")) {
  const id = target.dataset.id;
  if (!id) {
    console.warn("⚠️ El botón no tiene data-id.");
    return;
  } 
  await EliminarProducto(id);
  await llenarTablaProductos();
  }
});

//categorias en formulario de productos
const renderizarCategorias = async () => {
  const categorias = await verCategorias();
  if (!contenedorCategorias) return;

  contenedorCategorias.innerHTML = "";

  categorias.forEach((cat: any) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="categoria" value="${cat.id}">
      ${cat.nombre}
    `;
    contenedorCategorias.appendChild(label);
  });
};


llenarTablaProductos();