document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('id');

    if (productId) {
        const apiUrl = ⁠ 'https://japceibal.github.io/emercado-api/products/${productId}.json' ⁠;

        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                document.getElementById('product-name').textContent = producto.name;
document.getElementById('category').textContent = ⁠ Categoría: ${producto.category} ⁠;
                document.getElementById('description').textContent = producto.description;
                document.getElementById('sold-count').textContent = ⁠ Vendidos: ${producto.soldCount} ⁠;
                document.getElementById('main-img').src = producto.images[0];

                const buyButton = document.getElementById('buyButton');
                buyButton.addEventListener('click', function() {
                    const product = {
                        name: producto.name,
                        cost: producto.cost,
                        currency: producto.currency,
                        quantity: 1,
                        image: producto.images[0]
                    };

                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = 'cart.html';
                });
            })
            .catch(error => console.error('Error al obtener los datos del producto:', error));
    } else {
        console.error('Producto no encontrado en localStorage');
    }
});
