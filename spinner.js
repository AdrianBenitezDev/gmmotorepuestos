function spinnerBusqueda(boleano){
    let spin=document.getElementById("overlayBusqueda")
    if(boleano){
        spin.style.display="block";
    }else{
         spin.style.display="none";
    }
}