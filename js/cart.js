document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
    actualizarTotales(); 
    actualizarBadgeCarrito();
    const formCart = JSON.parse(localStorage.getItem("formCart"));
});

function renderizarCarrito() {
    const cartContainer = document.getElementById("cart-items");

    
    if (!cartContainer) {
        console.error("Elemento con ID 'cart-items' no encontrado.");
        return;
        actualizarBadgeCarrito();
    }

    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];

    cartContainer.innerHTML = ""; 

    if (products.length === 0) {
       
        cartContainer.innerHTML = "<p>No hay ningún producto en el carrito.</p>";
    } else {
        products.forEach(product => {
            const price = Number(product.price) || 0;
            const quantity = Number(product.quantity) || 1; 
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
                    <p class="subtotal">Subtotal: ${product.currency} ${subtotal}</p>
                    <a href="#" class="remove-link" onclick="eliminarProducto('${product.name}')">Eliminar</a>
                </div>
            `;

            cartContainer.appendChild(productElement);
        });
    }


    actualizarBadgeCarrito();
    actualizarTotales();
}


function calcularSubtotal(price, quantity) {
    return price * quantity;
}


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


function eliminarProducto(nombreProducto) {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = products.filter(p => p.name !== nombreProducto);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    renderizarCarrito();
    actualizarBadgeCarrito();
}



function actualizarBadgeCarrito() {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const totalProducts = products.reduce((total, product) => total + (product.quantity), 0);
    
    const badge = document.getElementById("badge-carrito"); 
    if (badge) {
        badge.innerText = totalProducts; 
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
    function updateCosts() {
      const shippingPercentage = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value || 0);
      const { totalUYU, totalUSD } = calcularTotalesPorMoneda();
  
      
      const shippingCostUYU = totalUYU * shippingPercentage;
      const shippingCostUSD = totalUSD * shippingPercentage;
  
  
      const totalConEnvioUYU = totalUYU + shippingCostUYU;
      const totalConEnvioUSD = totalUSD + shippingCostUSD;
  
   
      document.getElementById("costo-envio-uyu").innerText = `Costo de envío en $: ${shippingCostUYU.toFixed(2)}`;
      document.getElementById("costo-envio-usd").innerText = `Costo de envío en USD: ${shippingCostUSD.toFixed(2)}`;
      document.getElementById("total-con-envio-uyu").innerText = `Total con envío en $: ${totalConEnvioUYU.toFixed(2)}`;
      document.getElementById("total-con-envio-usd").innerText = `Total con envío en USD: ${totalConEnvioUSD.toFixed(2)}`;
  }
  
  document.addEventListener("DOMContentLoaded", updateCosts);
     
 

document.querySelectorAll('input[name="shipping"]').forEach(option => {
option.addEventListener('change', updateCosts);
});


// Función para validar y finalizar compra
function finalizarCompra() {
    const departamento = document.getElementById("departamento");
    const localidad = document.getElementById("localidad");
    const calle = document.getElementById("calle");
    const numero = document.getElementById("numero");
    const esquina = document.getElementById("esquina");
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const shippingOption = document.querySelector('input[name="shipping"]:checked');


    let valid = true;

    // Validar que los campos obligatorios no estén vacíos
    if (departamento.value.trim() === "") {
        departamento.classList.add('is-invalid');
        valid = false;
    } else {
        departamento.classList.remove('is-invalid');
    }

    if (localidad.value.trim() === "") {
        localidad.classList.add('is-invalid');
        valid = false;
    } else {
        localidad.classList.remove('is-invalid');
    }

    if (calle.value.trim() === "") {
        calle.classList.add('is-invalid');
        valid = false;
    } else {
        calle.classList.remove('is-invalid');
    }

    if (numero.value.trim() === "") {
        numero.classList.add('is-invalid');
        valid = false;
    } else {
        numero.classList.remove('is-invalid');
    }

    if (esquina.value.trim() === "") {
        esquina.classList.add('is-invalid');
        valid = false;
    } else {
        esquina.classList.remove('is-invalid');
    }

    if (!shippingOption) {
        alert("Por favor, complete todos los campos de la dirección.");
        valid = false;
    }

    if (!document.querySelector('input[name="shipping"]:checked')) {
        alert("Selecciona un tipo de envío.");
        valid = false;
    }

    if (!paymentMethod) {
        alert("Selecciona una forma de pago.");
        valid = false;
    }


    if (!valid) return;

    alert("¡Compra realizada con éxito!");
}

document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
document.addEventListener("DOMContentLoaded", updateCosts);
document.addEventListener('DOMContentLoaded', function () {
  
  const botonAvanzar = document.querySelector('#cart button[data-bs-target="#shipping"]');

  botonAvanzar.addEventListener('click', function () {
    const shippingTab = new bootstrap.Tab(document.querySelector('#shipping-tab'));
    shippingTab.show();
  });
});

document.getElementById("saveBankTransfer").addEventListener("click", function () {
  const form = document.getElementById("bankTransferForm");
  if (!form.checkValidity()) {
    alert("Por favor, completa todos los campos de la Transferencia Bancaria.");
  } else {
    alert("Información de transferencia guardada correctamente.");
    const bankModal = bootstrap.Modal.getInstance(document.getElementById("bankTransferModal"));
    bankModal.hide();
  }
});

document.getElementById("saveCreditCard").addEventListener("click", function () {
  const form = document.getElementById("creditCardForm");
  if (!form.checkValidity()) {
    alert("Por favor, completa todos los campos de la Tarjeta de Crédito.");
  } else {
    alert("Información de tarjeta guardada correctamente.");
    const creditModal = bootstrap.Modal.getInstance(document.getElementById("creditCardModal"));
    creditModal.hide();
  }
});

