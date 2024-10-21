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

        // Evento para cambiar la imagen de perfil
        const imageInput = document.getElementById('image-input');
        if (imageInput) {
            imageInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('profile-pic').src = e.target.result;  // Mostrar la imagen seleccionada
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Guardar el perfil cuando se hace clic en el botón
        const saveProfileBtn = document.getElementById("save-profile-btn");
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', validateProfile);
        }
    });
     ⁠
