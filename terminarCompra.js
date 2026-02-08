
let datos=JSON.parse(localStorage.getItem('datos'));
let arrayPedido=datos?.carrito||[];

console.log(arrayPedido)

let divListaProducto=document.getElementById("listaProductos");

if(arrayPedido.length>0){
    //realizamos la lectura del carrito y renderizamos

//0 categoria
//1 id producto
//2 nombre del producto
//3 precio
//4 canatidad del producto comprados



  // id                  0
  // producto            1
  // precio              2
  // cantidadActual      3
  // img[0]              4


let totalPagar=0;
let cantidadPorPrecio=0;
arrayPedido.forEach((pedido,index) => {
    
    cantidadPorPrecio= parseNumeroAR(pedido[2]) * parseNumeroAR(pedido[3]);
     totalPagar += cantidadPorPrecio;
    divListaProducto.innerHTML+=`
        <tr> 
        <td>${index+1}</td>
        <td>
            <img class="imgPanelPedidos" src="${pedido[4]}">
        </td>
        <td>${pedido[1]}</td>
        <td>$ ${pedido[2]}</td>
         <td>${pedido[3]}</td>
        <td>$ ${cantidadPorPrecio}</td>
        </tr>
    `;
   

});

document.getElementById("totalPagar").textContent=parseNumeroAR(totalPagar);

console.log(totalPagar)

//<td>${pedido[2].length>35?pedido[2].slice(0,35)+"...":pedido[2]}</td>



}else{
    //rediirecionamos al incio
    alert("no hay productos selecionados")
}


function parseNumeroAR(valor) {
  if (typeof valor === "number") return valor;

  return Number(
    valor
      .replace(/\./g, "") // quita separador de miles
      .replace(",", ".")  // convierte decimal a formato JS
  );
}
