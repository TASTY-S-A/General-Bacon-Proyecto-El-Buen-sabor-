//import type { Rol } from "../../../types/Rol";

import { logoutUser } from "../../../utils/localStorage";
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

window.addEventListener("DOMContentLoaded", btnlogout);

buttonLogout.addEventListener("click", () => {logoutUser();});

// const initPage = () => {checkAuthUser("ADMIN" as Rol, "/src/pages/auth/login/login.html");};

