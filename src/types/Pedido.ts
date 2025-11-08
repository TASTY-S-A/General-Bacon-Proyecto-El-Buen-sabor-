import type { Estado } from "./EstadoPedido";
import type { Producto } from "./Productos";
import type { MetodoPago } from "./MetodoPago";

export interface Pedido {
  id?: number;
  fecha: Date | null;
  direccion: string;
  total: number;
  metodoPago: MetodoPago;
  estado?: Estado;
  productos: Producto[];
  usuarios: any;
}   