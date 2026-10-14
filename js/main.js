/* ==========================================================
   NOMBRES QUE USA ESTE JS (Sebastián: usar estos en el HTML/CSS)
   - Botón de tema:  id="btn-tema"
   - Tema oscuro:    clase "modo-oscuro" en <body>  (estilos: body.modo-oscuro)
      - Botones de filtro:  class="btn-filtro" y data-filtro="todos|web|diseno|datos"
   - Tarjetas proyecto:  class="proyecto" y data-categoria="web|diseno|datos"
      - Formulario: <form id="form-contacto" novalidate> con inputs id="nombre", "correo", "mensaje"
     (cada uno con <label for>), un <span id="error-nombre|error-correo|error-mensaje"> para
     errores y un <p id="mensaje-exito" hidden> para la confirmación
   ========================================================== */

// ===== Modo claro/oscuro =====
const botonTema = document.getElementById("btn-tema");

function aplicarTema(tema) {
  document.body.classList.toggle("modo-oscuro", tema === "oscuro");
}

if (botonTema) {
  // Al cargar, usa el tema guardado (o "claro" si no hay ninguno)
  aplicarTema(localStorage.getItem("tema") || "claro");

  botonTema.addEventListener("click", () => {
    const esOscuro = document.body.classList.contains("modo-oscuro");
    const nuevoTema = esOscuro ? "claro" : "oscuro";
    aplicarTema(nuevoTema);
    localStorage.setItem("tema", nuevoTema);
  });
}

// ===== Filtro de proyectos por categoría =====
const botonesFiltro = document.querySelectorAll(".btn-filtro");
const proyectos = document.querySelectorAll(".proyecto");

function filtrarProyectos(categoria) {
  proyectos.forEach((proyecto) => {
    const coincide = categoria === "todos" || proyecto.dataset.categoria === categoria;
    proyecto.style.display = coincide ? "" : "none";
  });
}

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Marca visualmente el botón activo
    botonesFiltro.forEach((b) => {
      b.classList.remove("activo");
      b.setAttribute("aria-pressed", "false");
    });
    boton.classList.add("activo");
    boton.setAttribute("aria-pressed", "true");

    filtrarProyectos(boton.dataset.filtro);
  });
});

// ===== Formulario de contacto con validación =====
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
  const campoNombre = document.getElementById("nombre");
  const campoCorreo = document.getElementById("correo");
  const campoMensaje = document.getElementById("mensaje");
  const mensajeExito = document.getElementById("mensaje-exito");

  // Revisa que el correo tenga forma de correo (algo@dominio.ext)
  const correoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  // Muestra (o limpia, si el texto va vacío) el error de un campo
  function mostrarError(campo, texto) {
    document.getElementById("error-" + campo.id).textContent = texto;
    campo.setAttribute("aria-invalid", texto ? "true" : "false");
  }

  function validarFormulario() {
    let esValido = true;

    if (campoNombre.value.trim() === "") {
      mostrarError(campoNombre, "Escribe tu nombre.");
      esValido = false;
    } else {
      mostrarError(campoNombre, "");
    }

    if (campoCorreo.value.trim() === "") {
      mostrarError(campoCorreo, "Escribe tu correo.");
      esValido = false;
    } else if (!correoValido(campoCorreo.value.trim())) {
      mostrarError(campoCorreo, "El correo no es válido (ejemplo: nombre@correo.com).");
      esValido = false;
    } else {
      mostrarError(campoCorreo, "");
    }

    if (campoMensaje.value.trim() === "") {
      mostrarError(campoMensaje, "Escribe un mensaje.");
      esValido = false;
    } else {
      mostrarError(campoMensaje, "");
    }

    return esValido;
  }

  formContacto.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    mensajeExito.hidden = true;

    if (validarFormulario()) {
      mensajeExito.textContent = "¡Mensaje enviado correctamente! Gracias por escribirnos.";
      mensajeExito.hidden = false;
      formContacto.reset();
    }
  });
}