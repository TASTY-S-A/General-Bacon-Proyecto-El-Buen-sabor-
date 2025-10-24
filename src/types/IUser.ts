import type { Rol } from "./Rol";

export interface IUser {
  nombre: string;
  apellido: string;
  mail: string;
  celular: string;
  contrasenia: string;
  rol?: Rol;
}


