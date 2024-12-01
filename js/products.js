window.onload = function() {
    // Recupera el catID y catName del almacenamiento local
    const categoriaId = localStorage.getItem("catID"); 
    const categoriaName = localStorage.getItem("catName");

      if (categoriaName) {
        document.querySelector("h1").textContent = catName;
    }

    // Comprueba que tienes un catID válido
    if (categoriaId) {
        import { PRODUCTS_URL } from './init.js';
        const url =  '${PRODUCTS_URL}${categoriaId}.json'⁠;


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
}
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
          // Añadir un event listener para que al hacer clic en el producto se llame a seleccionarProducto
          productDiv.addEventListener('click', () => seleccionarProducto(product.id));

        // Añadimos el div de producto creado al contenedor principal en el DOM.
        container.appendChild(productDiv);
    });
}
    // Función para seleccionar el producto
function seleccionarProducto(id) {
    localStorage.setItem('id', id); // Guarda el ID del producto en localStorage
    window.location.href = 'product-info.html'; // Redirige a la página de detalles del producto
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const productsContainer = document.getElementById('products-container');
    
    searchInput.addEventListener('input', function() {
        const searchQuery = this.value.toLowerCase();
        const productItems = productsContainer.getElementsByClassName('product-item');

        for (let product of productItems) {
            const title = product.dataset.title.toLowerCase();
            const description = product.dataset.description.toLowerCase();

            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                product.style.display = ''; // Mostrar producto
            } else {
                product.style.display = 'none'; // Ocultar producto
            }
        }
    });

});
