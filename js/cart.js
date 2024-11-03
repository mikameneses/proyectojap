document.addEventListener('DOMContentLoaded', function() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElem = document.getElementById('total-price');
    
    function calculateTotal() {
        let total = 0;
        cartProducts.forEach(product => {
            total += product.cost * product.quantity;
        });
        totalPriceElem.textContent = total;
    }

    cartContainer.innerHTML = '';

    if (cartProducts.length > 0) {
        cartProducts.forEach((product, index) => {
            const productHtml = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    <div class="cart-details">
                        <p><strong>Nombre:</strong> ${product.name}</p>
                        <p><strong>Costo:</strong> ${product.cost} ${product.currency}</p>
                        <p><strong>Cantidad:</strong> 
                            <input type="number" value="${product.quantity}" min="1" data-index="${index}" style="width: 60px;">
                        </p>
                        <p><strong>Subtotal:</strong> 
                            <span class="subtotal">${product.cost * product.quantity}</span> ${product.currency}
</p>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += productHtml;
        });

        cartContainer.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', function() {
                const index = this.getAttribute('data-index');
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    cartProducts[index].quantity = newQuantity;
                    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

                    const newSubtotal = cartProducts[index].cost * cartProducts[index].quantity;
                    this.parentElement.querySelector('.subtotal').textContent = newSubtotal;

                    calculateTotal();
                }
            });
        });

        calculateTotal();
    } else {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
});

