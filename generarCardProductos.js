const owner = "AdrianBenitezDev";
const repo = "gmmotorepuestosBackend";

async function cargarProductos(id) {
    let apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/categorias/${categoriasTextos[id]}`;
    
    const res = await fetch(apiURL);
    console.log("res:")
    
    const archivos = await res.json();
    console.log(archivos)

    let contenedor = document.getElementById("CategoriaAndProductos");
    contenedor.innerHTML = ""; // limpiar antes

    // --------------------------------------------
    // ------------ cabecera de categoria----------
    // --------------------------------------------

    document.getElementById("categoriaSeleccionada").innerHTML=`
    
    <h3>Categoria: ${categoriasTextos[id]}</h3>
    
    `;            
    // --------------------------------------------
    // ------------ FIN de categoria --------------
    // --------------------------------------------

    archivos.forEach(archivo => {
        if (archivo.name.endsWith(".html")) {
            
            // crear card
            const card = document.createElement("div");
            card.className = "card row";
            card.innerHTML = `

                
            <img style="width:100px; height:100px; overflow:visible;" src="https://raw.githubusercontent.com/${owner}/${repo}/main/categorias/${categoriasTextos[id]}/${archivo.name.replace(".html","").replace("prod_","imagen_0_")}.jpg">


                <h3>${archivo.name.replace(".html","")}</h3>
                <button onclick="mostrarProducto('${archivo.download_url}')">
                    Ver producto
                </button>
            `;

            contenedor.appendChild(card);
        }
    });
}
function mostrarProducto(url) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById("visorProducto").innerHTML = html;

            document.getElementById("visorProducto")
                .scrollIntoView({ behavior: "smooth", block: "start" });
        });
}

// cargarProductos();

