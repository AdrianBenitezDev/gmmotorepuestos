// Inicialización de la aplicación:
// 1. Leer parámetros desde la URL

lecturaUrl()

async function lecturaUrl() {
    const urlActual = new URL(window.location.href);

const parametrosUrl=urlActual.searchParams;

let urlCategoria=parametrosUrl.get("categoria");
let urlId=parametrosUrl.get("id");
// 2. Si existen, realizar un fetch

if(urlCategoria&&urlId){

     jsonActual=await traerProductoUrl(urlId)

     if(jsonActual.length>0){
        //ocultamos los demas div
        document.getElementById("DivCategorias").style.display="none"
        mostrarProducto(0,urlId,urlCategoria) 
     }

    
}else{
    console.log("no hay parametros por URL")
}
}

// 3. Completar la Vista Previa (VP) con la información recibida

async function traerProductoUrl(id) {
    //obtenemos el json con los datos del producto
    const url=`https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductosByKeyword?id=${id}`;
    console.log(url)
    const resp=await fetch(url)
    
    const archivos = await resp.json();

    console.log(archivos)

    return json=Object.values(archivos).filter(elemento=>elemento.id==id)

}


//logia para compartir url
//?categoria=mantenimiento&id=producto_647_40_18_412026

async function compartir(id){
   
    let url =  new URL(window.location.href);
    if(url.searchParams.get("categoria")){

    }else{
       url+=`?id=${id}`;

    }
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Mirá este link 👇",
        url: url
      });
    } catch (err) {
      console.log("Compartir cancelado");
    }
  } else {
    // Fallback para PC
    navigator.clipboard.writeText(url);
    alert("Link copiado al portapapeles 📋");
  }

}
