import type { Categoria } from "../../../types/Categoria";
import { logoutUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";
import { crearCategoria, EliminarCategoria, verCategorias } from "./categoriaApi";


const Tabla = document.querySelector("#tablaCategorias tbody");
const modal = document.getElementById("fondoModal");
const abrirBtn = document.getElementById("btnAbrirFormulario");
const cerrarBtn = document.getElementById("btnCerrarFormulario");
const categoriaForm = document.getElementById("categoriaForm") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const imagenUrl = document.getElementById("imagenUrl") as HTMLInputElement;
const botonLog = document.getElementById("Logout") as HTMLInputElement;
const buttonLogout = document.getElementById("button_logout") as HTMLButtonElement;


if (modal && abrirBtn && cerrarBtn) {  //ventana
  abrirBtn.onclick = () => (modal.style.display = "flex"); //abrir from

  cerrarBtn.onclick = () => { //cerrar form
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
        <td class="texto_card-cat">${cat.id}</td>
        <td class="texto_card-cat nombrecat">${cat.nombre}</td>
        <td class="texto_card-cat">${cat.descripcion}</td>
        <td class="img_card-cat texto_card-cat"><img src="${cat.imagen}" alt="${cat.nombre}" width="80" height="80" style="object-fit: cover; border-radius: 8px;"></td>
        <td class= "botoness"><button class="editarbtn btn_card-cat texto_card-cat" data-id="${cat.id}">Editar</button>
        <button class="eliminarbtn btn_card-cat texto_card-cat" data-id="${cat.id}">Eliminar</button></td>
        `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("❌ Error al llenar la tabla:", error);
  }
};

export const btnlogout = async () => {
const data = localStorage.getItem("userData");

  if (data) {
    const user = JSON.parse(data); 
    botonLog.textContent = user.nombre; 
  } else {
    botonLog.textContent = "Iniciar sesión";
  }
}



window.addEventListener("DOMContentLoaded", btnlogout);

buttonLogout.addEventListener("click", () => {logoutUser();});

document.addEventListener("DOMContentLoaded", () => {
  const gridProductos = document.querySelector(".categoriass") as HTMLDivElement;
  gridProductos.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const tarjeta = target.closest(".editarbtn") as HTMLElement;
  if (tarjeta) {
    const id = tarjeta.dataset.id;
    if (id) {
      alert("funciona");
    }
  }
  });
});

llenarTablaCategorias();

export { verCategorias };
