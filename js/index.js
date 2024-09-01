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

    if (!sessionStorage.getItem("loggedIn")) {
        alert("Inicia sesión para acceder a esta página")
        window.location.href = 'login.html';
    }
   });
});
