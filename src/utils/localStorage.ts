import type { IUser } from "../types/IUser";
import { navigate } from "./navigate";
import { crearUsuario, loginUsuario } from "./api";
import { checkAuthUser } from "./auth";

export const registrar = (userData: IUser) => {
  crearUsuario(userData)
    .then((data) => {
      console.log('✅ Usuario guardado en backend:', data);
      localStorage.setItem('userData', JSON.stringify(data));
    })
    .catch((err) => {
      console.error('❌ Error al guardar usuario:', err);
    });
};

export const inicioSesion = (userData: IUser) => {
  loginUsuario(userData.mail, userData.contrasenia)
    .then((data) => {
      localStorage.setItem('userData', JSON.stringify(data));
      checkAuthUser("USUARIO", "/src/pages/client/home/home.html");
    })
    .catch((err) => {
      console.error('❌ Error al iniciar sesión:', err);
    });
};




export const logoutUser = () => {
  localStorage.removeItem("userData");
  navigate("/src/pages/auth/login/login.html");
};
