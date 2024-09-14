window.onload = function() {
    // Recupera el catID del almacenamiento local
    const categoriaId = localStorage.getItem("catID"); 

    // Comprueba que tienes un catID válido
    if (categoriaId) {
        // Construye la URL usando comillas invertidas para la interpolación
        const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;


    let products = []; // Variable global para almacenar los productos

    // Llamada a la función para obtener los datos del JSON
    getJSONData(url).then(data => {
        if (data.status === 'ok') {
            products = data.data.products;
            renderProducts(products);
        } else {
            document.getElementById('products-container').innerText = 'Error fetching data';
        }
    });

    // Mostrar el nombre de usuario almacenado en localStorage
    const username = localStorage.getItem("username");
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
        document.getElementById("minPrice").value = '';
        document.getElementById("maxPrice").value = '';
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
    container.innerHTML = '';

    productsList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4'; 

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
