function validateLogin() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    // Limpiar mensajes previos y estilos de error
    [username, password].forEach(input => {
        input.classList.remove('is-invalid');
        document.getElementById(`${input.id}-feedback`).innerHTML = '';
    });

    let valid = true;

    // Validar que el campo de usuario no esté vacío
    if (username.value.trim() === "") {
        username.classList.add('is-invalid');
        document.getElementById('username-feedback').innerHTML = 'El usuario es obligatorio.';
        valid = false;
    } else if (!username.value.includes('@')) { // Verificar si el usuario contiene un '@'
        username.classList.add('is-invalid');
        document.getElementById('username-feedback').innerHTML = 'El correo electrónico debe contener un "@" válido.';
        valid = false;
    }

    // Validar que el campo de contraseña no esté vacío
    if (password.value.trim() === "") {
        password.classList.add('is-invalid');
        document.getElementById('password-feedback').innerHTML = 'La contraseña es obligatoria.';
        valid = false;
    }

    // Si no es válido, no continuar con el inicio de sesión
    if (!valid) return;

    // Aquí puedes agregar la lógica para iniciar sesión
    alert("Inicio de sesión exitoso.");
}
