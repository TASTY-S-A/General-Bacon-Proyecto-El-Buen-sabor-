import { logoutUser } from "../../../utils/localStorage";
import {verProductosCategoria} from "../../admin/productos/productoApi"
import { verCategorias } from "../../admin/categorias/categoriaApi";
import type { Rol } from "../../../types/Rol";


const botonLog = document.getElementById("Logout") as HTMLInputElement;
const buttonLogout = document.getElementById("button_logout") as HTMLButtonElement;
const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
const gridProductos = document.getElementById("grid-productos") as HTMLDivElement;
const btn_carrito =document.getElementById("btn-carrito") as HTMLButtonElement;
const adminPanel = document.getElementById("PanelAdmin") as HTMLAnchorElement;

const data = localStorage.getItem("userData");
export const btnlogout = async () => {
const data = localStorage.getItem("userData");

  if (data) {
    const user = JSON.parse(data); 
    botonLog.textContent = user.nombre; 
  } else {
    botonLog.textContent = "Iniciar sesión";
  }
}
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
        cargarProductos(id === null ? undefined : id);
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
      let disponible = "No Disponible";
      let color = "red";

      if(prod.stock > 0) {
        disponible = "Disponible";
        color = "green";
      }

      card.innerHTML = `
        <div class="img_card-cat">
          <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>

        <div class="texto_card-cat">
          <span class="categoria_card-cat">${prod.categoria?.nombre || "Sin categoría"}</span>
          <h3>${prod.nombre}</h3>
          <!--<p>${prod.descripcion || "Sin descripción"}</p>-->
          <p class="precio_card-cat">$${prod.precio}</p>
          <span class="estado_card-cat" style="background-color: ${color}">
            ${disponible}
          </span>
        </div>

        <button class="btn_card-cat" data-id="${prod.id}">Agregar al carrito</button>

      `;

      gridProductos.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
    gridProductos.innerHTML = `<p>Error al cargar productos</p>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const gridProductos = document.getElementById("grid-productos") as HTMLDivElement;

  // Delegamos el click desde el grid hacia los botones creados dinámicamente
  gridProductos.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Verifica que el click sea en un botón "Agregar al carrito"
    if (target.classList.contains("btn_card-cat")) {
      const id = target.dataset.id;
      if (!id) return;

      // Obtener carrito actual
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

      // Ver si el producto ya está en el carrito
      const productoExistente = carrito.find((p: any) => p.id === Number(id));

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({ id: Number(id), cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert("Producto agregado al carrito ✅");
      console.log("Carrito actualizado:", carrito);
    }
  });
});
const userData = data ? JSON.parse(data) : null;
if (userData?.rol === "ADMIN" as Rol) {
    adminPanel.style.display = "inline-block";
} else {
    adminPanel.style.display = "none"; // opcional
}


document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  cargarProductos();
  window.addEventListener("DOMContentLoaded", btnlogout);
});





