import type { IUser } from "../../../types/IUser";
import { inicioSesion } from "../../../utils/localStorage";

const loginForm = document.getElementById("form") as HTMLFormElement;
const mailInput = document.getElementById("mail") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

loginForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const mail = mailInput.value.toLowerCase();
  const contrasenia = passwordInput.value;

  if (!mail || !contrasenia) {
    alert("NO estan todos los datos");
    return;
  }

 const user: IUser = {
  mail,
  contrasenia,
  nombre: "",
  apellido: "",
  celular: ""
 };

  inicioSesion(user);


});
