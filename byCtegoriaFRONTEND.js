

fetch(`https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductosByCategoria?categoria=${encodeURIComponent(cat)}`)
  .then(r => r.json())
  .then(d => console.log(d.productos));
