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
  }else if(arrayImgSeleccionadas.length==0){
    alert("debe seleccionar alguna imagen para el producto")
  }else{
   

  alert("Enviando datos…");

  // ---------------------------------------------------
  // 1) TOMAR EL HTML REAL DE LA VISTA PREVIA
  // ---------------------------------------------------
  // 1) TOMAR EL HTML REAL DE LA VISTA PREVIA
const vistaPhtml = document.getElementById("vistaP").innerHTML;

// 2) Crear DOM virtual
const parser = new DOMParser();
const docVirtual = parser.parseFromString(vistaPhtml, "text/html");

// 3) Obtener TODAS las imágenes dentro del HTML
const docImagenes = docVirtual.querySelectorAll("img");

// 4) Cambiar el src por ./imagen_0, ./imagen_1, ...
docImagenes.forEach((img, index) => {
  img.src = `./imagen_${img.id.replaceAll('img404_','')}.jpg`;  
});

// 5) Convertir el DOM virtual ya modificado en string HTML nuevamente
const htmlModificado = docVirtual.body.innerHTML;

// 6) Armar tu documento final
const htmlFinal = `
<html>
<head>
  <meta charset="UTF-8" />
  <title>${titulo}</title>
  <link rel="stylesheet" href="style.css"> 
</head>
<body>
  ${htmlModificado}
</body>
</html>
`;


  // ---------------------------------------------------
  // 2) CONVERTIR IMÁGENES SELECCIONADAS A BASE64
  // ---------------------------------------------------
  const imagenesBase64 = await Promise.all(
    arrayImgSeleccionadas.map((url, index) => convertirImagenABase64(url, index))
  );

    // -------------------------------------------------
  // 3) GENERAMOS UN NUMERO RANDOM PARA EL NAME
  // ---------------------------------------------------
  let nombreDelProducto = "prod_" + Math.floor(1000 + Math.random() * 9000) +".html";

  // ---------------------------------------------------
  // 3) ARMAR PAYLOAD PARA APPS SCRIPT
  // ---------------------------------------------------
  const payload = {
    htmlFile: {
      name: nombreDelProducto,
      content: htmlFinal,
      categoria: categoria.value
    },
    images: imagenesBase64
  };

  console.log("Payload listo:", payload);

  // ---------------------------------------------------
  // 4) ENVIAR A APPS SCRIPT
  // ---------------------------------------------------
  fetch("https://script.google.com/macros/s/AKfycbzBf7RIRprq3RyAuP5KVgjGKBhvKYSzrRRlYqmkVoYzzebGSHpDChDhusqcgrZEif6H1Q/exec", {
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

 
  }


  function convertirImagenABase64(url, index) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: `imagen_${index}.jpg`,   // ← le das un nombre a cada imagen
            base64: reader.result.split(',')[1] // solo la parte Base64
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
}
