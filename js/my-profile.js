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
        document.getElementById("secondLastName").value = userProfile ? userProfile.secondLastName : ""; // Apellido
        document.getElementById("phone").value = userProfile ? userProfile.phone : ""; // Teléfono
    }
 // Modo Día/Noche
    const themeSwitch = document.getElementById("theme-switch");
    themeSwitch.addEventListener("change", function() {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });

    // Cargar tema al inicio
    const loadTheme = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            themeSwitch.checked = true;
            document.body.classList.add("dark-mode");
        }
    };
    loadTheme();
});

function validateProfile() {
    // Obtener los valores de los campos
    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");

    // Limpiar mensajes previos y estilos de error
    [name, lastName, email].forEach(input => {
        input.classList.remove('is-invalid');
        document.getElementById(`${input.id}-feedback`).innerHTML = '';
    });

    let valid = true;

    // Validar que los campos obligatorios no estén vacíos
    if (name.value.trim() === "") {
        name.classList.add('is-invalid');
        document.getElementById('name-feedback').innerHTML = 'El nombre es obligatorio.';
        valid = false;
    }

    if (lastName.value.trim() === "") {
        lastName.classList.add('is-invalid');
        document.getElementById('lastName-feedback').innerHTML = 'El apellido es obligatorio.';
        valid = false;
    }

    if (email.value.trim() === "") {
        email.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo electrónico es obligatorio.';
        valid = false;
    } else if (!validateEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo debe contener un "@" válido.';
        valid = false;
    }

    // Si no es válido, no continuar con el guardado
    if (!valid) return;

    // Guardar los datos en el almacenamiento local
    var userProfile = {
        name: name.value,
        secondName: document.getElementById("secondName").value, // Este campo no es obligatorio
        lastName: lastName.value,
        secondLastName: document.getElementById("secondLastName").value, // Este campo no es obligatorio
        email: email.value,
        phone: document.getElementById("phone").value // Este campo no es obligatorio
    };

    // Guardar el perfil del usuario en el almacenamiento local
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Actualizar el nombre de usuario en el localStorage si se modifica el email
    localStorage.setItem("username", email.value);

    alert("Perfil guardado exitosamente.");
}

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

