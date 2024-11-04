document.addEventListener('DOMContentLoaded', function() {
    const storedProduct = localStorage.getItem('selectedProduct');

    if (storedProduct) {
        const product = JSON.parse(storedProduct);
        const cartContainer = document.getElementById('cart-container');
        
        cartContainer.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 100px;">
                <p>Nombre: ${product.name}</p>
                <p>Costo: ${product.cost} ${product.currency}</p>
                <p>Cantidad: <input type="number" value="${product.quantity}" id="quantity" /></p>
                <p>Subtotal: <span id="subtotal">${product.cost * product.quantity}</span> ${product.currency}</p>
            </div>
        `;

        // Actualizar subtotal en tiempo real
        document.getElementById('quantity').addEventListener('input', function() {
            const quantity = this.value;
            document.getElementById('subtotal').textContent = product.cost * quantity;
        });
    }
});

