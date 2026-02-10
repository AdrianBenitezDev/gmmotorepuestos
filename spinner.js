export function spinnerBusqueda(boleano){
  console.log("spinnerBusqueda:")
  console.log(boleano)


    let spin=document.getElementById("overlayBusqueda")
    if(boleano){
        spin.style.display="flex";
        console.log("colocamos flex en spinnerBusqueda")
    }else{
      console.log("colocamos none en spinnerBusqueda")
         spin.style.display="none";
    }
}


// ====== SPINNER ======
export function spinFalse() {
   console.log("ESPINER: none")
  document.getElementById('overlay').style.display = "none";
}
export function spinTrue() {
  
   console.log("ESPINER: flex")
  document.getElementById('overlay').style.display = "flex";
}
