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
  // Cargar el tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    document.getElementById('themeSwitch').checked = (savedTheme === 'dark-theme');
  }

  // Agregar evento al switch
  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light-theme');
    }
  });
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
