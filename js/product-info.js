function renderStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += (i <= score) ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
    }
    return stars;
}

document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('id');
    if (productId) {
        const apiUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
        const commentsApiUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('product-name').textContent = data.name;
                document.getElementById('category').textContent = data.category;
                document.getElementById('description').textContent = data.description;
                document.getElementById('sold').textContent = data.soldCount;
                document.getElementById('price').textContent = data.cost;
                document.getElementById('product-currency').textContent = data.currency;

                const mainImage = document.querySelector('#main-image');
                mainImage.src = data.images[0];

                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = '';
                data.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = `Imagen miniatura ${index + 1}`;
                    imgElement.addEventListener('click', () => {
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });

                showRelatedProducts(data.relatedProducts);
            })
            .catch(error => console.error('Error al obtener los datos del producto:', error));

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

        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        }

        const themeSwitch = document.getElementById("theme-switch");
        if (themeSwitch) {
            themeSwitch.checked = (theme === "dark");
            themeSwitch.addEventListener("change", function () {
                document.body.classList.toggle("dark-mode", this.checked);
                localStorage.setItem("theme", this.checked ? "dark" : "light");
            });
        }
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
            localStorage.setItem("rating", index + 1);
        });
    });

    const savedRating = localStorage.getItem("rating");
    if (savedRating) {
        for (let i = 0; i < savedRating; i++) {
            stars[i].classList.add("checked");
        }
    }

    const buyButton = document.querySelector(".boton");
    if (buyButton) {
        buyButton.addEventListener("click", saveProductToLocalStorage);
    }
});

function showRelatedProducts(relatedProducts) {
    const relatedProductsContainer = document.getElementById('related-products-container');
    relatedProductsContainer.innerHTML = '';

    relatedProducts.forEach(product => {
        const productHTML = `
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

function saveProductToLocalStorage() {
    const productName = document.querySelector("#product-name").textContent;
    const productDescription = document.querySelector("#description").textContent;
    const productPrice = document.querySelector("#price")?.textContent || "0";
    const productImage = document.querySelector("#main-image").src;
    const prodID = localStorage.getItem("id");

    const product = {
        id: prodID,
        name: productName,
        description: productDescription,
        price: productPrice,
        currency: document.getElementById('product-currency').textContent,
        image: productImage,
        quantity:1
    };

    let existingProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const productExists = existingProducts.some(existingProduct => existingProduct.id === product.id);

    if (productExists) {
        alert("El producto ya está en el carrito.");
    } else {
        existingProducts.push(product);
        localStorage.setItem("selectedProducts", JSON.stringify(existingProducts));
        window.location.href = "cart.html";
        actualizarBadgeCarrito();
    }
}

