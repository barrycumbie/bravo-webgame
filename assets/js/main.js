  let choice = false;
  let answer = false; 
  let score = 0; 

// $(document).ready(
$(() => { //super shorthand 
  //IIFE => immediately invoked function expression. 
  //arrow function 


  console.log('jq doc is ready');

  // listen for button clicks. 
  $('#choiceBtn').on('click', function () {
    console.log('clicked choice btn')
    $(this).toggleClass('btn-success');
    choice = true;
    if(choice == answer){
    score += 1;
    $('#gameScore').text(`Score: ${score}`);
    // return 1; //if true, win with score +1  
  }
  });

  $('#answerBtn').on('click', function () {
    console.log('clicked answer btn')
    $(this).toggleClass('btn-success');
    answer = true; 
    if(choice == answer){
    score += 1;
    $('#gameScore').text(`Score: ${score}`);
    // return 1; //if true, win with score +1  
  }
  });

  // function updateScore() {

  //   $('#gameScore').text(`Score:adadsfasd `);

  // };


  $('#playerName').on('keyup', function () {
    echoInput($(this).val(), 'greetPlayer')

  });



  // todo: move this into a drop.js script
  $(function () {
    $("#gamePiece").draggable();
    $("#winGame").droppable({
      drop: function (event, ui) {
        console.log('ready to drop'); 
        $(this)
          .css("background-color", "blue")
          .addClass("ui-state-highlight")
          .find("p")
          .html("Dropped!");


      }
    });
  });
});


//check selected answers
function checkAnswers(){
  // if choice is selected, and answer, return WIN 
  if(choice == answer){
    score += 1;
    $('#gameScore').text(`Score: ${score}`);
    // return 1; //if true, win with score +1  
  }
}

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