const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //
       document.addEventListener("DOMContentLoaded", function(){
           getJSONData(url).then(function(resultado){
               if(resultado.status === 'ok'){
                   console.log(resultado.data);
               }
           })
       });
 
