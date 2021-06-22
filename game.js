var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var useClickedPattern=[];
var level = 0;
var started = false;

// this will start the program with click
$(document).bind("keypress touchstart",function(){
  if(!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

//select the button which is clicked and perform operation like play sound and animate press
$(".btn").click(function(){
  var useChosenColor = $(this).attr("id");
  useClickedPattern.push(useChosenColor);

  playSound(useChosenColor);
  animatePress(useChosenColor);
 
  checkAnswer(useClickedPattern.length-1); 
});

//check the answer pressed by us with computer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===useClickedPattern[currentLevel]){
    console.log("success");

    if(useClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1500)
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//this is going to create the sequence for the simon game 
function nextSequence(){
  useClickedPattern=[];
  level=level+1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



//function to play sound on click 
  function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
  }

//function to animate the button on click 
  function animatePress(name){
    $("div#"+name).addClass("pressed");
    setTimeout(function() {
      $("div#"+name).removeClass("pressed");
    },50);
  }

  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }
