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


    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const profileImage = document.getElementById("profile-pic").src;  // Obtener la imagen de perfil actual


    // Crear el objeto del perfil del usuario
    var userProfile = {
        name,
        secondName: document.getElementById("secondName").value, // Campo opcional
        lastName,
        secondLastName: document.getElementById("secondLastName").value, // Campo opcional
        email,
        phone,
        profileImage  // Guardar la imagen junto con los datos del perfil
    };


 
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
  // Validar que los campos obligatorios estén llenos
    if (name.trim() === "" || lastName.trim() === "" || email.trim() === "" || phone.trim() === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Si no es válido, no continuar con el guardado
    if (!valid) return;



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

// Guardar el perfil cuando se hace clic en el botón
document.getElementById("save-profile-btn").addEventListener('click', validateProfile);

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
