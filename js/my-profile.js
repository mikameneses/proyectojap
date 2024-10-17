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
// Seleccionar elementos del DOM
const profilePic = document.getElementById('profile-pic');
const imageInput = document.getElementById('image-input');
const saveBtn = document.getElementById('save-btn');

function loadProfileImage() {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        profilePic.src = storedImage;  // Cargar la imagen almacenada
    } else {
        console.log('No se encontró ninguna imagen almacenada');
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;  // Mostrar la imagen cargada
            console.log('Imagen cargada y mostrada en el perfil');
        };
        reader.readAsDataURL(file);  // Convertir la imagen a Base64
    }
}

function saveProfileImage() {
    const imageSrc = profilePic.src;
    if (imageSrc) {
        localStorage.setItem('profileImage', imageSrc);  // Guardar en localStorage
        alert('¡Imagen de perfil guardada exitosamente!');
        console.log('Imagen guardada en localStorage');
    } else {
        alert('No se ha seleccionado ninguna imagen .');
        console.log('No se pudo guardar la imagen porque no se ha seleccionado ninguna');
    }
}

// Cargar la imagen de perfil al cargar la página
window.onload = loadProfileImage;

imageInput.addEventListener('change', handleImageUpload);

// Guardar la imagen en el localStorage cuando se hace clic en el botón
saveBtn.addEventListener('click', saveProfileImage);
