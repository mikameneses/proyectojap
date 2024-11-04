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
                <p>Cantidad: <input type="number" value="${product.quantity}" id="quantity"></p>
                <p>Subtotal: <span id="subtotal">${product.cost * product.quantity}</span> ${product.currency}</p>
            </div>
        `;

        const quantityInput = document.getElementById('quantity');
        const subtotalElement = document.getElementById('subtotal');

        quantityInput.addEventListener('input', function() {
            const quantity = parseInt(this.value);
            subtotalElement.textContent = product.cost * quantity;
        });
    }
});
 ⁠

