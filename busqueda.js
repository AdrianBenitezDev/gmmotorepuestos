let divBusqueda = document.getElementById("btnBuscar");

let h3Texto=document.getElementById("h3Resultados");

//al iniciar le damos focus a la barra de busqueda
document.getElementById("inputBusqueda").focus();


divBusqueda.addEventListener('click', async () => {

  document.getElementById("DivCategorias").innerHTML = ``;
  document.getElementById("DivProductos").innerHTML = ``;

  spinnerBusqueda(true);


  const input = document.getElementById("inputBusqueda");

  const arrayTexto = input.value
    .toLowerCase()
    .trim()
    .split(/\s+/);

  const promesas = [];

  categoriasTextos.forEach((elemento, index) => {
    
    if(index<=10){
            h3Texto.textContent = 'Buscando...'+index+"0%";
    }
  
    if (index !== 0) {
      promesas.push(traerJSON(arrayTexto, index));
    }
if(index==10){
    h3Texto.textContent = "Resultados:";
  }
  });



  // esperar todas las categorías
  const resultadosPorCategoria = await Promise.all(promesas);

  // 🔥 UNIFICAR OBJETOS (NO flat)
  const resultados = Object.assign({}, ...resultadosPorCategoria);

  console.log("RESULTADOS:", resultados);

  cagarCardProductos(resultados);

  spinnerBusqueda(false);
});




async function traerJSON(arrayTxt, id) { 
    
  const apiURL = `https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoriasTextos[id]}/datos.json`;

  try {
    const res = await fetch(apiURL);
    if (!res.ok) return {};

    const archivos = await res.json(); 

    const coincidencias = {};

    for (const key in archivos) {
      const prod = archivos[key];

      const coincide = arrayTxt.every(palabra =>
        prod.producto.toLowerCase().includes(palabra)
      );

      if (coincide) {
        coincidencias[key] = prod;
      }
    }

    return coincidencias;

  } catch (e) {
    console.log("error "+e)
    return {};
  }
}



function cagarCardProductos(jsonObj){
    
  let contenedor = document.getElementById("DivProductos");
  contenedor.innerHTML = "";

  // guardamos estado actual
  jsonActual = jsonObj;

  // si no hay resultados
  if (Object.keys(jsonObj).length === 0) {
    contenedor.innerHTML = "<h3>No se encontraron resultados</h3>";
    return;
  }

  
  panelProductoNav(1)

}


document.getElementById("btnBorrar").addEventListener("click",()=>{
    document.getElementById("inputBusqueda").value="";
     document.getElementById("inputBusqueda").focus();
     document.getElementById("DivProductos").innerHTML="";
    document.getElementById("visorProducto").innerHTML="";
    
})
