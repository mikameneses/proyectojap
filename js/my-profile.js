document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si el usuario está logueado
    const loggedInUser = localStorage.getItem("username");
    if (!loggedInUser) {
        alert("Debes iniciar sesión para acceder al perfil.");
        window.location.href = "login.html"; // Redirigir al login si no está logueado
    } else {
        // Rellenar el campo de E-mail con el que está en el almacenamiento local
        document.getElementById("email").value = loggedInUser;
    }
});

 const switchElement = document.getElementById('theme-switch');
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        switchElement.checked = true; // Activar el switch si está en modo oscuro
    }

    // Guardar preferencia del modo cuando el usuario activa o desactiva el switch
    switchElement.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
        }
    });
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

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    alert("Perfil guardado exitosamente.");
}
