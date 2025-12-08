const owner = "AdrianBenitezDev";
const repo = "gmmotorepuestosBackend";

async function cargarProductos(id) {
    let apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/categorias/${categoriasTextos[id]}`;
    const res = await fetch(apiURL);
    const archivos = await res.json();

    let contenedor = document.getElementById("CategoriaAndProductos");
    contenedor.innerHTML = ""; // limpiar antes

    archivos.forEach(archivo => {
        if (archivo.name.endsWith(".html")) {
            
            // crear card
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
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
    document.getElementById("visorProducto").src = url;
    // Hacer scroll suave hacia el visor
    const visor = document.getElementById("visorProducto");

    visor.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// cargarProductos();

