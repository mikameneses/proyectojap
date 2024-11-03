document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});

function renderizarCarrito() {
    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
        console.error("Elemento con ID 'cart-items' no encontrado.");
        return;
    }

    const products = JSON.parse(localStorage.getItem("selectedProducts"))  [];
    cartContainer.innerHTML = "";

    let total = 0; // Variable para acumular el subtotal de todos los productos

    if (products.length === 0) {
        cartContainer.innerHTML = "<p>No hay ningún producto en el carrito.</p>";
    } else {
        products.forEach(product => {
            const price = Number(product.price)  0;
            const quantity = Number(product.quantity) || 1;
            const subtotal = calcularSubtotal(price, quantity);

            total += subtotal; // Sumar el subtotal de cada producto al total

            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");
productElement.innerHTML = 
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="cost">Costo: UYU ${product.price}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="actualizarCantidad('${product.name}', -1)">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn" onclick="actualizarCantidad('${product.name}', 1)">+</button>
                    </div>
                    <p class="subtotal">Subtotal: UYU ${subtotal}</p>
                    <a href="#" class="remove-link" onclick="eliminarProducto('${product.name}')">Eliminar</a>
                </div>
            ;

            cartContainer.appendChild(productElement);
        });

        // Crear un elemento para mostrar el total
        const totalElement = document.createElement("div");
        totalElement.classList.add("cart-total");
        totalElement.innerHTML = <h3>Total: UYU ${total}</h3>;
        cartContainer.appendChild(totalElement);
    }
}
// Función para calcular el subtotal de un producto
function calcularSubtotal(price, quantity) {
    return price * quantity;
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(nombreProducto, cambio) {
    const products = JSON.parse(localStorage.getItem("selectedProducts"))  [];
    const product = products.find(p => p.name === nombreProducto);

    if (product) {
        // Actualizar la cantidad
        product.quantity = (product.quantity  1) + cambio;

        // Asegurar que la cantidad no sea menor que 1
        if (product.quantity < 1) {
            product.quantity = 1;
        }

        // Calcular el nuevo subtotal
        product.subtotal = calcularSubtotal(product.price, product.quantity);

        // Guardar los cambios en localStorage
        localStorage.setItem("selectedProducts", JSON.stringify(products));

        // Renderizar el carrito nuevamente
        renderizarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombreProducto) {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = products.filter(p => p.name !== nombreProducto);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    renderizarCarrito();
}
    renderizarCarrito();
;
