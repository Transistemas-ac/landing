import { createRoot } from "react-dom/client";
import Snackbar from "./Snackbar";

let lastSnack;

export default function snackbar(message, type, duration) {
  const container = document.getElementById("snackbar-container");
  if (lastSnack) lastSnack.unmount();

  const snack = document.createElement("div");
  snack.className = "snackbar-container-snack";
  snack.root = createRoot(snack);
  snack.dissapear = setTimeout(() => {
    snack.unmount();
  }, duration);
  snack.unmount = function () {
    lastSnack = null;
    this.firstChild.classList.add("dissapear");
    clearTimeout(this.dissapear);
    setTimeout(() => {
      this.root.unmount();
      container.removeChild(this);
    }, 350);
  };
  lastSnack = snack;

  container.appendChild(snack);
  snack.root.render(
    <Snackbar message={message} type={type} duration={duration} root={snack} />
  );
}
