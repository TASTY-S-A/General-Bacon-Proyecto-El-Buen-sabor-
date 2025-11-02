import type { Categoria } from "../../../types/Categoria";
import { crearCategoria, EliminarCategoria, verCategorias } from "./categoriaApi";


const Tabla = document.querySelector("#tablaCategorias tbody");
const modal = document.getElementById("fondoModal");
const abrirBtn = document.getElementById("btnAbrirFormulario");
const cerrarBtn = document.getElementById("btnCerrarFormulario");
const categoriaForm = document.getElementById("categoriaForm") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const imagenUrl = document.getElementById("imagenUrl") as HTMLInputElement;


if (modal && abrirBtn && cerrarBtn) {  //ventana
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

categoriaForm.addEventListener("submit", async (e: SubmitEvent) => {  
  e.preventDefault();

  if (!nombreInput) {
    alert("Falta el nombre de la categoria");
    return;
  }
  
  const cat: Categoria = {
    nombre: nombreInput.value,
    descripcion: descripcionInput.value,
    imagen: imagenUrl.value
  };
  console.log(cat);
  try {
    await crearCategoria(cat);
    await llenarTablaCategorias();  
  } catch (error) {
    console.error(error);
  }
});

Tabla?.addEventListener("click", async (e) => { // Boton en la Tabla
  const target = e.target as HTMLElement;

  if (target.classList.contains("eliminarbtn")) {
  const id = target.dataset.id;
  if (!id) {
    console.warn("⚠️ El botón no tiene data-id.");
    return;
  } 
  await EliminarCategoria(id);
  await llenarTablaCategorias();
  }
});

export const llenarTablaCategorias = async () => {
  try {
    const categorias: Categoria[] = await verCategorias();
    const tbody = document.querySelector("#tablaCategorias tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    categorias.forEach((cat: Categoria) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${cat.id}</td>
        <td>${cat.nombre}</td>
        <td>${cat.descripcion}</td>
        <td><img src="${cat.imagen}" alt="${cat.nombre}" width="80" height="80" style="object-fit: cover; border-radius: 8px;"></td>
        <td><button class="eliminarbtn" data-id="${cat.id}">Eliminar</button></td>
        `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("❌ Error al llenar la tabla:", error);
  }
};



llenarTablaCategorias();

export { verCategorias };
