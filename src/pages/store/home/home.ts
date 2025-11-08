import { logoutUser } from "../../../utils/localStorage";
import {verProductosCategoria} from "../../admin/productos/productoApi"
import { verCategorias } from "../../admin/categorias/categoriaApi";

const buttonLogout = document.getElementById("button_logout") as HTMLButtonElement;
const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
const gridProductos = document.getElementById("grid-productos") as HTMLDivElement;

buttonLogout.addEventListener("click", () => {
  logoutUser();
});

async function cargarCategorias() {
  try {
    const categorias = await verCategorias();
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
        cargarProductos(id === "0" ? undefined : id);
      });
    });
  } catch (error) {
    console.error("Error cargando categorías:", error);
  }
}
async function cargarProductos(categoriaId?: string) {
  try {
    gridProductos.innerHTML = "";

    const id = categoriaId ?? "0";

    const productos = await verProductosCategoria(id);

    productos.forEach((prod: any) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="img_card-cat">
          <img src="${prod.imagen_url || "https://via.placeholder.com/250x180"}" alt="${prod.nombre}">
        </div>

        <div class="texto_card-cat">
          <span class="categoria_card-cat">${prod.categoria?.nombre || "Sin categoría"}</span>
          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion || "Sin descripción"}</p>
          <p class="precio_card-cat">$${prod.precio}</p>
          <span class="estado_card-cat" style="background-color: ${prod.disponible ? "var(--btn1)" : "gray"}">
            ${prod.disponible ? "Disponible" : "No disponible"}
          </span>
        </div>

        <button class="btn_card-cat">Agregar al carrito</button>
      `;

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
  cargarProductos(); // solo acá
});

