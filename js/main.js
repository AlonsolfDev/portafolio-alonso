// Menú hamburguesa
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("nav-menu");
btnMenu.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  btnMenu.setAttribute("aria-expanded", String(abierto));
});
menu.querySelectorAll("a").forEach((enlace) =>
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
    btnMenu.setAttribute("aria-expanded", "false");
  })
);

// Modo claro / oscuro (recuerda la elección)
const btnTema = document.getElementById("btn-tema");
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  const oscuro = tema === "oscuro";
  btnTema.setAttribute("aria-pressed", String(oscuro));
  btnTema.textContent = oscuro ? "Modo claro" : "Modo oscuro";
}
let guardado = null;
try { guardado = localStorage.getItem("tema"); } catch (e) {}
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(guardado || (prefiereOscuro ? "oscuro" : "claro"));
btnTema.addEventListener("click", () => {
  const nuevo = document.documentElement.dataset.tema === "oscuro" ? "claro" : "oscuro";
  aplicarTema(nuevo);
  try { localStorage.setItem("tema", nuevo); } catch (e) {}
});

// Filtro de proyectos
const botones = document.querySelectorAll(".btn-filtro");
const proyectos = document.querySelectorAll(".proyecto");
botones.forEach((boton) =>
  boton.addEventListener("click", () => {
    const filtro = boton.dataset.filtro;
    botones.forEach((b) => {
      const activo = b === boton;
      b.classList.toggle("activo", activo);
      b.setAttribute("aria-pressed", String(activo));
    });
    proyectos.forEach((p) => {
      p.hidden = filtro !== "todos" && p.dataset.categoria !== filtro;
    });
  })
);

// Validación del formulario de contacto
const form = document.getElementById("form-contacto");
const exito = document.getElementById("mensaje-exito");
const reglas = {
  nombre: (v) => (v.trim().length < 2 ? "Escribe tu nombre (mínimo 2 letras)." : ""),
  correo: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com.",
  mensaje: (v) => (v.trim().length < 10 ? "El mensaje debe tener al menos 10 caracteres." : ""),
};
function validarCampo(id) {
  const campo = document.getElementById(id);
  const texto = reglas[id](campo.value);
  document.getElementById("error-" + id).textContent = texto;
  campo.setAttribute("aria-invalid", String(texto !== ""));
  return texto === "";
}
Object.keys(reglas).forEach((id) =>
  document.getElementById(id).addEventListener("blur", () => validarCampo(id))
);
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  exito.hidden = true;
  const resultados = Object.keys(reglas).map(validarCampo);
  if (resultados.every(Boolean)) {
    form.reset();
    exito.hidden = false;
  } else {
    form.querySelector('[aria-invalid="true"]').focus();
  }
});
