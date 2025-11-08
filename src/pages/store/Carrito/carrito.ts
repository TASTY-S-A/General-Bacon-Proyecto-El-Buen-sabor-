import { obtenerProductoPorId } from "../../admin/productos/productoApi";
import type { Pedido } from "../../../types/Pedido";
import { crearPedido } from "../../admin/pedidos/pedidosApi";
import type { MetodoPago } from "../../../types/MetodoPago";

const btn_comprar = document.getElementById("finalizar-compra") as HTMLButtonElement;
const listaCarrito = document.getElementById("lista-carrito") as HTMLUListElement;


let total = 0;
async function cargarCarrito() {
  total = 0;
  listaCarrito.innerHTML = "";
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<li>El carrito está vacío</li>";
    return;
  }

  for (const item of carrito) {
    try {
      const prod = await obtenerProductoPorId(item.id);
      if (!prod) continue;
      const li = document.createElement("li");
      li.innerHTML = `
        <span><strong>${prod.nombre}</strong> - $${prod.precio} x ${item.cantidad}</span>
        <button class="btn-eliminar" data-id="${item.id}">X</button>
      `;
      total += prod.precio * item.cantidad;

      listaCarrito.appendChild(li);
    } catch (error) {
      console.error("Error cargando producto del carrito:", error);
    }
  }
  const liTotal = document.createElement("li");
  liTotal.innerHTML = `<strong>Total:</strong> $${total}`;
  listaCarrito.appendChild(liTotal);
}

btn_comprar.addEventListener("click", (e) => {
  e.preventDefault();

  const direccionInput = document.getElementById("direccion") as HTMLInputElement;
  const fechaInput = document.getElementById("fecha") as HTMLInputElement;  
  const metodoPagoInput = document.querySelector('input[name="metodoPago"]:checked') as HTMLInputElement | null;


  const pedido: Pedido = {
    fecha: new Date(fechaInput.value),
    direccion: direccionInput.value,
    total: total,
    metodoPago: metodoPagoInput?.value.toUpperCase() as MetodoPago,
    productos: JSON.parse(localStorage.getItem("carrito") || "[]"),
    usuarios: JSON.parse(localStorage.getItem("userData.id") || "{}"),
  };

  console.log("Pedido a enviar:", pedido);
  crearPedido(pedido);
  alert("Pedido realizado con éxito ✅");

  localStorage.removeItem("carrito");
  cargarCarrito();
  
});


document.addEventListener("DOMContentLoaded", () => {
  listaCarrito.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("btn-eliminar")) {
      const id = target.dataset.id;
      if (!id) return;
      let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const producto = carrito.find((p: any) => p.id === Number(id));

      if (!producto) return;
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        carrito = carrito.filter((p: any) => p.id !== Number(id));
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      cargarCarrito(); 
      console.log("Producto eliminado del carrito:", id);
    }
  });
  cargarCarrito();
});
