export function spinnerBusqueda(boleano){
  console.log("ESPINER: "+boleano)
    let spin=document.getElementById("overlayBusqueda")
    if(boleano){
        spin.style.display="flex";
    }else{
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
