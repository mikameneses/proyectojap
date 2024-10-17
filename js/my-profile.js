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
    const imageSrc: profilePIC.src;

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
        profileImage: imageSrc  
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    alert("Perfil guardado exitosamente.");
}
// Cargar imagen de perfil desde el localStorage cuando la página se carga
window.onload = function() {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile) {
        document.getElementById("name").value = userProfile.name || "";
        document.getElementById("secondName").value = userProfile.secondName || "";
        document.getElementById("lastName").value = userProfile.lastName || "";
        document.getElementById("email").value = userProfile.email || "";
        document.getElementById("phone").value = userProfile.phone || "";
        if (userProfile.profileImage) {
            profilePic.src = userProfile.profileImage;
      
    }
};

