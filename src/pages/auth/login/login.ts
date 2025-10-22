import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const loginForm = document.getElementById("form") as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const roleSelector = document.getElementById("role") as HTMLSelectElement;

loginForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelector.value as Rol;

  if (!email || !password || !role) {
    alert("NO estan todos los datos");
    return;
  }

  //harian consulta a la api (caso real)
  // verificarian el usuario
  //caso practico
  const user: IUser = {
    email,
    role,
    loggedIn: true,
  };

  if (user.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (user.role === "client") {
    navigate("/src/pages/client/home/home.html");
  }
});
