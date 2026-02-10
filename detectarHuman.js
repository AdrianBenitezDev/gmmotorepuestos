let usuarioContado = false;
let timerHumano = null;

function marcarHumano() {
  if (usuarioContado) return;

  usuarioContado = true;

  fetch("https://detectarHuman-xhlrljateq-uc.a.run.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pagina: window.location.pathname
    })
  });
}

// eventos humanos
["mousemove", "scroll", "click", "touchstart"].forEach(ev => {
  window.addEventListener(ev, marcarHumano, { once: true });
});

// fallback: tiempo mínimo en página
timerHumano = setTimeout(marcarHumano, 5000);
