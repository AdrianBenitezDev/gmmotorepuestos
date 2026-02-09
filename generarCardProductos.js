import {categoriasTextos} from "./config.js"
import {cargarCategorias} from './cargarCategorias.js'
import {compartir} from './parametrosURL.js'
import {addProduct,comprarProductoIndividual} from './carrito.js'

export let jsonActual={};
let categoriaActual=1;
let cantidadActual=1;


export async function setJsonActual(valor){
  jsonActual=valor
  console.log("-Se actalizo el valor de JsonActual:")
  console.log(jsonActual)
}

//traemos los productos del json y lo guardamos en una varuable "JSONACTUAL"
export async function cargarProductos(id) {

  categoriaActual=id
    
    //let apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/categorias/${categoriasTextos[id]}`;
    //raw
      const apiURL = `https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductosByCategoria?categoria=${encodeURIComponent(categoriasTextos[categoriaActual])}`;


    const res = await fetch(apiURL);

    const archivos = await res.json();

    setJsonActual(archivos.productos)

    //restablecemos el div que contien las categorias
    document.getElementById("DivCategorias").innerHTML="";

   

    // --------------------------------------------
    // ------------ cabecera de categoria----------
    // --------------------------------------------
    let categoriaMayus=categoriasTextos[id].charAt(0).toUpperCase()+categoriasTextos[id].slice(1);

    document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <button class="btnCargarCategorias" >Inicio</button>
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

 return newActual;

  }
}

function navMenos(actual){
   if(actual>1){

    let newActual=actual-1;

 panelProductoNav(newActual)

 
 return newActual;
   
}
return 1;

}

export function panelProductoNav(numeroNavActual){

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
  
      <button id="navMenos" data-numero=${numeroNavActual} >&lt</button> Mostrando ${inicioNav} al ${terminarDeIterar} de ${cantidadProductos} Productos Totales <button id="navMas" data-numero=${numeroNavActual}>&gt</button>

  </div>
  <br>`

  //realizamos la iteración
  for (let index = inicioNav; index < terminarDeIterar; index++) {
    
    console.log(jsonActual)
    let json=jsonActual[index];



    console.log("dentro de nav")
    console.log(json)

    
            // crear card
            const card = document.createElement("div");
            card.className = "cardProductoBusqueda";
            card.innerHTML = `

            ${json.stock==0?'<span class="labelStockBusqueda" >Sin Stock</span>':''}

                
            <img style="width:100px; height:100px; overflow:visible;" src="${json.img[0]}">


                <h3>${json.producto}</h3>

                <h3 style="color:red;">$ ${json.precio}</h3>

                <div class="divBtn">
                      <button class="comprarProductoIndividual${json.stock==0?' btnDisabled" disabled':'"'} data-producto='${JSON.stringify([
                        json.id,
                          json.producto,
                          json.precio,
                          1,
                          json.img[0]])}'>
                          Comprar
                      </button>

                      <button class="addProduct${json.stock==0?'btnDisabled" disabled':'"'} data-producto='${JSON.stringify([
                        json.id,
                        json.producto,
                        json.precio,
                        1,
                        json.img[0]])}'>
                          Agregar al Carrito
                      </button>

                      <button class="mostrarProd" data-index=${index} data-id=${json.id}>
                          Ver producto
                      </button>
                </div>
            `;

            contenedorNav.appendChild(card);

  }

  //agregamos el navegador de productos en el bottom

  contenedorNav.innerHTML+=`
  
  <br>
  <div class="row navegador" id="navHeader"> 
  
     <button id="navMenos_Bottom" data-numero=${numeroNavActual} >&lt</button> Mostrando ${inicioNav} al ${terminarDeIterar} de ${cantidadProductos} Productos Totales <button id="navMas_Bottom" data-numero=${numeroNavActual}>&gt</button>

    </div>`;

  //aquiNav
  
  //colocamos los listener del navegador
  
  function handleNav(e, fn) {
  const el = e.currentTarget;
  let value = Number(el.dataset.numero);
  if (Number.isNaN(value)) return;

  el.dataset.numero = fn(value);
}

document.getElementById('navMenos').addEventListener("click", e => handleNav(e, navMenos));
document.getElementById('navMas').addEventListener("click", e => handleNav(e, navMas));
document.getElementById('navMenos_Bottom').addEventListener("click", e => handleNav(e, navMenos));
document.getElementById('navMas_Bottom').addEventListener("click", e => handleNav(e, navMas));




}

export function mostrarProducto(index,name) {


   let thisJSON=Object.values(jsonActual)[index]
 
    console.log(thisJSON);

    let urlFija=`${thisJSON.img}`
    

    let labelStock=""
   

    if(thisJSON.stock==0){
        
      labelStock=`
      <span class="labelStock">Producto Sin Stock</span> 
      `
    }


            document.getElementById("visorProducto").innerHTML = `
            
                 <div class="divVP" id="vistaP">

                 ${labelStock}

