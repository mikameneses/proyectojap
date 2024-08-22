const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let getJSONData = function(url){
    let result = {};
   
    return fetch(url)
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
          
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(url).then(function(resultado){
        if(resultado.status === 'ok'){
            console.log(resultado.data);
        }
    })
})
