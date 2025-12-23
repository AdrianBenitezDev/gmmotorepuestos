
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


let divCategoria=document.getElementById("CategoriaAndProductos");

   // <img src="./Image404.png" alt="${categoria}">

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