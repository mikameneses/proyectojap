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

    // Cargar perfil e imagen al cargar la página
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const profilePic = document.getElementById('profile-pic');

    if (userProfile) {
        document.getElementById("name").value = userProfile.name || "";
        document.getElementById("secondName").value = userProfile.secondName || "";
        document.getElementById("lastName").value = userProfile.lastName || "";
        document.getElementById("email").value = userProfile.email || "";
        document.getElementById("phone").value = userProfile.phone || "";
        if (userProfile.profileImage) {
            profilePic.src = userProfile.profileImage;  // Cargar imagen del perfil
        }
    }

    const imageInput = document.getElementById('image-input');
    const saveBtn = document.getElementById('save-btn');

    // Escuchar cambios en el input de la imagen
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;  // Mostrar la imagen seleccionada
            };
            reader.readAsDataURL(file);
        }
    });

    // Guardar el perfil (incluida la imagen) en el localStorage
    saveBtn.addEventListener('click', function() {
        const name = document.getElementById("name").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const imageSrc = profilePic.src;  // Obtener la imagen

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
            phone,
            profileImage: imageSrc  // Guardar la imagen junto con los datos del perfil
        };

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        alert('Perfil y imagen de perfil guardados exitosamente.');
    });
});
