document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si el usuario está logueado
    const loggedInUser = localStorage.getItem("username");
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const themeSwitch = document.getElementById("theme-switch");

     const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeSwitch.checked = true; // Marcamos el checkbox si el tema es oscuro
    }
    
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
         if (userProfile && userProfile.theme === "dark") {
            document.body.classList.add("dark-mode");
            themeSwitch.checked = true; // Marcamos el checkbox si el tema es oscuro
        } else {
            document.body.classList.remove("dark-mode");
            themeSwitch.checked = false; // Dejamos el checkbox desmarcado si el tema es claro
        }
    }
});

function validateProfile() {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const themeSwitch = document.getElementById("theme-switch");

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
         theme: themeSwitch.checked ? "dark" : "light" // Guardamos el estado del tema
    };


    // Guardar el perfil del usuario
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Actualizar el nombre de usuario en el localStorage si se modifica el email
    localStorage.setItem("username", email);
    
        // Guardar el tema seleccionado
    if (themeSwitch.checked) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

    alert("Perfil guardado exitosamente.");
}

