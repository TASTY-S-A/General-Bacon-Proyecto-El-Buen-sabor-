import { navigate } from "../../../utils/navigate";
import { obtenerProductoPorId } from "../../admin/productos/productoApi";
const img = document.querySelector(".img_card-cat img") as HTMLImageElement;
const categoria = document.querySelector(".categoria_card-cat") as HTMLElement;
const nombre = document.querySelector(".texto_card-cat h3") as HTMLElement;
const precioTexto = document.querySelector(".precio_card-cat") as HTMLElement;
const estado = document.querySelector(".estado_card-cat") as HTMLElement;
const btn = document.querySelector(".btn_card-cat") as HTMLButtonElement;

const btnMas = document.querySelector(".btn_card_mas") as HTMLButtonElement;
const btnMenos = document.querySelector(".btn_card_menos") as HTMLButtonElement;
const inputCant = document.querySelector(".cantidad-input") as HTMLInputElement;
const btnVolver = document.querySelector(".btn_volver") as HTMLButtonElement;
const btnAgregar = document.querySelector(".btn_card-cat") as HTMLButtonElement;

let cantidad = 1;
let precioUnitario = 0;


function setPrecioUnitario(precio: number) {
  precioUnitario = precio;
  precioTexto.textContent = "$" + precioUnitario;
}

function actualizarPrecio() {
  const total = precioUnitario * cantidad;
  precioTexto.textContent = "$" + total;
}

btnVolver.addEventListener("click", () => {
  navigate("/src/pages/store/home/home.html");
});

btnAgregar.addEventListener("click", () => {
  const idProd = Number(btnAgregar.dataset.id);
  if (!idProd) return;

  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

  const existe = carrito.find((p: any) => p.id === idProd);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({
      id: idProd,
      cantidad: cantidad
    });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito ✅");
});

btnMas.addEventListener("click", () => {
  if(cantidad <= 9){
  cantidad++;
  inputCant.value = String(cantidad);
  actualizarPrecio();
  }
});

btnMenos.addEventListener("click", () => {
  if (cantidad > 1) {
    cantidad--;
    inputCant.value = String(cantidad);
    actualizarPrecio();
  }
});

function renderProducto(prod: any) {
  img.src = prod.imagen;
  categoria.textContent = prod.categoria.nombre;
  nombre.textContent = prod.nombre;

  setPrecioUnitario(prod.precio);

  estado.textContent = prod.stock === 0 ? "No disponible" : "Disponible";
  btn.dataset.id = String(prod.id);
}

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return console.error("No se encontró id en la URL");

  try {
    const prod = await obtenerProductoPorId(id);
    renderProducto(prod);
  } catch (error) {
    console.error("Error cargando producto:", error);
  }
});
