function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validar que los campos no estén vacíos
    if (username.trim() !== "" && password.trim() !== "") {
        // Guardar el nombre de usuario en el almacenamiento local
        localStorage.setItem("username", username);

        window.location.href = "index.html";
    } else {
        alert("Por favor, complete todos los campos.");
    }
}