<!-- fila principal -->
          <div class="row">

            <!-- columna de 4 imagenes -->
            <div class="column">
              <img ${thisJSON.stock==0?'class="imgDisabled"':''} id="img404_4" class="img404" src="${thisJSON.img[1]?thisJSON.img[1]:'./Image404.png'}" alt="./Image404.png">
              <img ${thisJSON.stock==0?'class="imgDisabled"':''} id="img404_4" class="img404" src="${thisJSON.img[2]?thisJSON.img[2]:'./Image404.png'}" alt="./Image404.png">
              <img ${thisJSON.stock==0?'class="imgDisabled"':''} id="img404_4" class="img404" src="${thisJSON.img[3]?thisJSON.img[3]:'./Image404.png'}" alt="./Image404.png">
              <img ${thisJSON.stock==0?'class="imgDisabled"':''} id="img404_4" class="img404" src="${thisJSON.img[4]?thisJSON.img[4]:'./Image404.png'}" alt="./Image404.png">
            </div>

            <!-- imagen seleccionada y titulo -->
            <div class="column">

               <img class="img404 img404Big ${thisJSON.stock==0?'imgDisabled':''}" id="img404_0"  src="${thisJSON.img[0]?thisJSON.img[0]:'./Image404.png'}" alt="./Image404.png">
              
            </div>

            <!-- boton comprar y precio -->
            <div class="column info" id="infoP">
               <h2 class="tituloVP" id="tituloVP">${thisJSON.producto}</h2>
               <p class="precioVP" id="precioVP">$ ${thisJSON.precio}</p>

               <div class="descripcionVP">
              <p id="descripcionVP">${thisJSON.descripcion}</p>
               </div>

               <p>Stock: ${thisJSON.stock}</p>

               <div class="row">

                  <button class="menosCantidad ${thisJSON.stock==0?' btnDisabled' :''}" ${thisJSON.stock==0? 'disabled':''}  > - </button>
                    <p id="inputCantidad">1</p>
                  <button class="masCantidad ${thisJSON.stock==0?' btnDisabled' :''}" ${thisJSON.stock==0? 'disabled':''} data-stock=${thisJSON.stock}  > + </button>

               </div>
               
                          <button 
                            class="comprarProductoIndividualVP${thisJSON.stock == 0 ? 'btnDisabled' : ''}"
                            ${thisJSON.stock == 0 ? 'disabled' : ''}
                            id="buy"
                            data-producto='${JSON.stringify([
                              thisJSON.id,
                              thisJSON.producto,
                              thisJSON.precio,
                              cantidadActual,
                              thisJSON.img[0]
                            ])}'
                          >
                            Comprar
                          </button>

                <button class="addProduct${thisJSON.stock==0?' btnDisabled" disabled':'"'} 
                data-producto='${JSON.stringify([
                  thisJSON.id,
                  thisJSON.producto,
                  thisJSON.precio,
                  cantidadActual,
                  thisJSON.img[0]])}'>
                          Agregar al Carrito
                      </button>

               <button class="consultarVendedor" id="consultarVendedor" data-producto=${thisJSON.producto} data-precio=${thisJSON.precio} data-id=${thisJSON.id}>Consultar al Vendedor</button>

               <button class="compartir" data-id=${thisJSON.id} >Compartir</button>

            </div>


          </div>
