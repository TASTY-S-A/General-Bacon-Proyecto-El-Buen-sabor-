import type { Estado } from "./EstadoPedido";
import type { Producto } from "./Productos";

export interface Pedido {
  id?: number;
  fecha: Date | null;
  direccion: string;
  total: number;
  estado?: Estado;
  productos: Producto[];
  usuarios: any;
}   