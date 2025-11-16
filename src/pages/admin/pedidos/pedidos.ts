import type { Pedido } from "../../../types/Pedido";
import { logoutUser } from "../../../utils/localStorage";
import { cambiarEstado, verPedidos, verPedidosId } from "./pedidosApi";
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

export const llenarTablaPedidos = async () => {
  try {
    const pedidos: Pedido[] = await verPedidos();
    const contenedor = document.getElementById("contenedorPedidos") as HTMLDivElement;
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    pedidos.forEach((pedido: Pedido) => {
      const fecha = pedido.fecha
        ? new Date(pedido.fecha).toLocaleString("es-AR")
        : "Sin fecha";

      let color = "";
      if (pedido.estado === "PENDIENTE") {
        color = "yellow";
      } else if (pedido.estado === "CONFIRMADO") {
        color = "green";
      } else if (pedido.estado === "CANCELADO") {
        color = "red";
      } else if (pedido.estado === "TERMINADO") {
        color = "blue";
      }

      const nombresProductos = pedido.productos
        ?.map((p) => p.nombre)
        .join(", ") || "Sin productos";

      const card = document.createElement("div");
      card.classList.add("pedido-card");

      card.innerHTML = `
      <section class="tarjeta" data-id="${pedido.id}">
        <div class="pedido-header">
          <div class= "pedidosdatos">
            <h3 class="pedido-titulo">Pedido #${pedido.id}</h3>
            <p class="pedido-cliente">Dirección: <span>${pedido.direccion}</span></p>
            <p class="pedido-fecha">${fecha}</p>
          </div>
          <span class="pedido-estado" style="background-color: ${color}">${pedido.estado}</span>
        </div>

         <hr class="pedido-separador">

        <div class="pedido-footer">
          <p class="pedido-cantidad">${pedido.productos.length} Producto(s): ${nombresProductos}</p>
          <p class="pedido-total">${(pedido.total ?? 0).toFixed(2)}</p>
        </div>
        
      </section>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al llenar la tabla:", error);
  }
};

const overlay = document.querySelector(".modal-overlay") as HTMLDivElement;

async function abrirModal(pedido: Pedido) {
  try {
    if (!pedido) {
      console.error("Pedido no encontrado");
      return;
    }

    (document.getElementById("pedido-id") as HTMLSpanElement).textContent =
      pedido.id.toString();
    (document.getElementById("pedido-cliente") as HTMLSpanElement).textContent =
      pedido.usuarioId ? `Usuario #${pedido.usuarioId}` : "Sin cliente";
    (document.getElementById("pedido-fecha") as HTMLSpanElement).textContent =
      pedido.fecha ? new Date(pedido.fecha).toLocaleDateString("es-AR") : "Sin fecha";

    // ----- Productos -----
    const lista = document.getElementById("pedido-productos") as HTMLUListElement;
    lista.innerHTML = "";

    pedido.productos.forEach(prod => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${prod.nombre}
        — ${prod.precio}  
        — Stock: ${prod.stock}  
      `;
      lista.appendChild(li);
    });

    
    const total = document.createElement("p");
    total.innerHTML = `<strong>Total:</strong> $${pedido.total}`;
    lista.appendChild(total);

    const estadoSelect = document.getElementById("estado-pedido") as HTMLSelectElement;
    estadoSelect.value = pedido.estado || "PENDIENTE";

    const overlay = document.querySelector(".modal-overlay") as HTMLElement;
    overlay.classList.remove("hidden");

    // ----- Guardar cambios -----
    document.getElementById("guardar-estado")!.onclick = async () => { 
      const nuevoEstado = estadoSelect.value;
      try {
        await cambiarEstado(pedido.id, nuevoEstado);

        overlay.classList.add("hidden");
        await llenarTablaPedidos();

        console.log("Estado actualizado con éxito");
      } catch (error) {
        console.error("Error guardando cambios:", error);
      }
    };

  } catch (error) {
    console.error("Error al abrir modal:", error);
  }
}


document.getElementById("cerrar-modal")!.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

document.getElementById("contenedorPedidos")!.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  const tarjeta = target.closest(".tarjeta") as HTMLElement;

  if (!tarjeta) return;

  const id = tarjeta.dataset.id;
  if (!id) return;

  const pedido = await verPedidosId(id);
  abrirModal(pedido);
});




window.addEventListener("DOMContentLoaded", btnlogout);

buttonLogout.addEventListener("click", () => {logoutUser();});
llenarTablaPedidos();
