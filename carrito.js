window.onload = traerCategorias();

let arrayPedido=[]

async function traerCategorias() {


  spinerSC(true);

  const url = "https://script.google.com/macros/s/AKfycbxT5zeNWK5O_z3Na_XVU_Rz6d8yw_uI2AZS94gp9XXrtBEzR4hMvlzqRUGuhezyytxa/exec?acc=th";

  try {
    const res = await fetch(url);
    const data = await res.json();

    //console.log("Categorías:", data);
    let divCategoria=document.getElementById("categorias");
    data.forEach(categoria => {
        divCategoria.innerHTML+=`<button class="btn btn-primary" onclick='traerPrecios("${categoria}")'>${categoria}</button>`;
    });
      spinerSC(false);
    return data; // es un array con los nombres de las hojas

    
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
      spinerSC(false);
       let divCategoria=document.getElementById("categorias");
      divCategoria.innerHTML=`<p>Revise su conexión a Internet!</p>`;
    return ["MILANESAS"];
  }
}

async function traerPrecios(cat) {

document.getElementById("titleCategoria").scrollIntoView({
    behavior: "smooth"
  });

   let catSinEspacio=cat.replaceAll('20%',' ');
    document.getElementById("titleCategoria").textContent=catSinEspacio;


       divPrecios.innerHTML='';
         spinerC(true);


   // let catFormateada=cat.replaceAll(' ','22%')
  const url = `https://script.google.com/macros/s/AKfycbxT5zeNWK5O_z3Na_XVU_Rz6d8yw_uI2AZS94gp9XXrtBEzR4hMvlzqRUGuhezyytxa/exec?acc=tp&&cat=${cat}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Categorías:", data);

    let divPrecios=document.getElementById('divPrecios');

     

    data.forEach(producto=>{
        
       divPrecios.innerHTML+=`
          <div class="card">

          <div class="card-row">

          <div class="card-column">         
          
                <div class="card-header">
                  <h3 class="product-name">${producto[1]}</h3>
                   <span class="dots"></span>
                  <span class="product-price">$${producto[2]}</span>
                </div>
                <p class="product-desc">
                  ${producto[3]}
                </p>
                
          
          </div>
            <button class="btn-agregar" >Agregar</button>
            </div>
   
  </div>
        `;
    })

    const botones = document.querySelectorAll(".btn-agregar");

botones.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    addProduct(data[index]); // acá el array sigue intacto
  });
});


   
    spinerC(false);
    
    return data; // es un array con los nombres de las hojas
  } catch (error) {
    
    let divPrecios=document.getElementById('divPrecios');
    spinerC(false);
    divPrecios.innerHTML=`<p>Revise su conexión a Internet!</p>`
    console.error("Error obteniendo categorías:", error);
    return []
  }
}

//
function addProduct(pro) {

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



//let isLoading = false;

function spinerSC(boleano) {

    document.getElementById("spinnerSC").style.display =
        boleano ? "block" : "none";
}


function spinerC(boleano) {

    document.getElementById("spinnerC").style.display =
        boleano ? "block" : "none";
}


function irHader(){
  document.getElementById("irHader").scrollIntoView({
    behavior: "smooth"
  });
}

function irTop(){
  document.getElementById("bandera").scrollIntoView({
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
            <td class="product-name">${pedido[1]}</td>
            <td class="product-price">$${pedido[2]}</td>
            <td class=""><button onclick="dele(${index})">Borrar</button></td>
          </tr>
  `;

  total += Number(pedido[2]) * Number(pedido[4]);


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

if(arrayPedido.length>1&&arrayPedido[id][4]){
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

}
}