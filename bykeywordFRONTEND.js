fetch(`https://us-central1-gmmotorepuestos-ventas.cloudfunctions.net/getProductosByKeyword?key=farol&limit=10`)
  .then(r => r.json())
  .then(d => console.log(d.productos));
