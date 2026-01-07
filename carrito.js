//window.onload = traerCategorias();

let arrayPedido=[]

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

const mensaje = document.getElementById("mensaje");

function mostrarMensaje() {
  // Mostrar
  mensaje.classList.add("show");

  // Esperar 3 segundos
  setTimeout(() => {
    mensaje.classList.remove("show");
  }, 3000);
}


//Agregar al carrito
function addProduct(pro) {

  
mostrarMensaje();


  let existe = arrayPedido.find(ele => ele[0] == pro[0]);

  if (existe) {
    // Si existe, sumo cantidad
    existe[4] += 1;

  } else {
    // Si no existe, agrego uno nuevo
    arrayPedido.push([pro[0], pro[1], pro[2], pro[3], 1]);
  }

  document.getElementById("contadorCarrito").textContent = arrayPedido.length;
}


function irDivBuscar(){
  document.getElementById("DivSeach").scrollIntoView({
    behavior: "smooth"
  });
}

function verPedidos(){
if(arrayPedido.length>0){

  let total=0;
  document.getElementById("panelBlack").style.display="flex";

  let row="";
  arrayPedido.forEach((pedido,index)=>{

  row+=`
          <tr>
            <td><button onclick="menos(${index})" >-</button> ${pedido[4]} <button onclick="mas(${index})">+</button></td>
           
            <td class=""><img class="imgPanelPedidos" src="https://raw.githubusercontent.com/AdrianBenitezDev/gmmotorepuestosBackend/main/categorias/${pedido[0]}/${pedido[1]}/imagen_0_${pedido[1].replace("producto_","")}.jpg"></td> 
             <td class="product-name">${pedido[2]}</td>
            <td class="product-price">$${pedido[3]}</td>
            <td class=""><button onclick="dele(${index})">Borrar</button></td>
          </tr>
  `;

  total += Number(pedido[3]) * Number(pedido[4]);


  })

  document.getElementById("rowTabla").innerHTML=row;
    document.getElementById("Total").innerHTML="$ "+total;


}else{
alert("no selecciono ningún producto!")
}
}

function cerrarPanelPedidos(){
  document.getElementById("panelBlack").style.display="none";
}



function menos(id){

if(arrayPedido.length>0 && arrayPedido[id][4]>1){
arrayPedido[id][4]=Number(arrayPedido[id][4])-1;

verPedidos();
}

}
function mas(id){
 
 
arrayPedido[id][4]=Number(arrayPedido[id][4])+1;

verPedidos();
 
}

function dele(id){

if(arrayPedido[id][4]&&arrayPedido.length>1){
 arrayPedido.splice(id, 1);
  document.getElementById("contadorCarrito").textContent = arrayPedido.length;
verPedidos();
}else{
  arrayPedido.splice(id, 1);
  document.getElementById("rowTabla").innerHTML="<td></td><td><p>La lista de Pedidos esta Vacia</p></td><td></td><td></td><td></td>"
   document.getElementById("contadorCarrito").textContent = "0";
   document.getElementById("Total").innerHTML="$ 0";

}
}