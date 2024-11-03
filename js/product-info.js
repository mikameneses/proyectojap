document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('id');

    if (productId) {
        const apiUrl = ⁠ https://japceibal.github.io/emercado-api/products/${productId}.json ⁠;
        const commentsApiUrl = ⁠ https://japceibal.github.io/emercado-api/products_comments/${productId}.json ⁠;

        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                document.getElementById('product-name').textContent = producto.name;
                document.getElementById('category').textContent = ⁠ Categoría: ${producto.category} ⁠;
                document.getElementById('description').textContent = ⁠ Descripción: ${producto.description} ⁠;
                document.getElementById('sold').textContent = ⁠ Vendidos: ${producto.soldCount} ⁠;

                const mainImage = document.querySelector('.main-image img');
                mainImage.src = producto.images[0];

                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = '';

                producto.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = ⁠ Imagen miniatura ${index + 1} ⁠;
                    imgElement.addEventListener('click', () => {
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });
        
                showRelatedProducts(producto.relatedProducts);

                // Mover aquí la asignación del event listener del botón Comprar para que producto esté definido
                document.getElementById('buyButton').addEventListener('click', function() {
                    const newProduct = {
                        id: producto.id,
                        name: producto.name,
                        cost: producto.cost,
                        currency: producto.currency,
                        quantity: 1,
                        image: producto.images[0]
                    };

                    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
                    cartProducts.push(newProduct);
                    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

                    window.location.href = 'cart.html';
                });
            })
            .catch(error => console.error('Error al obtener los datos del producto:', error));

        function showRelatedProducts(relatedProducts) {
            const relatedProductsContainer = document.getElementById('related-products-container');
            relatedProductsContainer.innerHTML = ''; 

            relatedProducts.forEach(product => {
                let productHTML = `
                    <div class="col-md-5">
                        <div class="card mb-3 shadow-sm">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
</div>
                    </div>
                `;
                relatedProductsContainer.innerHTML += productHTML;
            });

            relatedProductsContainer.querySelectorAll('.card').forEach((card, index) => {
                card.addEventListener('click', () => {
                    localStorage.setItem('id', relatedProducts[index].id);
                    window.location.href = 'product-info.html';
                });
            });
        }

        fetch(commentsApiUrl)
            .then(response => response.json())
            .then(comentarios => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = '';

                comentarios.forEach(comentario => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    const starsHtml = renderStars(comentario.score);
                    
                    commentElement.innerHTML = `
                        <p><strong>Usuario:</strong> ${comentario.user}</p>
                        <p><strong>Calificación:</strong> ${starsHtml} </p>
                        <p><strong>Comentario:</strong> ${comentario.description}</p>
                        <p><strong>Fecha:</strong> ${comentario.dateTime}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error al obtener los comentarios:', error));
    } else {
        console.error('Producto no encontrado en localStorage');
    }

    const stars = document.querySelectorAll(".star");
    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("checked");
            }
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove("checked");
            }
        });
    });
});



