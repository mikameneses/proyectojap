document.addEventListener('DOMContentLoaded', function() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cartProducts.length > 0) {
        cartProducts.forEach((product, index) => {
            const productHtml = `
                <div>
                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 100px;">
                    <p>Nombre: ${product.name}</p>
                    <p>Costo: ${product.cost} ${product.currency}</p>
                    <p>Cantidad: <input type="number" value="${product.quantity}" data-index="${index}"></p>
                    <p>Subtotal: <span class="subtotal">${product.cost * product.quantity} ${product.currency}</span></p>
                </div>
            `;

            cartContainer.innerHTML += productHtml;
        });

        // Actualizar subtotal al cambiar cantidad
        cartContainer.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', function() {
                const index = this.getAttribute('data-index');
                cartProducts[index].quantity = parseInt(this.value);
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

                const newSubtotal = cartProducts[index].cost * cartProducts[index].quantity;
                this.parentElement.querySelector('.subtotal').textContent = `${newSubtotal} ${cartProducts[index].currency}`;
            });
        });
    } else {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
});
