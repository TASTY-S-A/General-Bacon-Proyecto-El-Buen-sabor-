import { logoutUser } from "../../../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;
const API_PRODUCTOS = `${API_URL}/productos`; // corregido, antes apuntaba a /categoria

const buttonLogout = document.getElementById("button_logout") as HTMLButtonElement;
const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
const gridProductos = document.getElementById("grid-productos") as HTMLDivElement;

buttonLogout.addEventListener("click", () => {
  logoutUser();
});

async function cargarCategorias() {
  try {
    const res = await fetch(`${API_URL}/categoria`);
    if (!res.ok) throw new Error("Error al obtener las categorías");

    const categorias = await res.json();
    listaCategorias.innerHTML = `
      <li><a href="#" class="active" data-id="0">Todos los productos</a></li>
    `;

    categorias.forEach((cat: any) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" data-id="${cat.id}">${cat.nombre}</a>`;
      listaCategorias.appendChild(li);
    });

    // Eventos de filtrado
    listaCategorias.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        listaCategorias.querySelectorAll("a").forEach(x => x.classList.remove("active"));
        a.classList.add("active");
        const id = a.getAttribute("data-id");
        cargarProductos(id === "0" ? null : id);
      });
    });
  } catch (error) {
    console.error("Error cargando categorías:", error);
  }
}

async function cargarProductos(categoriaId?: string | null) {
  try {
    const url = categoriaId ? `${API_PRODUCTOS}?categoria=${categoriaId}` : API_PRODUCTOS;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los productos");

    const productos = await res.json();
    gridProductos.innerHTML = "";

    if (productos.length === 0) {
      gridProductos.innerHTML = `<p>No hay productos para mostrar.</p>`;
      return;
    }

    productos.forEach((prod: any) => {
      // === Crear estructura con clases CSS ===
      const card = document.createElement("div");
      card.classList.add("card");

      const divImg = document.createElement("div");
      divImg.classList.add("img_card-cat");
      const img = document.createElement("img");
      img.src = prod.imagen_url || "https://via.placeholder.com/250x180";
      img.alt = prod.nombre;
      divImg.appendChild(img);

      const divTexto = document.createElement("div");
      divTexto.classList.add("texto_card-cat");

      const spanCategoria = document.createElement("span");
      spanCategoria.classList.add("categoria_card-cat");
      spanCategoria.textContent = prod.categoria?.nombre || "Sin categoría";

      const nombre = document.createElement("h3");
      nombre.textContent = prod.nombre;

      const descripcion = document.createElement("p");
      descripcion.textContent = prod.descripcion || "Sin descripción";

      const precio = document.createElement("p");
      precio.classList.add("precio_card-cat");
      precio.textContent = `$${prod.precio}`;

      const disponibilidad = document.createElement("span");
      disponibilidad.classList.add("estado_card-cat");
      disponibilidad.textContent = prod.disponible ? "Disponible" : "No disponible";
      disponibilidad.style.backgroundColor = prod.disponible ? "var(--btn1)" : "gray";

      const boton = document.createElement("button");
      boton.classList.add("btn_card-cat");
      boton.textContent = "Agregar al carrito";

      // === Armar estructura ===
      divTexto.appendChild(spanCategoria);
      divTexto.appendChild(nombre);
      divTexto.appendChild(descripcion);
      divTexto.appendChild(precio);
      divTexto.appendChild(disponibilidad);

      card.appendChild(divImg);
      card.appendChild(divTexto);
      card.appendChild(boton);

      gridProductos.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando productos:", error);
    gridProductos.innerHTML = `<p>Error al cargar productos</p>`;
  }
}

/* ==============================
   INICIALIZAR AL CARGAR PÁGINA
============================== */
document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  cargarProductos(); // Carga todos los productos por defecto
});
