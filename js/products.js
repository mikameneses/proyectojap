const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 
            getJSONData(URL).then(data => {
                if (data.status === 'ok') {
                    const products = data.data.products;
                    const container = document.getElementById('products-container');
                    products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.innerHTML = `
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>Price: ${product.currency} ${product.cost}</p>
                            <p>Sold: ${product.soldCount}</p>
                            <img src="${product.image}" alt="${product.name}" width="100">
                        `;
                        container.appendChild(productDiv);
                    });
                } else {
                    document.getElementById('products-container').innerText = 'Error fetching data';
                }
            });
        }
   

  
