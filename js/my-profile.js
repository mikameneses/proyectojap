document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si el usuario está logueado
    const loggedInUser = localStorage.getItem("username");
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    
    if (!loggedInUser) {
        alert("Debes iniciar sesión para acceder al perfil.");
        window.location.href = "login.html"; // Redirigir al login si no está logueado
    } else {
        document.getElementById("email").value = loggedInUser;
        document.getElementById("name").value = userProfile ? userProfile.name : "";
        document.getElementById("secondName").value = userProfile ? userProfile.secondName : "";
        document.getElementById("lastName").value = userProfile ? userProfile.lastName : "";
        document.getElementById("phone").value = userProfile ? userProfile.phone : "";

        // Cargar imagen de perfil
        const profilePic = localStorage.getItem("profilePic");
        if (profilePic) {
            document.getElementById("profile-pic").src = profilePic;
        }
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

    // Manejo de la imagen de perfil
    const imageInput = document.getElementById("image-input");
    imageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePic = document.getElementById("profile-pic");
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("save-btn").addEventListener("click", function(event) {
        event.preventDefault();
        const profilePic = document.getElementById("profile-pic").src;
        localStorage.setItem("profilePic", profilePic);
        alert("Imagen de perfil guardada.");
    });
});

function validateProfile() {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (name.trim() === "" || lastName.trim() === "" || email.trim() === "" || phone.trim() === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const userProfile = {
        name,
        secondName: document.getElementById("secondName").value,
        lastName,
        email,
        phone
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("username", email);
}
 ⁠


