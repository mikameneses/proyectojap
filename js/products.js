window.onload = function() {
    const categoriaId = localStorage.getItem('catID'); // Recupera catID del almacenamiento local
    const url = `https://japceibal.github.io/emercado-api/products/${categoriaId}.json`; // Forma URL con catID

let products = []; // Variable global para almacenar los productos

// Función que se ejecuta una vez que toda la página ha sido cargada.
window.onload = function() {

    // Llamada a la función para obtener los datos del JSON
    getJSONData(url).then(data => {
        // Verificamos si el estatus de la respuesta es 'ok'
        if (data.status === 'ok') {
            // Obtenemos los productos desde el JSON
            products = data.data.products;

            // Renderizamos los productos inicialmente
            renderProducts(products);
        } else {
            // Si hay un error al obtener los datos, muestra un mensaje de error.
            document.getElementById('products-container').innerText = 'Error fetching data';
        }
    });

    // Muestra el nombre de usuario almacenado en localStorage
    var username = localStorage.getItem("username");
    if (username) {
        document.getElementById("userDisplay").textContent = username;
    }

    // Filtro por rango de precios
    document.getElementById("filterBtn").addEventListener("click", function() {
        let minPrice = parseInt(document.getElementById("minPrice").value) || 0;
        let maxPrice = parseInt(document.getElementById("maxPrice").value) || Infinity;
        let filteredProducts = products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
        renderProducts(filteredProducts);
    });

    // Limpiar filtros
document.getElementById("clearRangeFilter").addEventListener("click", function() {
    // Limpiar los valores de los campos de rango de precios
    document.getElementById("rangeFilterCountMin").value = '';
    document.getElementById("rangeFilterCountMax").value = '';
    
    // Mostrar todos los productos nuevamente
    renderProducts(products);
});

    // Orden ascendente por precio
    document.getElementById("sortPriceAsc").addEventListener("click", function() {
        let sortedProducts = [...products].sort((a, b) => a.cost - b.cost);
        renderProducts(sortedProducts);
    });

    // Orden descendente por precio
    document.getElementById("sortPriceDesc").addEventListener("click", function() {
        let sortedProducts = [...products].sort((a, b) => b.cost - a.cost);
        renderProducts(sortedProducts);
    });

    // Orden descendente por relevancia (cantidad de vendidos)
    document.getElementById("sortRelevanceDesc").addEventListener("click", function() {
        let sortedProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);
        renderProducts(sortedProducts);
    });
};

// Función para renderizar productos
function renderProducts(productsList) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiamos el contenedor antes de renderizar

    // Iteramos sobre cada producto en la lista de productos.
    productsList.forEach(product => {
        // Creamos un nuevo elemento div para cada producto.
        const productDiv = document.createElement('div');
        // Asignamos clases Bootstrap para el diseño
        productDiv.className = 'col-md-4'; 

        // Establecemos el contenido HTML del div del producto.
        // Usamos una tarjeta card de Bootstrap 
        productDiv.innerHTML = `
            <div class="card mb-4 shadow-sm custom-card cursor-active" id="${product.id}">
                <img class="bd-placeholder-img card-img-top" src="${product.image}" alt="${product.name}" style="width: 100%;">
                <div class="card-body">
                    <h2 class="m-3">${product.name}</h2>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Precio: ${product.currency} ${product.cost}</p>
                    <p class="card-text">Vendidos: ${product.soldCount}</p>
                </div>
            </div>
        `;

        // Añadimos el div de producto creado al contenedor principal en el DOM.
        container.appendChild(productDiv);
    });
}
