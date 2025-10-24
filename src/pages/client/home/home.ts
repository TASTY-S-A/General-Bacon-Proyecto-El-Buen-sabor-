import { logoutUser } from "../../../utils/localStorage";

const buttonLogout = document.getElementById(
  "button_logout"
) as HTMLButtonElement;

buttonLogout.addEventListener("click", () => {
  logoutUser();
});

