const owner = "AdrianBenitezDev";
const repo = "gmmotorepuestosBackend";
let jsonActual={};
let categoriaActual=1;


//traemos los productos del json y lo guardamos en una varuable "JSONACTUAL"
async function cargarProductos(id) {

  categoriaActual=id
    
    //let apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/categorias/${categoriasTextos[id]}`;
    //raw
      const apiURL = `https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoriasTextos[categoriaActual]}/datos.json`;


    const res = await fetch(apiURL);

    const archivos = await res.json();

    jsonActual=archivos;

    console.log("JSON ACTUAL:")

    console.log(archivos)

    //restablecemos el div que contien las categorias
    document.getElementById("DivCategorias").innerHTML="";

   

    // --------------------------------------------
    // ------------ cabecera de categoria----------
    // --------------------------------------------
    let categoriaMayus=categoriasTextos[id].charAt(0).toUpperCase()+categoriasTextos[id].slice(1);

    document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <button onclick="cargarCategorias()">Inicio</button>
    <h3 style="margin-left:15px">Categoria: <span style="color:red;"> ${categoriaMayus} </span></h3>
    
    `;            
    // --------------------------------------------
    // ------------ FIN de categoria --------------
    // --------------------------------------------




  panelProductoNav(1)

}

function navMas(actual){
  let maximo=Number(Object.values(jsonActual).length)
  console.log(maximo)
  let numNav = Math.floor(maximo / 10);
    console.log(numNav)
  if(actual<numNav){

    let newActual=actual+1;

 panelProductoNav(newActual)

  }
}

function navMenos(actual){
   if(actual>1){

    let newActual=actual-1;

 panelProductoNav(newActual)
   
}

}

function panelProductoNav(numeroNavActual){

   let contenedorNav = document.getElementById("DivProductos");
    contenedorNav.innerHTML = ""; // limpiar antes

  let cantidadProductos=Object.values(jsonActual).length;

  //calculamos los intervamos del nav
  let inicioNav=(Number(numeroNavActual)*10)-10;
  
  let finNav=inicioNav+10;

  console.log(cantidadProductos)//1
  console.log(inicioNav)//0
  console.log(finNav)//10

  //obtenemos el fin de la iteración
let terminarDeIterar=cantidadProductos<finNav?cantidadProductos:finNav;



//agregamos el navegador de productos

  contenedorNav.innerHTML+=`<div class="row navegador" id="navHeader"> 
  
      <button onclick="navMenos(${numeroNavActual})">&lt</button> Mostrando ${inicioNav} al ${terminarDeIterar} de ${cantidadProductos} Productos Totales <button onclick="navMas(${numeroNavActual})">&gt</button>

  </div>
  <br>`

  //realizamos la iteración
  for (let index = inicioNav; index < terminarDeIterar; index++) {
    
    let json=Object.values(jsonActual)[index];



    console.log("dentro de nav")
    console.log(json)

    
            // crear card
            const card = document.createElement("div");
            card.className = "card row";
            card.innerHTML = `

                
            <img style="width:100px; height:100px; overflow:visible;" src="https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${json.categoria}/${json.id}/${json.img[0]}">


                <h3>${json.producto}</h3>

                <h3 style="color:red;">$ ${json.precio}</h3>

                <button onclick="mostrarProducto(${index},'${json.id}','${json.categoria}')">
                    Ver producto
                </button>
            `;

            contenedorNav.appendChild(card);

  }

  //agregamos el navegador de productos en el bottom

  contenedorNav.innerHTML+=`
  
  <br>
  <div class="row navegador" id="navHeader"> 
    <button onclick="navMenos(${numeroNavActual})">&lt</button> Mostrando ${inicioNav} al ${terminarDeIterar} de ${cantidadProductos} Productos Totales <button onclick="navMas(${numeroNavActual})">&gt</button>
  </div>`;
}



function mostrarProducto(index,name,categoria) {

   let thisJSON=Object.values(jsonActual)[index]
 
    console.log(thisJSON);

    let urlFija=`https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoria}/`
    


            document.getElementById("visorProducto").innerHTML = `
            
                 <div class="divVP" id="vistaP">
<!-- fila principal -->
          <div class="row">

            <!-- columna de 4 imagenes -->
            <div class="column">
              <img id="img404_4" class="img404" src="${thisJSON.img[1]?urlFija+name+'/'+thisJSON.img[1]:'./Image404.png'}" alt="./Image404.png">
              <img id="img404_4" class="img404" src="${thisJSON.img[2]?urlFija+name+'/'+thisJSON.img[2]:'./Image404.png'}" alt="./Image404.png">
              <img id="img404_4" class="img404" src="${thisJSON.img[3]?urlFija+name+'/'+thisJSON.img[3]:'./Image404.png'}" alt="./Image404.png">
              <img id="img404_4" class="img404" src="${thisJSON.img[4]?urlFija+name+'/'+thisJSON.img[4]:'./Image404.png'}" alt="./Image404.png">
            </div>

            <!-- imagen seleccionada y titulo -->
            <div class="column">

               <img id="img404_0" class="img404 img404Big" src="${urlFija+name+'/'+'imagen_0_'+name.replace('producto_','')}.jpg" alt="./Image404.png">
              
            </div>

            <!-- boton comprar y precio -->
            <div class="column info" >
               <h2 class="tituloVP" id="tituloVP">${thisJSON.producto}</h2>
               <p class="precioVP" id="precioVP">$ ${thisJSON.precio}</p>

               <div class="descripcionVP">
              <p id="descripcionVP">${thisJSON.descripcion}</p>
               </div>
               
               <button class="buy" id="buy">Comprar</button>

            </div>


          </div>
<!-- descripcion del producto -->
          

        </div>
            
            `;

            document.getElementById("visorProducto")
                .scrollIntoView({ behavior: "smooth", block: "start" });
    
}

// cargarProductos();

