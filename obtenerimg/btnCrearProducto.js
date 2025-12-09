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
   
spinTrue();
  //  alert("Enviando datos…");

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



const nuevasRutas = []; // esto lo mandarás al backend
let numeroRandom= Math.floor(1000 + Math.random() * 9000);
  let nombreDelProducto = "prod_" + numeroRandom +".html";


docImagenes.forEach((img, i) => {
    const extension = ".jpg"; // o detectás desde img.src si querés
    const nuevoNombre = `https://raw.githubusercontent.com/AdrianBenitezDev/gmmotorepuestosBackend/main/categorias/${categoria.value}/imagen_${i}_${numeroRandom}${extension}`;

    // guardamos el nuevo nombre para el backend
    nuevasRutas.push(nuevoNombre);

    // modificamos el HTML
    img.src = `${nuevoNombre}`;
});


// 5) Convertir el DOM virtual ya modificado en string HTML nuevamente
const htmlModificado = docVirtual.body.innerHTML;

// 6) Armar tu documento final
const htmlFinal = `
<html>
<head>
  <meta charset="UTF-8" />
  <title>${titulo}</title>
    <link rel="stylesheet" href="./vistaPrevia.css"> 
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
  arrayImgSeleccionadas.map(
    (url, index) => convertirImagenABase64(url, nuevasRutas[index])
  )
);


    // -------------------------------------------------
  // 3) GENERAMOS UN NUMERO RANDOM PARA EL NAME
  // ---------------------------------------------------

  // ---------------------------------------------------
  // 3) ARMAR PAYLOAD PARA APPS SCRIPT
  // ---------------------------------------------------
  const payload = {
  categoria: categoria.value,
  htmlFile: {
    name: nombreDelProducto,
    content: htmlFinal
  },
  images: imagenesBase64
};


  console.log("Payload listo:", payload);

  // ---------------------------------------------------
  // 4) ENVIAR A APPS SCRIPT
  // ---------------------------------------------------

  //para pruebas
  //let urlExcel="https://script.google.com/macros/s/AKfycbzjWcAHodsQeqmYdZfkifFIccsS5gYSjPwF1pCSmP0p/dev";
 

  //para producción
  let urlExcel="https://script.google.com/macros/s/AKfycbx-YwE7fkQKIyiQV13JPs0iIxRWw-nohtciTnR0Gb2G_ef6qtWSHSDEro_ipWeiBnTtKg/exec";
   console.log(urlExcel)

  try {
  resp = await fetch(urlExcel,{
  method: "POST", headers: {
    "Content-Type": "text/plain"  // 👈 TRUCO CLAVE: NO HAY OPTIONS
  },
  body: JSON.stringify(payload)
})
 const texto = await resp.text(); // <-- aquí está la respuesta REAL
  console.log("Respuesta del backend:", texto);

  spinFalse();
  alert("datos cargados correctmente")
} catch (e) {
  spinFalse();
  console.log("this error")
  console.error(e);
 
  return;
}




   }
    }



  
  function convertirImagenABase64(url, nombreFinal) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: nombreFinal,   // 👈 AHORA USA EL NOMBRE REAL
            base64: reader.result.split(',')[1]
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
}
