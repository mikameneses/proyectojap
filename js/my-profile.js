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
>>>>>>> main

    alert("Perfil guardado exitosamente.");
}


// Guardar el perfil cuando se hace clic en el botón
document.getElementById("save-profile-btn").addEventListener('click', validateProfile);

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
