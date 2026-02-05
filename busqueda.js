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

    console.log(arrayTexto)

  let resultados=[]


    fetch(`https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductosByKeyword?key=${arrayTexto}&limit=10`)
  .then(r => r.json())
  .then(d => {
  
        resultados=d.productos;
  console.log(resultados)


  cagarCardProductos(resultados);

  
  });


  spinnerBusqueda(false);
});



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
