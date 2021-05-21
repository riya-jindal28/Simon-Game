// NAME: RIYA JINDAL
// COURSE: BTECH. (CSE)- 4TH SEMESTER
// SECTION: F 
// SECTION ROLL NO.: 44
// UNIVERSITY ROLL NO.: 2014812

let buttonColors = ["red", "blue", "green", "yellow"];          // Array of colors
let gamePattern = [];                                           // Array for the pattern
let userClickedPattern = [];                                    // Array of pattern clicked by user
let level = 0;
let started = false;

$(document).keydown(function() {                                // Starting the game when a key is pressed
  if (!started) {
    setTimeout(function(){
      newSequence();
    },200);
    $("#level-title").text("Level " + level);
    started = true;
  }
});

// Function for creating the pattern

function newSequence() {                             

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

// Choosing a random button

  let randomNumber = Math.floor(Math.random() * 4);                   // Getting a random number
  let randomChosenColor = buttonColors[randomNumber];                 // Chosing a random color from the available colors
  gamePattern.push(randomChosenColor);                                // Adding the color to the pattern
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);    // Making the color blink
  playSound(randomChosenColor);
}

// Getting the button which got clicked

$(".btn").click(function() {
  let useChosenColor = $(this).attr("id");
  userClickedPattern.push(useChosenColor);
  playSound(useChosenColor);
  animatePress(useChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Function for playing sounds

function playSound(name) {

  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Function for click animation

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to check Answer

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        newSequence();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over! Press a Key to Restart");
    startOver();
  }
}

// For restarting the game

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}

