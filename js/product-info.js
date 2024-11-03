[3/11/24, 7:04:21 p. m.] Clovis: document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('id');

    if (productId) {
        const apiUrl = ⁠ https://japceibal.github.io/emercado-api/products/${productId}.json ⁠;
        const commentsApiUrl = ⁠ https://japceibal.github.io/emercado-api/products_comments/${productId}.json ⁠;

        fetch(apiUrl)
            .then(response => response.json())
            .then(product => {
                actualizarVistaProducto(product);
                asignarBotonComprar(product);
                mostrarProductosRelacionados(product.relatedProducts);
            })
            .catch(error => console.error('Error al obtener los datos del producto:', error));

        fetch(commentsApiUrl)
            .then(response => response.json())
            .then(comments => {
                mostrarComentarios(comments);
            })
            .catch(error => console.error('Error al obtener los comentarios:', error));
    } else {
        console.error('Producto no encontrado en localStorage');
    }

    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("checked");
            }
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove("checked");
            }
        });
    });
});

function actualizarVistaProducto(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('category').textContent = ⁠ Categoría: ${product.category} ⁠;
    document.getElementById('description').textContent = product.description;
    document.getElementById('sold-count').textContent = product.soldCount;

    const mainImage = document.querySelector('.main-image img');
    mainImage.src = product.images[0];

    const thumbnailsContainer = document.querySelector('.product-images');
    thumbnailsContainer.innerHTML = '';

    product.images.forEach((imagen, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imagen;
        imgElement.alt = ⁠ Imagen miniatura ${index + 1} ⁠;
        imgElement.style.cursor = 'pointer';
        imgElement.addEventListener('click', () => {
            mainImage.src = imagen;
        });
        thumbnailsContainer.appendChild(imgElement);
    });
}

function mostrarProductosRelacionados(relatedProducts) {
    const relatedProductsContainer = document.getElementById('related-products-container');
    relatedProductsContainer.innerHTML = '';

    relatedProducts.forEach(product => {
        const productHTML = `
            <div class="col-md-4">
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

function mostrarComentarios(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
[3/11/24, 7:04:22 p. m.] Clovis: comments.forEach(comment => {
        const starsHtml = renderStars(comment.score);
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p><strong>Usuario:</strong> ${comment.user}</p>
            <p><strong>Calificación:</strong> ${starsHtml} </p>
            <p><strong>Comentario:</strong> ${comment.description}</p>
            <p><strong>Fecha:</strong> ${comment.dateTime}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

function asignarBotonComprar(product) {
    document.getElementById('buyButton').addEventListener('click', function () {
        const newProduct = {
            id: product.id,
            name: product.name,
            unitCost: product.cost,
            currency: product.currency,
            count: 1,
            image: product.images[0]
        };

        let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        cartProducts.push(newProduct);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

        window.location.href = 'cart.html';
    });
}

function renderStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= score ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
    }
    return stars;
}
