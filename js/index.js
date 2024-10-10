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
   
    function logout() {
    // Elimina el token de autenticación del localStorage
    localStorage.removeItem('authToken');
    
    // Redirecciona al usuario a la página de inicio de sesión
    window.location.href = '/login.html';  // asegúrate de que esta ruta sea la correcta.
}

// Agrega un evento click al enlace de cerrar sesión
document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del enlace
    logout();               // Llama a la función logout
});


});
