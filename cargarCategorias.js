import {cargarProductos} from "./generarCardProductos.js"
import {categoriasTextos} from "./config.js"
import { spinTrue, spinFalse } from "./spinner.js";



export function cargarCategorias(){

  // alert("ejecutando cargar categorias")

document.getElementById("DivProductos").innerHTML="";

document.getElementById("visorProducto").innerHTML="";


let divCategoria=document.getElementById("DivCategorias");

   // <img src="./Image404.png" alt="${categoria}">

divCategoria.innerHTML='';
document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <button class="btnCargarCategoria" >Inicio</button>
    <h3 style="margin-left:15px">Seleccione una Categoria</h3>
    
    `; 

categoriasTextos.forEach((categoria,index)=>{

  if(index==0){
    return
  }

  let categoriaMayus=categoria.charAt(0).toUpperCase()+categoria.slice(1);

            divCategoria.innerHTML+=`
            <div class="card">
                                            
                <img src="./imagenes/img_${categoria}.png" alt="">
                            
                <h3>${categoriaMayus}</h3>

                <br>
                
                <a class="button" data-index="${index}">Ver Catálogo</a>
            </div>
            `;
})
}

//al iniciar la web cargamos las categorias por default
cargarCategorias();

document.addEventListener('click',(e)=>{

  const card=e.target.closest('.button');
  if(!card)return
  spinTrue();
  let index=card.dataset.index;

  cargarProductos(index)

  spinFalse();
})

irInicio();
export function irInicio(){
  
  let divCargarCategoria=document.getElementById("categoriaSeleccionada");

//ir a Inicio
divCargarCategoria.addEventListener('click',e=>{

  let btnCat=e.target.closest(".btnCargarCategoria");

  if(!btnCat)return

  cargarCategorias()


})
}