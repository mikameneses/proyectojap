document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si el usuario está logueado
    const loggedInUser = localStorage.getItem("username");
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    
    if (!loggedInUser) {
        alert("Debes iniciar sesión para acceder al perfil.");
        window.location.href = "login.html"; // Redirigir al login si no está logueado
    } else {
        // Rellenar el campo de E-mail con el que está en el almacenamiento local
        document.getElementById("email").value = loggedInUser;

        // Rellenar los otros campos si existen, pero dejarlos vacíos si es la primera vez
        document.getElementById("name").value = userProfile ? userProfile.name : ""; // Nombre
        document.getElementById("secondName").value = userProfile ? userProfile.secondName : ""; // Segundo nombre
        document.getElementById("lastName").value = userProfile ? userProfile.lastName : ""; // Apellido
        document.getElementById("phone").value = userProfile ? userProfile.phone : ""; // Teléfono
        
    }
});

function validateProfile() {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Validar que los campos obligatorios estén llenos
    if (name.trim() === "" || lastName.trim() === "" || email.trim() === "" || phone.trim() === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Guardar los datos en el almacenamiento local
    const userProfile = {
        name,
        secondName: document.getElementById("secondName").value, // Este campo no es obligatorio
        lastName,
        email,
        phone
    };


    // Guardar el perfil del usuario
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Actualizar el nombre de usuario en el localStorage si se modifica el email
    localStorage.setItem("username", email);
    
    // Modo Día/Noche
document.getElementById("theme-switch").addEventListener("change", function() {
    if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});

// Cargar tema al inicio
window.onload = function() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.getElementById("theme-switch").checked = true;
        document.body.classList.add("dark-mode");
    }
};
