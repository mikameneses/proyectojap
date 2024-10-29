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
  // Actualizar subtotal cuando se cambie la cantidad
       document.getElementById('quantity-input').addEventListener('input', function(event) {
           const newQuantity = parseInt(event.target.value);
           const newSubtotal = newQuantity * product.cost;
           document.getElementById('subtotal').textContent = `${newSubtotal}`;

           // Actualizar cantidad y subtotal en localStorage
           product.quantity = newQuantity;
           product.subtotal = newSubtotal;
           localStorage.setItem('selectedProduct', JSON.stringify(product));
       });
   } else {
       // Mostrar mensaje si no hay productos en el carrito
       document.getElementById('empty-cart-message').textContent = 'No hay productos en el carrito';
   }
});
