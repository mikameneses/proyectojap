

// Añade un event listener para cuando el DOM se ha cargado completamente.
// Esto asegura que el script no se ejecute hasta que todos los elementos HTML estén completamente cargados.
document.addEventListener('DOMContentLoaded', function() {

    // Obtiene el elemento del botón de inicio de sesión por su ID.
    const loginButton = document.getElementById('loginButton');

    // Asigna un evento 'onclick' al botón de inicio de sesión.
    loginButton.onclick = function() {
        
        // Redirige al usuario a 'index.html' cuando el botón es clicado.
        window.location.href = 'index.html';
    };
});
 ⁠

