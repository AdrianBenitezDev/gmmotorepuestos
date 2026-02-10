import {spinTrue,spinFalse} from './spinner.js'

//window.onload = traerCategorias();
let datos=JSON.parse(localStorage.getItem('datos'));
let user=datos?.usuario||"user_"+Math.random(4);
let arrayPedido=datos?.carrito||[];


if(arrayPedido.length>0){
  
  document.getElementById("contadorCarrito").textContent = arrayPedido.length;
  mostrarMensaje("⚠️ Hay Productos en el Carrito!")

}


//necesito que se ingrese:

//0 categoria
//1 id producto
//2 nombre del producto
//3 precio
//4 canatidad del producto comprados

// arrayPedido[0]
// arrayPedido[1]
// arrayPedido[2]
// arrayPedido[3]
// arrayPedido[4]  Cantidad de la Compras 


function mostrarMensaje(mensaje) {
  const containerMensaje = document.getElementById("mensaje");

  let divMensaje = document.createElement('div');
  divMensaje.classList.add('mensaje');

  let texto = document.createElement("p");
  texto.textContent = mensaje;

  divMensaje.appendChild(texto);
  containerMensaje.appendChild(divMensaje);

  // FORZAR un frame para que la transición funcione
  requestAnimationFrame(() => {
    divMensaje.classList.add("show");
  });

  // Visible 3 segundos
  setTimeout(() => {
    divMensaje.classList.remove("show");

    // Esperar que termine la animación antes de eliminar
    setTimeout(() => {
      containerMensaje.removeChild(divMensaje);
    }, 500); // mismo tiempo que la transición
  }, 3000);
}



//Agregar al carrito
export function addProduct(pro) {

  let cantidadActualStock=Number(document.getElementById("inputCantidad")?.textContent) || 1 ;

  if(cantidadActualStock){

  console.log(cantidadActualStock)  
  pro[3]=cantidadActualStock;

  }else{
    pro[3]=1;
  }

  // ['${thisJSON.id}',           0
  // '${thisJSON.producto}',      1
  // '${thisJSON.precio}',        2
  // '${cantidadActual}',         3
  // '${thisJSON.img[0]}']        4


mostrarMensaje("✅ Producto Agregado!");


  let existe = arrayPedido.find(ele => ele[0] == pro[0]);

  if (existe) {
    // Si existe, sumo cantidad
    existe[3] = Number(existe[3]) + pro[3];

  } else {
    // Si no existe, agrego uno nuevo
    arrayPedido.push([pro[0], pro[1], pro[2], Number(pro[3]), pro[4]]);
  }

  document.getElementById("contadorCarrito").textContent = arrayPedido.length;

  //guardamos en local storage
let datosGuardarLocalStorage={usuario:user,carrito:arrayPedido};

  localStorage.setItem('datos',JSON.stringify(datosGuardarLocalStorage))
  console.log("datos guardados en ls: ")
  console.log(datosGuardarLocalStorage)

//RESETEAMO EL VALOR DE LA CANTIDAD DE STOCK SELECCIONADO
try{

  document.getElementById("inputCantidad").textContent='1';

}catch{}
}


function irDivBuscar(){
  document.getElementById("DivSeach").scrollIntoView({
    behavior: "smooth"
  });
}
listenerVerPedido()
function listenerVerPedido(){

  document.addEventListener("click",e=>{
    let btn=e.target.closest(".container-Pedido");
    if(!btn)return;
    verPedidos();
  })

}

function verPedidos(){
if(arrayPedido.length>0){

  let total=0;
  document.getElementById("panelBlack").style.display="flex";

  let row="";
  arrayPedido.forEach((pedido,index)=>{

    
  // ['${thisJSON.id}',           0
  // '${thisJSON.producto}',      1
  // '${thisJSON.precio}',        2
  // '${cantidadActual}',         3
  // '${thisJSON.img[0]}']        4


  //                       precio                      cantidad  
  let subtotal= parseNumeroAR(pedido[2]) * parseNumeroAR(pedido[3]);

  //sumamos al total
  total += subtotal;

  row+=`
          <tr>
            <td><button class="menos" data-index=${index} >-</button> ${pedido[3]} <button class="mas" data-index=${index}>+</button></td>
           
            <td class=""><img class="imgPanelPedidos" src="${pedido[4]}"</td> 
             <td class="product-name">${pedido[1]}</td>
            <td class="product-price">$ ${pedido[2]} C/U</td>
            <td class="product-subTotal">$ ${subtotal}</td>
            
            <td> <button class="dele" data-index=${index}>Borrar</button></td>
          </tr>
  `;



  })

  document.getElementById("rowTabla").innerHTML=row;
    document.getElementById("Total").innerHTML="$ "+total;


}else{
alert("no selecciono ningún producto!")
}
}

listenerPanelPedidos();

