// $(document).ready(
$(()=>{ //super shorthand 
  //IIFE => immediately invoked function expression. 
  //arrow function 
  
    console.log('jq doc is ready'); 

    $('#playerName').on('keyup', function () {
      echoInput($(this).val(), 'greetPlayer')

    });    
  });


// document.addEventListener('DOMContentLoaded', function() {
//     console.log('dom content is loaded');

//     //DOM specific code...name an element or an id or a class. 
//     document.getElementById("playerName").addEventListener("keyup", function () { echoInput(this.value, 'greetPlayer')}); 
// });

//vars & f/ns 

//take input and put in somewhere on the DOM 
function echoInput(input, targetId) {
  console.log('in greetPlayer f/n');
  console.log(input); 
  document.getElementById(targetId).textContent = `Hello ${input}!`;
}