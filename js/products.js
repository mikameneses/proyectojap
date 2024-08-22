const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 
       document.addEventListener("DOMContentLoaded", function(){
           getJSONData(url).then(function(result){
               if(result.status === 'ok'){
                   console.log(result.data);
               }
           })
       });
 
