//---- ---------------------------------------
//variable declarations
//---- ---------------------------------------
var buttonColours =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//---- ---------------------------------------
//to select the buttons automatically
//---- ---------------------------------------
function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   ///console.log("gamePattern " + gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//---- ---------------------------------------
//Check Which Button is Pressed
//---- ---------------------------------------
$(".btn").click(function (){
  var userChosenColour = $(this).attr("id"); //store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});
//---- ---------------------------------------
//Add Sounds to Button Clicks
//---- ---------------------------------------
function playSound(name){
  var randomSound = new Audio("sounds/" + name + ".mp3");//get and play the audio for the selected button
  randomSound.play();
}
//---- ---------------------------------------
//Add Animations to User Clicks
//---- ---------------------------------------
function animatePress(clickedColor){
  $("#" + clickedColor).addClass("pressed");
    setTimeout(function(){
      $("#" + clickedColor).removeClass("pressed")
    },100);
  }
//---- ---------------------------------------
//detect when a keyboard key has been Pressed to start the game
//---- ---------------------------------------
var gameStarted = "false";
$(document).on("keypress",function(key){
  //console.log(event.key);
    if(gameStarted == "false"){
      $("#level-title").text("Level "+ level); //when game started, change the h1
      nextSequence();
      gameStarted = "true";
    }
});
//Or normal javascript instrad of the above jQuery
// document.addEventListener("keypress",function(event){
//   console.log(event);
// });
//---- ----------------------------------------------
//Check the User's Answer Against the Game Sequence
//---- -----------------------------------------------


function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");
  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}else{
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

     startOver();
  }
}

//Restart the Game
function startOver(){
  level = 0;
  gamePattern = [];
  //userClickedPattern = [];
  gameStarted = false;
}

