import type { Categoria } from "../../../types/Categoria";
const API_URL = import.meta.env.VITE_API_URL;

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

categoriaForm.addEventListener("submit", (e: SubmitEvent) => {  
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
  llenarTablaCategorias();  
  crearCategoria(cat);
});

//METODOS FETCH

const crearCategoria = async (CategoriaData: {
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
    llenarTablaCategorias();  
    return data;
  } catch (error) {
    console.error('❌ Error al crear categoria:', error);
    throw error;
  }
};

const verCategorias = async () => {
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


//FUNCIONES

const llenarTablaCategorias = async () => {
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
        <td><img src="${cat.imagen}" alt="${cat.nombre}" width="20" height="20" style="object-fit: cover; border-radius: 8px;"></td>
        <td><button class="eliminarbtn" data-id="${cat.id}">Eliminar</button></td>
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
  EliminarCategoria(id);
  llenarTablaCategorias();
  }
});

const EliminarCategoria = async (id: string) => { 
  try {
    const response = await fetch(`${API_URL}/categoria/eliminar/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    await llenarTablaCategorias(); 
    return;
  }
  catch (error) {
    console.error('❌ Error al eliminar la categoria:', error);
    throw error;
  }
};


llenarTablaCategorias();