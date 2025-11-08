import type { Producto } from "./Productos";

export interface Carrito {
  total: number;
  productos: Producto[];
}   