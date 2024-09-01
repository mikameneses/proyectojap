function validateLogin() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
  
        if (username.trim() !== "" && password.trim() !== "") {
            window.location.href = "index.html";
          localStorage.setItem("username", username);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }
