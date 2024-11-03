document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
     document.addEventListener('DOMContentLoaded', function() {
    
    // Verifica si el usuario está autenticado
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
        // Redirige al usuario al login si no ha iniciado sesión
        window.location.href = 'login.html';
    }
   });
     window.onload = function() {
        var username = localStorage.getItem("username");
        if (username) {
            document.getElementById("userDisplay").textContent = username;
        }
    };

    // Muestra el nombre de usuario si está almacenado
    var username = localStorage.getItem("username");
    if (username) {
        document.getElementById("userDisplay").textContent = username;
    }
    // Función de logout
    function logout() {
        // Elimina el token de autenticación del localStorage
        localStorage.removeItem('authToken');
        
        // Redirecciona al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    }
    // Agrega un evento clic al enlace de cerrar sesión
    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        logout();               // Llama a la función logout
    });

// Inicializa el carrito y carga los productos guardados
let carrito = [];

// Cargar el carrito al iniciar
function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        actualizarBadgeCarrito();
    }
}

cargarCarrito();
// Agregar un producto al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    actualizarBadgeCarrito();
    guardarCarrito();
}
// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar el badge con la cantidad total de productos
function actualizarBadgeCarrito() {
    const badge = document.getElementById('carrito-badge');
    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    badge.innerText = cantidadTotal;
}

}); 
