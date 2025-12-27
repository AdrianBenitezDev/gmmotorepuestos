const owner = "AdrianBenitezDev";
const repo = "gmmotorepuestosBackend";
let jsonActual={};

async function cargarProductos(id) {
    
    //let apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/categorias/${categoriasTextos[id]}`;
    //raw
      const apiURL = `https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoriasTextos[id]}/datos.json`;


    const res = await fetch(apiURL);

    const archivos = await res.json();

    jsonActual=archivos;

    console.log("archivos:")

    console.log(archivos)

    //restablecemos el div que contien las categorias
    document.getElementById("DivCategorias").innerHTML="";

    let contenedor = document.getElementById("DivProductos");
    contenedor.innerHTML = ""; // limpiar antes

    // --------------------------------------------
    // ------------ cabecera de categoria----------
    // --------------------------------------------

    document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <button onclick="cargarCategorias()">Inicio</button>
    <h3 style="margin-left:15px">Categoria: <span style="color:red;">${categoriasTextos[id]}</span></h3>
    
    `;            
    // --------------------------------------------
    // ------------ FIN de categoria --------------
    // --------------------------------------------

    Object.values(archivos).forEach(json => {

            
            // crear card
            const card = document.createElement("div");
            card.className = "card row";
            card.innerHTML = `

                
            <img style="width:100px; height:100px; overflow:visible;" src="https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoriasTextos[id]}/${json.id}/${json.img[0]}">


                <h3>${json.producto}</h3>

                <h3 style="color:red;">${json.precio}</h3>

                <button onclick="mostrarProducto('${json.id}','${categoriasTextos[id]}')">
                    Ver producto
                </button>
            `;

            contenedor.appendChild(card);
        
    });
}
function mostrarProducto(name,categoria) {

    let thisJSON=jsonActual[name]
    console.log(thisJSON)

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

