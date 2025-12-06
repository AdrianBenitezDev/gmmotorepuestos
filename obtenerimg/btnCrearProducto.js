document.getElementById("btnCP").addEventListener('click', crearProducto);

async function crearProducto() {

  let titulo = document.getElementById("tituloP").value;
  let precio = document.getElementById("inputPrecio").value;
  let descripcion = document.getElementById("descripcionP").value;
  let categoria = document.getElementById("categorias");

  // VALIDACIÓN
  if (titulo == '' || precio == '' || descripcion == '' || categoria.value == categoria.options[0].value) {
    alert("Debe completar todos los datos");
    return;
  }

  alert("Enviando datos…");

  // ---------------------------------------------------
  // 1) TOMAR EL HTML REAL DE LA VISTA PREVIA
  // ---------------------------------------------------
  const vistaPhtml = document.getElementById("vistaP").innerHTML;

  // si querés agregar encabezado <html> lo agregamos:
  const htmlFinal = `
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${titulo}</title>
    <link rel="stylesheet" href="style.css"> 
  </head>
  <body>
    ${vista}
  </body>
  </html>
  `;

  // ---------------------------------------------------
  // 2) CONVERTIR IMÁGENES SELECCIONADAS A BASE64
  // ---------------------------------------------------
  const imagenesBase64 = await Promise.all(
    arrayImgSeleccionadas.map((url, index) => convertirImagenABase64(url, index))
  );


  // ---------------------------------------------------
  // 3) ARMAR PAYLOAD PARA APPS SCRIPT
  // ---------------------------------------------------
  const payload = {
    htmlFile: {
      name: "producto.html",
      content: vistaPhtml
    },
    images: imagenesBase64
  };

  console.log("Payload listo:", payload);

  // ---------------------------------------------------
  // 4) ENVIAR A APPS SCRIPT
  // ---------------------------------------------------
  fetch("https://script.google.com/macros/s/XXXXX/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(r => r.text())
  .then(resp => {
    console.log("Respuesta Apps Script:", resp);
    alert("Producto subido correctamente a GitHub");
  })
  .catch(err => {
    console.error(err);
    alert("Error al subir el producto");
  });
}
