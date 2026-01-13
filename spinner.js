function spinnerBusqueda(boleano){
    let spin=document.getElementById("overlayBusqueda")
    if(boleano){
        spin.style.display="block";
    }else{
         spin.style.display="none";
    }
}


// ====== SPINNER ======
function spinFalse() {
  document.getElementById('overlay').style.display = "none";
}
function spinTrue() {
  document.getElementById('overlay').style.display = "flex";
}
