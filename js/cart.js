document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
    actualizarTotales(); // Inicializar los totales
    actualizarBadgeCarrito(); // Llamada para que el badge refleje el estado inicial
});

function renderizarCarrito() {
    const cartContainer = document.getElementById("cart-items");

    // Verificar si el contenedor existe
    if (!cartContainer) {
        console.error("Elemento con ID 'cart-items' no encontrado.");
        return;
        actualizarBadgeCarrito();
    }
   

    // Obtener los productos del carrito desde el localStorage
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Limpiar el contenido antes de renderizar
    cartContainer.innerHTML = ""; 

    // Verificar si hay productos en el carrito
    if (products.length === 0) {
        // Si no hay productos, mostrar un mensaje de carrito vacío
        cartContainer.innerHTML = "<p>No hay ningún producto en el carrito.</p>";
    } else {
        products.forEach(product => {
            const price = Number(product.price) || 0;
            const quantity = Number(product.quantity) || 1; // Cantidad predeterminada
            const subtotal = calcularSubtotal(price, quantity);
            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="cost">Costo:  ${product.currency} ${product.price} </p> 
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="actualizarCantidad('${product.name}', -1)">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn" onclick="actualizarCantidad('${product.name}', 1)">+</button>
                    </div>
                    <p class="subtotal-uyu">Subtotal: ${product.currency} ${subtotal}</p>
                    <a href="#" class="remove-link" onclick="eliminarProducto('${product.name}')">Eliminar</a>
                </div>
            `;

            cartContainer.appendChild(productElement);
        });
    }

    // Actualizar el badge después de renderizar
    actualizarBadgeCarrito();
    // Actualizar los totales después de renderizar
    actualizarTotales();
}

// Función para calcular el subtotal de un producto
function calcularSubtotal(price, quantity) {
    return price * quantity;
}

function actualizarTotales() {

    const subtotalUYUElement = document.getElementById('subtotal-uyu');
    const subtotalUSDElement = document.getElementById('subtotal-usd');

    if (subtotalUYUElement) {
        subtotalUYUElement.innerHTML = `Subotal en UYU: <strong>${totales.subtotalUYU}</strong>`;

    } else {
        console.error("Elemento 'subtotal-uyu' no encontrado en el DOM.");
    }

    if (subtotalUSDElement) {
        totalUSDElement.innerHTML = `Subotal en USD: <strong>${totales.totalUSD}</strong>`;
    } else {
        console.error("Elemento 'total-usd' no encontrado en el DOM.");
    }

    }

// Función para actualizar la cantidad de un producto
function actualizarCantidad(nombreProducto, cambio) {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const product = products.find(p => p.name === nombreProducto);

    if (product) {
        product.quantity = (product.quantity || 1) + cambio;
        if (product.quantity < 1) product.quantity = 1;
        localStorage.setItem("selectedProducts", JSON.stringify(products));
        renderizarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombreProducto) {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = products.filter(p => p.name !== nombreProducto);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    renderizarCarrito();
    actualizarBadgeCarrito();
}


// Función para actualizar el badge del carrito
function actualizarBadgeCarrito() {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const totalProducts = products.reduce((total, product) => total + (product.quantity), 0);
    
    const badge = document.getElementById("badge-carrito"); 
    if (badge) {
        badge.innerText = totalProducts; // Actualizar el contenido del badge
    }
}

function calcularTotalesPorMoneda() {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    
    let totalUYU = 0;
    let totalUSD = 0;

    products.forEach(product => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 1;
        const subtotal = price * quantity;

        if (product.currency === 'UYU') {
            totalUYU += subtotal;
        } else if (product.currency === 'USD') {
            totalUSD += subtotal;
        }
    });

    return { totalUYU, totalUSD };
}

function actualizarTotales() {
    const totales = calcularTotalesPorMoneda();

    const totalUYUElement = document.getElementById('total-uyu');
    const totalUSDElement = document.getElementById('total-usd');

    if (totalUYUElement) {
        totalUYUElement.innerHTML = `Total en UYU: <strong>${totales.totalUYU}</strong>`;

    } else {
        console.error("Elemento 'total-uyu' no encontrado en el DOM.");
    }

    if (totalUSDElement) {
        totalUSDElement.innerHTML = `Total en USD: <strong>${totales.totalUSD}</strong>`;
    } else {
        console.error("Elemento 'total-usd' no encontrado en el DOM.");
    }

    }

// Variables para el cálculo de costos
let subtotal = 0;  // Subtotal inicial de los productos
let shippingCost = 0;
let total = 0;

function calcularTotalesPorMoneda() {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    
    let totalUYU = 0;
    let totalUSD = 0;

    products.forEach(product => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 1;
        const subtotal = price * quantity;

        if (product.currency === 'UYU') {
            totalUYU += subtotal;
        } else if (product.currency === 'USD') {
            totalUSD += subtotal;
        }
    });

    return { totalUYU, totalUSD };
}

// Función para calcular el subtotal de los productos en el carrito
function calcularSubtotal() {
  const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
  subtotal = products.reduce((acc, product) => {
    const price = Number(product.price) || 0;
    const quantity = Number(product.quantity) || 1;
    return acc + (price * quantity);
  }, 0);
}

// Función para actualizar los costos
function updateCosts() {
  // Recalcular el subtotal antes de calcular el costo total
  calcularSubtotal();

  // Cálculo del costo de envío según opción seleccionada
  const shippingPercentage = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value || 0);
  shippingCost = subtotal * shippingPercentage;
  total = subtotal + shippingCost;

  // Actualizar el DOM con los valores de costos
  document.getElementById("subtotal").innerText = `Subtotal: $${subtotal.toFixed(2)}`;
  document.getElementById("costo-envio").innerText = `Costo de envío: $${shippingCost.toFixed(2)}`;
  document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;
}

// Eventos para actualizar costos cada vez que se selecciona un tipo de envío
document.querySelectorAll('input[name="shipping"]').forEach(option => {
  option.addEventListener('change', updateCosts);
});

// Función para validar y finalizar compra
function finalizarCompra() {
  // Validaciones de campos
  const departamento = document.getElementById("departamento").value;
  const localidad = document.getElementById("localidad").value;
  const calle = document.getElementById("calle").value;
  const numero = document.getElementById("numero").value;
  const esquina = document.getElementById("esquina").value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked');

  if (!departamento || !localidad || !calle || !numero || !esquina) {
    alert("Por favor, completa todos los campos de la dirección.");
    return;
  }

  if (!document.querySelector('input[name="shipping"]:checked')) {
    alert("Selecciona un tipo de envío.");
    return;
  }

  if (!paymentMethod) {
    alert("Selecciona una forma de pago.");
    return;
  }

  alert("¡Compra realizada con éxito!");
}

// Evento para finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);

// Llamar a updateCosts al cargar la página para actualizar el subtotal inicial
document.addEventListener("DOMContentLoaded", updateCosts);



  document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el botón en la pestaña Carrito
    const botonAvanzar = document.querySelector('#cart button[data-bs-target="#shipping"]');

    // Añade un event listener para hacer el cambio de pestaña al hacer clic
    botonAvanzar.addEventListener('click', function () {
      const shippingTab = new bootstrap.Tab(document.querySelector('#shipping-tab'));
      shippingTab.show();
    });
  });



