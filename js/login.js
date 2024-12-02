function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: username,
    password: password
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Error al iniciar sesión'); 
  }
  return response.json();
})
.then(data => {
  // Login exitoso: guardamos el token en localStorage
  localStorage.setItem('token', data.token); 

  // ... redirigir al usuario a la página principal
    window.location.href = "index.html";
     
})
.catch(error => {
  // Manejar errores de login (mostrar mensaje al usuario, etc.)
  console.error('Error:', error); 
})

}


  
