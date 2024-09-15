document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto guardado en localStorage
    const productId = localStorage.getItem('id');

    if (productId) {
        // Dirección de la API
        const apiUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

        // Realizar la solicitud a la API para obtener los datos del producto
        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                // Aquí accedemos al producto que está dentro de la propiedad "products" del JSON

                // Actualizar los detalles del producto en la página
                document.getElementById('product-name').textContent = producto.name;
                document.getElementById('category').textContent = `Categoría: ${producto.category}`;
                document.getElementById('description').textContent = `Descripción: ${producto.description}`;
                document.getElementById('sold').textContent = `Vendidos: ${producto.soldCount}`;

                // Actualizar la imagen principal
                const mainImage = document.querySelector('.main-image img');
                mainImage.src = producto.images[0]; // Primera imagen como imagen principal

                // Limpiar cualquier miniatura anterior
                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = ''; // Limpiar las miniaturas previas

                // Generar dinámicamente las miniaturas
                producto.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = `Imagen miniatura ${index + 1}`;
                    imgElement.addEventListener('click', () => {
                        // Cambiar la imagen principal al hacer clic en la miniatura
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });
    } else {
        console.error('Producto no encontrado en localStorage');
    }
});
