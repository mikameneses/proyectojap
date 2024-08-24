//const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 
//window.onload=function() {
 //           getJSONData(url).then(data => {
  //              if (data.status === 'ok') {
  //                  const products = data.data.products;
    //                const container = document.getElementById('products-container');
      //              products.forEach(product => {
      //                  const productDiv = document.createElement('div');
      //                  productDiv.innerHTML = `
      //                      <h2>${product.name}</h2>
      //                      <p>${product.description}</p>
      //                      <p>Price: ${product.currency} ${product.cost}</p>
      //                      <p>Sold: ${product.soldCount}</p>
      //                      <img src="${product.image}" alt="${product.name}" width="100">
      //                  `;
      //                  container.appendChild(productDiv);
      //              });
      //          } else {
      //              document.getElementById('products-container').innerText = 'Error fetching data';
      //          }
      //      });
        
  // }
const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

window.onload = function() {
    getJSONData(url).then(data => {
        if (data.status === 'ok') {
            const products = data.data.products;
            const container = document.getElementById('products-container');

            products.forEach(product => {
                
                const productDiv = document.createElement('div');
                productDiv.className = 'col-md-4'; // Agregar la clase de Bootstrap para el tamaño de la columna

               
                productDiv.innerHTML = `
                    <div class="card mb-4 shadow-sm custom-card cursor-active" id="${product.id}">
                        <img class="bd-placeholder-img card-img-top" src="${product.image}" alt="${product.name}" style="width: 100%;">
                        <div class="card-body">
                            <h2 class="m-3">${product.name}</h2>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Price: ${product.currency} ${product.cost}</p>
                            <p class="card-text">Sold: ${product.soldCount}</p>
                        </div>
                    </div>
                `;

               
                container.appendChild(productDiv);
            });
        } else {
            document.getElementById('products-container').innerText = 'Error fetching data';
        }
    });
}

  
