document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto guardado en localStorage
    const productId = localStorage.getItem('id');

    if (productId) {
        cargarProductoDesdeAPI(productId); // Llamamos a la función para cargar datos del producto
    } else {
        console.error('Producto no encontrado en localStorage');
    }

    // Función para cargar el producto desde la API
    function cargarProductoDesdeAPI(productId) {
        const apiUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
        const commentsApiUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

        // Solicitud a la API para obtener los datos del producto
        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                // Actualizar los detalles del producto en la página
                document.getElementById('product-name').textContent = producto.name;
                document.getElementById('category').textContent = `Categoría: ${producto.category}`;
                document.getElementById('description').textContent = `Descripción: ${producto.description}`;
                document.getElementById('sold').textContent = `Vendidos: ${producto.soldCount}`;
                
                // Actualizar la imagen principal
                const mainImage = document.querySelector('.main-image img');
                mainImage.src = producto.images[0]; // Primera imagen como imagen principal

                // Limpiar miniaturas anteriores y generar nuevas
                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = '';
                producto.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = `Imagen miniatura ${index + 1}`;
                    imgElement.addEventListener('click', () => {
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });

        // Solicitud a la API para obtener los comentarios
        fetch(commentsApiUrl)
            .then(response => response.json())
            .then(comentarios => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = '';
                comentarios.forEach(comentario => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <p><strong>Usuario:</strong> ${comentario.user}</p>
                        <p><strong>Calificación:</strong> ${comentario.score} estrellas</p>
                        <p><strong>Comentario:</strong> ${comentario.description}</p>
                        <p><strong>Fecha:</strong> ${comentario.dateTime}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    }

    // Listener para los productos relacionados
    document.getElementById('related-products-list').addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'A') {
            e.preventDefault(); // Prevenir redirección
            const productId = e.target.getAttribute('data-product-id');

            // Guardar el nuevo productId en localStorage
            localStorage.setItem('id', productId);

            // Recargar los datos del nuevo producto desde la API
            cargarProductoDesdeAPI(productId);
        }
    });

    // Solicitud para las estrellas
    const stars = document.querySelectorAll(".star");
    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            for (let i=0; i<=index; i++) {
                stars[i].classList.add("checked");
            }
            for (let i=index+1; i<stars.length; i++) {
                stars[i].classList.remove("checked");
            }
        });
    });
});
