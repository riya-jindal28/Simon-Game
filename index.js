let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

//Create a new pattern

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level:" + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);

}
//Check which button is pressed
$(".btn").click(function() {
  let userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Add sounds to button clicks

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Add animation to user clicks

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Start the Game

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level:" + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    $("h1").text("Game Over!! Press any key to restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
