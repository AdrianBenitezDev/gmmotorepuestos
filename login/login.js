async function  logear(){
    let user=document.getElementById("user").value;
    let pass=document.getElementById("pass").value;
    let direccionUrl="https://script.google.com/macros/s/AKfycbx-YwE7fkQKIyiQV13JPs0iIxRWw-nohtciTnR0Gb2G_ef6qtWSHSDEro_ipWeiBnTtKg/exec";


  let resp= await fetch(direccionUrl,{
        method:'POST', headers: {
    "Content-Type": "text/plain"  // 👈 TRUCO CLAVE: NO HAY OPTIONS
  },
  body: JSON.stringify({"type":"login","usuario":user,"contra":pass})
    })
    
     const texto = await resp.text(); // <-- aquí está la respuesta REAL
  if(texto!=="DATOS ERRONEOS"){
    window.location.href = texto;
  }else{
    alert("Error en las credenciales")
  };
}