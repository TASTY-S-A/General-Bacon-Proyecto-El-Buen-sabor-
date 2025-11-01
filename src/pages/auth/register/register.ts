import { registrar } from "../../../utils/localStorage";
import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const loginForm = document.getElementById("form") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const apellidoInput = document.getElementById("apellido") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const numeroInput = document.getElementById("numero") as HTMLInputElement;
const passwordInput = document.getElementById("contraseña") as HTMLInputElement;
const password2Input = document.getElementById("contraseña2") as HTMLInputElement;

loginForm.addEventListener("submit", (e: SubmitEvent) => {  
  e.preventDefault();
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const email = emailInput.value;
  const numero = numeroInput.value;
  const password = passwordInput.value;
  const password2 = password2Input.value;


  if (!email || !password || !nombre || !apellido || !numero || !password2) {
    alert("NO estan todos los datos");
    return;
  } else if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const user: IUser = {
    nombre: nombreInput.value,
    apellido: apellidoInput.value,
    mail: emailInput.value.toLowerCase(),
    celular: numeroInput.value,
    contrasenia: passwordInput.value
  };

  registrar(user);

  navigate("/src/pages/auth/login/login.html");
});
