document.addEventListener("DOMContentLoaded", () => {
    const buyButton = document.querySelector(".boton"); // Seleccionar botón "Comprar"
    buyButton.addEventListener("click", saveProductToLocalStorage);
});

function saveProductToLocalStorage() {
    // Obtener información del producto
    const productName = document.querySelector(".name").textContent;
    const productDescription = document.querySelector(".descripcion").textContent;
    const productPrice = document.querySelector(".precio").textContent;
    const productImage = document.querySelector("#imagen-principal").src;
    const prodID = localStorage.getItem("prodID"); // Obtener el ID de producto almacenado en localStorage

    // Crear un objeto para almacenar en localStorage
    const product = {
        id: prodID,
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage
    };

    // Obtener la lista de productos existentes en localStorage
    let existingProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Verificar si el producto ya existe en la lista
    const productExists = existingProducts.some(existingProduct => existingProduct.id === product.id);

    if (productExists) {
        // Si el producto ya existe, no hacer nada
        alert("El producto ya está en el carrito.");
    } else {
        // Agregar el nuevo producto a la lista
        existingProducts.push(product);

        // Guardar la lista actualizada de productos en localStorage
        localStorage.setItem("selectedProducts", JSON.stringify(existingProducts));

        // Redireccionar a cart.html
        window.location.href = "cart.html";
    }
}
