const CATEGORIES_URL = "http://localhost:3000/cats";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url, token = null) {
  let result = {};
  showSpinner();

  // Configura los headers para la petición.
  let headers = {
    'Content-Type': 'application/json'
  };

  // Si se proporciona un token, lo agrega a los headers.
  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
  });
}

document.getElementById("logoutLink").addEventListener("click", function (event) {
  event.preventDefault(); // Evita que el enlace realice una acción por defecto

  // Obtener el correo electrónico para conservarlo
  const email = localStorage.getItem("username");

  // Eliminar todos los datos del perfil del usuario
  localStorage.removeItem("userProfile");

  // Conservar solo el correo electrónico
  localStorage.setItem("username", email);

  alert("Has cerrado sesión exitosamente.");

  
  window.location.href = "index.html"; 
});
