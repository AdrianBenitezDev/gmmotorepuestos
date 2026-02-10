export function spinnerBusqueda(boleano){
    let spin=document.getElementById("overlayBusqueda")
    if(boleano){
        spin.style.display="block";
    }else{
         spin.style.display="none";
    }
}


// ====== SPINNER ======
export function spinFalse() {
  document.getElementById('overlay').style.display = "none";
}
export function spinTrue() {
  document.getElementById('overlay').style.display = "flex";
}