<!-- descripcion del producto -->
          

        </div>
            
            `;

            document.getElementById("visorProducto")
                .scrollIntoView({ behavior: "smooth", block: "start" });




  // -------      menosCantidad 
  document.getElementById("infoP").addEventListener('click',e=>{
   
    let btnMenosC=e.target.closest(".menosCantidad");
  
    if(!btnMenosC)return
    menosCantidad();
  })


  // --------     masCantidad  ---------------
  document.getElementById("infoP").addEventListener('click',e=>{
    
    let btnMasC=e.target.closest(".masCantidad");

  
    if(!btnMasC)return
    
    let stockMaximo=btnMasC.dataset.stock;

    if( stockMaximo<=cantidadActual){
      alert("No hay suficiente Stock por el momento para tu pedido")
      return
    }
    

    masCantidad();
  })






    
}

export function menosCantidad(){
  if(cantidadActual<=1){

  }else{

        cantidadActual--
    let texto = String(cantidadActual);
      document.getElementById("inputCantidad").textContent=texto;
  }
}

export function masCantidad(){
  
  
  cantidadActual++
    let texto = String(cantidadActual);
    
  
document.getElementById("inputCantidad").textContent=texto;

}


listenerMostrarProducto();
listenerCargarProducto();
  listenerPanelNav();
// -------   ---------
function listenerMostrarProducto(){

  let divMP= document.getElementById("visorProducto");

divMP.addEventListener('click',e=>{
  
  let btn=e.target.className;

  switch(btn){
    case "comprarProductoIndividualVP":

              let btnData=e.target.closest(".comprarProductoIndividualVP");

              let arrayProducto=JSON.parse(btnData.dataset.producto);

              console.log(arrayProducto)

              comprarProductoIndividual(arrayProducto)
              break;
    case "addProduct":

              let data=e.target.closest(".addProduct");

              let arrayAddProduc=JSON.parse(data.dataset.producto);

              console.log(arrayAddProduc)

              addProduct(arrayAddProduc)
              break;
    case "consultarVendedor":

    let btnWhatme=e.target.closest(".consultarVendedor");
    let name=btnWhatme.dataset.name;
    let precio=btnWhatme.dataset.precio;
    let cantidad=document.getElementById("inputCantidad")?.textContent || 1
    let id=btnWhatme.dataset.id;

    //ejecutamos la funcion directamente
                  contactarVendedor({
                nombre: name,
                precio: precio,
                cantidad: cantidad,
                id:id
              });

    break;

    case "compartir":

    let btnCompartir=e.target.closest(".compartir");
    let idProduct=btnCompartir.dataset.id;
     compartir(idProduct);
     break;

    
  }
})

}

function listenerCargarProducto(){

  let divCategoriaSeleccionada= document.getElementById("categoriaSeleccionada");

  divCategoriaSeleccionada.addEventListener('click',e=>{

    let btn=e.target.closest(".btnCargarCategorias");
    if(!btn) return;

    cargarCategorias();

  })


}


function listenerPanelNav(){
  
  
let contenedorNav = document.getElementById("DivProductos");

  contenedorNav.addEventListener("click",(e)=>{

    const btnClick=e.target.className;

    switch(btnClick){

      case "mostrarProd":

                        const btn=e.target.closest(".mostrarProd") 
                    if(!btn)return;

                    let index=btn.dataset.index;
                    let id=btn.dataset.id;

                      mostrarProducto(index,id)
        break;
        
      case "comprarProductoIndividual":

      let btnCI=e.target.closest(".comprarProductoIndividual")

      let array=JSON.parse(btnCI.dataset.producto);

      comprarProductoIndividual(array);

        break;
        
      case "addProduct":
           let btnAP=e.target.closest(".addProduct")

      let arrayAP=JSON.parse(btnAP.dataset.producto);

      addProduct(arrayAP);
        break;

    }
   
  })
}

function contactarVendedor(producto) {
  const telefono = "5491121807862";

  const mensaje = `
Hola 👋
Quiero consultar por este producto:

📦 ${producto.nombre}
💲 Precio: $${producto.precio}
🔢 Cantidad: ${producto.cantidad}

https://gmmotorepuestos.com.ar/${producto.id}
  `.trim();

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
