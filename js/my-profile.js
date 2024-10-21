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
        document.getElementById("secondLastName").value = userProfile ? userProfile.secondLastName : ""; // Segundo apellido
        document.getElementById("phone").value = userProfile ? userProfile.phone : ""; // Teléfono

        // Cargar imagen de perfil si existe
        if (userProfile && userProfile.profileImage) {
            document.getElementById("profile-pic").src = userProfile.profileImage;
        }
    }
});

// Evento para cambiar la imagen de perfil
document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result;  // Mostrar la imagen seleccionada
        };
        reader.readAsDataURL(file);
    }
});

function validateProfile() {
    // Obtener referencias de los inputs del DOM
    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const profileImage = document.getElementById("profile-pic").src;  // Obtener la imagen de perfil actual

    // Limpiar mensajes previos y estilos de error
    [nameInput, lastNameInput, emailInput].forEach(input => {
        input.classList.remove('is-invalid');
        document.getElementById(`${input.id}-feedback`).innerHTML = '';
    });

    let valid = true;

    // Validar que los campos obligatorios no estén vacíos
    if (nameInput.value.trim() === "") {
        nameInput.classList.add('is-invalid');
        document.getElementById('name-feedback').innerHTML = 'El nombre es obligatorio.';
        valid = false;
    }

    if (lastNameInput.value.trim() === "") {
        lastNameInput.classList.add('is-invalid');
        document.getElementById('lastName-feedback').innerHTML = 'El apellido es obligatorio.';
        valid = false;
    }

    if (emailInput.value.trim() === "") {
        emailInput.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo electrónico es obligatorio.';
        valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo debe contener un "@" válido.';
        valid = false;
    }

    // Si no es válido, no continuar con el guardado
    if (!valid) return;

    // Crear el objeto del perfil del usuario
    const userProfile = {
        name: nameInput.value.trim(),
        secondName: document.getElementById("secondName").value.trim(), // Campo opcional
        lastName: lastNameInput.value.trim(),
        secondLastName: document.getElementById("secondLastName").value.trim(), // Campo opcional
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        profileImage  // Guardar la imagen junto con los datos del perfil
    };

    // Guardar el perfil del usuario en localStorage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Actualizar el nombre de usuario en el localStorage si se modifica el email
    localStorage.setItem("username", emailInput.value.trim());

    alert("Perfil guardado exitosamente.");
}

// Guardar el perfil cuando se hace clic en el botón
document.getElementById("save-profile-btn").addEventListener('click', validateProfile);

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

