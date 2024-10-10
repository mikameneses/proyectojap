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
    
    // Verifica si el usuario está autenticado
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
        window.location.href = 'login.html';
    }

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
});



