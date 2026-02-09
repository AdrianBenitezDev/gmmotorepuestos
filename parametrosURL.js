import { setJsonActual } from "./generarCardProductos.js";
import { mostrarProducto } from "./generarCardProductos.js";
// Inicialización de la aplicación:
// 1. Leer parámetros desde la URL
window.addEventListener("load", lecturaUrl);

async function lecturaUrl() {
  const url = new URL(window.location.href);
  const urlId = url.searchParams.get("id");

  if (!urlId) {
    console.log("no hay parametros por URL");
    return;
  }

  try {

    const json = await traerProductoUrl(urlId);

    await setJsonActual(json)

      document.getElementById("DivCategorias").style.display = "none";
      mostrarProducto(0, urlId);

      console.log("ANTES:", window.location.href);

      // 🔥 limpiar URL
      url.searchParams.delete("id");
      window.history.replaceState({}, document.title, url.pathname);

      console.log("DESPUES:", window.location.href);

    
  } catch (e) {
    console.error("Error al traer los datos del producto", e);
  }
}


// 3. Completar la Vista Previa (VP) con la información recibida

async function traerProductoUrl(id) {
    //obtenemos el json con los datos del producto
    const url=`https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductoById?id=${id}`;
    console.log(url)
    const resp=await fetch(url)
    
    const archivos = await resp.json();

    console.log(archivos)

    return [archivos.producto]

    // return let json=Object.values(archivos).filter(elemento=>elemento.id==id)

}


//logia para compartir url
//?categoria=mantenimiento&id=producto_647_40_18_412026

export async function compartir(id) {
  const url = new URL(window.location.href);

  // setea o reemplaza el id
  url.searchParams.set("id", id);

  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Mirá este link 👇",
        url: url.toString()
      });
    } catch {
      console.log("Compartir cancelado");
    }
  } else {
    navigator.clipboard.writeText(url.toString());
    alert("Link copiado al portapapeles 📋");
  }
}
