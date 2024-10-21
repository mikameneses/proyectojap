    function validateProfile() {
    let valid = true;  // Inicializamos la variable para el estado de validación

    // Remover clases de error antes de validar
    name.classList.remove('is-invalid');
    lastName.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    phone.classList.remove('is-invalid');

    // Validar nombre
    if (name.value.trim() === "") {
        name.classList.add('is-invalid');
        document.getElementById('name-feedback').innerHTML = 'El nombre es obligatorio.';
        valid = false;
    }

    // Validar apellido
    if (lastName.value.trim() === "") {
        lastName.classList.add('is-invalid');
        document.getElementById('lastName-feedback').innerHTML = 'El apellido es obligatorio.';
        valid = false;
    }

    // Validar correo electrónico
    if (email.value.trim() === "") {
        email.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo electrónico es obligatorio.';
        valid = false;
    } else if (!validateEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        document.getElementById('email-feedback').innerHTML = 'El correo debe contener un "@" válido.';
        valid = false;
    }

    // Validar teléfono
    if (phone.value.trim() === "") {
        phone.classList.add('is-invalid');
        document.getElementById('phone-feedback').innerHTML = 'El teléfono es obligatorio.';
        valid = false;
    }

    // Si no es válido, no continuar con el guardado
    if (!valid) return;

    // Crear el objeto del perfil del usuario
    const userProfile = {
        name: name.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim()
    };

    // Guardar el perfil del usuario en localStorage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Actualizar el nombre de usuario en localStorage si se modifica el email
    localStorage.setItem("username", email.value);

    alert("Perfil guardado exitosamente.");
}

// Guardar el perfil cuando se hace clic en el botón
document.getElementById("save-profile-btn").addEventListener('click', validateProfile);

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
