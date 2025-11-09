import type { Pedido } from "../../../types/Pedido";
import { logoutUser } from "../../../utils/localStorage";
const API_URL = import.meta.env.VITE_API_URL;
const botonLog = document.getElementById("Logout") as HTMLInputElement;
const buttonLogout = document.getElementById("button_logout") as HTMLButtonElement;

export const btnlogout = async () => {
const data = localStorage.getItem("userData");

  if (data) {
    const user = JSON.parse(data); 
    botonLog.textContent = user.nombre; 
  } else {
    botonLog.textContent = "Iniciar sesión";
  }
}

export const obtenerPedidoPorId = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/pedidos/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const dataRes = await response.json();
    return dataRes;
  }
  catch (error) {
    console.error('❌ Error al obtener el producto:', error);
    throw error;
  }
}

export const llenarTablaPedidos = async () => {
  try {
    const data = localStorage.getItem("userData");
    const user = JSON.parse(data);
    const pedidos: Pedido[] = await obtenerPedidoPorId(user.id);
    const contenedor = document.getElementById("contenedorPedidos") as HTMLDivElement;
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    pedidos.forEach((pedido: Pedido) => {
      const fecha = pedido.fecha
        ? new Date(pedido.fecha).toLocaleString("es-AR")
        : "Sin fecha";

      const nombresProductos = pedido.productos
        ?.map((p) => p.nombre)
        .join(", ") || "Sin productos";

      const card = document.createElement("div");
      card.classList.add("pedido-card");

      card.innerHTML = `
        <div class="pedido-header">
          <div>
            <h3 class="pedido-titulo">Pedido #${pedido.id}</h3>
            <p class="pedido-cliente">Dirección: <span>${pedido.direccion}</span></p>
            <p class="pedido-fecha">${fecha}</p>
          </div>

          <span class="pedido-estado">${pedido.estado}</span>
        </div>

        <hr class="pedido-separador">

        <div class="pedido-footer">
          <p class="pedido-cantidad">${pedido.productos.length} Producto(s): ${nombresProductos}</p>
          <p class="pedido-total">$${(pedido.total ?? 0).toFixed(2)}</p>
        </div>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("❌ Error al llenar la tabla:", error);
  }
};



window.addEventListener("DOMContentLoaded", async () => {
  await btnlogout(); // pone el nombre del usuario

  const data = localStorage.getItem("userData");
  if (data) {
    await llenarTablaPedidos(); // ahora sí carga los pedidos
  } else {
    console.log("No hay usuario logueado");
  }
});


buttonLogout.addEventListener("click", () => {logoutUser();});
llenarTablaPedidos();
