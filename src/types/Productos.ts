import type { Categoria } from "./Categoria";

export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  imagen?: String;
  stock: number;
  categoria?: Partial<Categoria>; 
}