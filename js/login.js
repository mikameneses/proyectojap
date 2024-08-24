 function validateLogin() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
        } else {
            window.location.href = "index.html";
        }
    }






/*document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.onclick = function() {
        // Simula autenticación exitosa (esto debería cambiar con la validación real)
        const validUser = true; // Aquí deberías verificar las credenciales del usuario

        if (validUser) {
            // Guarda el estado de sesión en localStorage
            localStorage.setItem('loggedIn', 'true');

            // Redirige al usuario a 'index.html'
            window.location.href = 'index.html';
        } else {
            alert('Credenciales inválidas. Por favor, inténtelo de nuevo.');
        }
    };
});


    
