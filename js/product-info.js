// Función para obtener productos de la API
async function obtenerProductos(categoriaId) {
    const url = `https://japceibal.github.io/emercado-api/products/${categoriaId}.json`;
    try {
        let response = await fetch(url);
        let productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Función para mostrar productos con el evento onClick
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = ''; // Limpiar productos anteriores
    productos.forEach(producto => {
        // Cada producto tiene el evento onClick que guarda su id en el localStorage
        contenedorProductos.innerHTML += `
            <div class="producto" onclick="guardarProductoEnLocalStorage(${producto.id})">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p>Precio: ${producto.cost} ${producto.currency}</p>
                <img src="${producto.images[0]}" alt="${producto.name}" width="200" />
            </div>
        `;
    });
}

// Función para guardar el ID del producto en localStorage
function guardarProductoEnLocalStorage(id) {
    localStorage.setItem("productoSeleccionado", id.toString());
    console.log(`Producto con ID ${id} guardado en el localStorage`);
}