function listenerPanelPedidos(){
  
let divPanelPedidos=document.getElementById("panelPedidos");

  divPanelPedidos.addEventListener('click',(e)=>{

    let btn=e.target.className;

    switch(btn){
      case "mas":
        let valueMas=e.target.closest(".mas");
        let indexMas=valueMas.dataset.index;
        mas(indexMas);

        break;
      case "menos":
          let valueMenos=e.target.closest(".menos");
        let indexMenos=valueMenos.dataset.index;
        menos(indexMenos);
        break;
      case "dele":
        let valueDele=e.target.closest(".dele")
        let indexDele=valueDele.dataset.index;
        dele(indexDele)
        break;
       case "cerrarPanelPedidos":
        cerrarPanelPedidos();
         break;
       case "finalizarPedido":
        finalizarPedido();
          break;
    }

  })
}


function cerrarPanelPedidos(){
  document.getElementById("panelBlack").style.display="none";
}


//modifica el contador de stock del panel de pedidos
function menos(id){

if(arrayPedido.length>0 && arrayPedido[id][3]>1){
arrayPedido[id][3]=parseNumeroAR(arrayPedido[id][3])-1;

verPedidos();
}

}
function mas(id){
 
arrayPedido[id][3]=parseNumeroAR(arrayPedido[id][3])+1;


verPedidos();
 
}

function dele(id){

if(arrayPedido[id][3]&&arrayPedido.length>1){
 arrayPedido.splice(id, 1);
  document.getElementById("contadorCarrito").textContent = arrayPedido.length;

  
  //guardamos en local storage
let datosGuardarLocalStorage={usuario:user,carrito:arrayPedido};

  localStorage.setItem('datos',JSON.stringify(datosGuardarLocalStorage))
  console.log("datos guardados en ls: ")
  console.log(datosGuardarLocalStorage)

verPedidos();

}else{
  arrayPedido.splice(id, 1);
  document.getElementById("rowTabla").innerHTML="<td></td><td><p>La lista de Pedidos esta Vacia</p></td><td></td><td></td><td></td>"
   document.getElementById("contadorCarrito").textContent = "0";
   document.getElementById("Total").innerHTML="$ 0";

   
  //guardamos en local storage
let datosGuardarLocalStorage={usuario:user,carrito:arrayPedido};

  localStorage.setItem('datos',JSON.stringify(datosGuardarLocalStorage))
  console.log("datos guardados en ls: ")
  console.log(datosGuardarLocalStorage)

}
}

//comprar producto individual:
//agrega el producto al carrito
//y renderiza el carrito para que el usuario coloque la cantidad y aprete en finalizar compra

export function comprarProductoIndividual(pro) {
  console.log(pro)
  addProduct(pro);
  verPedidos();
}



//fncion asociada al btn del carrito de compras
// esta disponible en el carrito para 1 como para mas de 1 producto
async function finalizarPedido(id, categoria, cant, buy) {

  let datosGuardarLocalStorage={usuario:user,carrito:arrayPedido};

  localStorage.setItem('datos',JSON.stringify(datosGuardarLocalStorage))


//abrimos la web para pagar
  // redirección dentro del mismo sitio
  window.location.href = `/revcompra.html`;

}


async function comprarCarrito(){

  spinTrue()

  let datos={
      
      envio:false,
      carrito:true,
      arrayCarrito:arrayPedido,
      producto:{},
      metodo_pago: "local",//puede ser online
      
  }
  
  console.log("datos enviados carrito:")
  console.log(datos)

  //obtenemos el array de productos y lo enviamos al backend

  let resp =await fetch("https://crearVentaPendiente-xhlrljateq-uc.a.run.app", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(datos)
})
 let res=await resp.json();
  console.log(res)

if(res.ok==true){
mostrarMensaje("✅ Compra Realizada");
}else{
mostrarMensaje("❌ Error al realizar la compra");
}

 

  spinFalse()
  cerrarPanelPedidos()
    


}


// //---------------------------------- deprecado --------------------------------------------------------
// async function comprarProductoRevisar(id,categoria,cantidad){

//     spinTrue()
//     mostrarMensaje("Preparando la compra");

//   console.log("comprando..");
//   let array={
//       envio:false,
//       carrito:false,
//       cantidad:cantidad,
//       arrayCarrito:[],
//       cantidad:cantidadActual,
//       producto:{id:id,categoria:categoria},
//       metodo_pago: "local", //puede ser online
//   }

//   let resp =await fetch("https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/crearVentaPendiente", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(array)
// })


//   let res=await resp.json();
//   console.log(res)

//   if(res.ok==true){
// mostrarMensaje("✅ Compra Realizada");
// }else{
// mostrarMensaje("❌ Error al realizar la compra");
// }



//   spinFalse()
// }



function parseNumeroAR(valor) {
  if (typeof valor === "number") return valor;

  return Number(
    valor
      .replace(/\./g, "") // quita separador de miles
      .replace(",", ".")  // convierte decimal a formato JS
  );
}