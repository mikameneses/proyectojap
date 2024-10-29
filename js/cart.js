document.addEventListener('DOMContentLoaded', function() {
       const storedProduct = localStorage.getItem('selectedProduct');

       
       
       if (storedProduct) {
           const product = JSON.parse(storedProduct);
           // Logica aquí para mostrar el producto en el carrito
           const cartContainer = document.getElementById('cart-container');
                document.getElementById('empty-cart-message').style.display = 'none';
           cartContainer.innerHTML = `
            <div class="d-flex align-items-center mb-3">
               <img src="${product.image}" alt="${product.name}" class="img-thumbnail me-3" style="width: 100px;">
               <div>
                   <p>Nombre: ${product.name}</p>
                   <p>Costo: ${product.cost} ${product.currency}</p>
                   <p>Cantidad: <input type="number" value="${product.quantity}"></p>
                   <p>Subtotal: ${product.cost * product.quantity} ${product.currency}</p>
               </div>
         </div>
       `;
});
