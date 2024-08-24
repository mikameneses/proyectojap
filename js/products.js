const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

// Función que se ejecuta una vez que toda la página ha sido cargada.
window.onload = function() {

    // Llamada a la función
    getJSONData(url).then(data => {

        // Verificamos si el estatus de la respuesta es 'ok' para asegurar que los datos fueron obtenidos correctamente.
        if (data.status === 'ok') {
            // Obtenemos los productos
            const products = data.data.products;

            // Obtenemos el contenedor en el DOM donde se mostrarán los productos.
            const container = document.getElementById('products-container');

            // Iteramos sobre cada producto en la lista de productos.
            products.forEach(product => {

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
                            <p class="card-text">Price: ${product.currency} ${product.cost}</p>
                            <p class="card-text">Sold: ${product.soldCount}</p>
                        </div>
                    </div>
                `;

                // Añadimos el div de producto creado al contenedor principal en el DOM.
                container.appendChild(productDiv);
            });
        } else {
            // Si hay un error al obtener los datos, muestra un mensaje de error.
            document.getElementById('products-container').innerText = 'Error fetching data';
        }
    });
}
