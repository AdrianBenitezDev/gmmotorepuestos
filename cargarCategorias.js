
//despues vemos como declaramos a esta variable como global
const categoriasTextos = [
  "Seleccione una categoria",
  "motor",
  "transmision",
  "frenos",
  "electricidad e iluminación",
  "suspension",
  "cubiertas y llantas",
  "escapes",
  "carroceria y plasticos",
  "accesorios",
  "mantenimiento"
];


function cargarCategorias(){

document.getElementById("DivProductos").innerHTML="";

document.getElementById("visorProducto").innerHTML="";


let divCategoria=document.getElementById("DivCategorias");

   // <img src="./Image404.png" alt="${categoria}">

divCategoria.innerHTML='';
document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <button onclick="cargarCategorias()">Inicio</button>
    <h3 style="margin-left:15px">Seleccione una Categoria</h3>
    
    `; 

categoriasTextos.forEach((categoria,index)=>{

  if(index==0){
    return
  }

            divCategoria.innerHTML+=`
            <div class="card">
                                            
                <img src="./imagenes/img_${categoria}.png" alt="">
                            
                <h3>${categoria}</h3>

                <br>
                
                <a class="button" onclick="cargarProductos(${index})">Ver Catálogo</a>
            </div>
            `;
})
}

//al iniciar la web cargamos las categorias por default
cargarCategorias();