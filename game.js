// array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

// game pattern
var gamePattern = [];

// USER CLICKED PATTERN
var userClickedPattern = [];

// track of game started or not 
var gameStarted = false;

var fadeSpeed = 55;


var level = 0;

$(document).on("keydown", function () {
    if (!gameStarted) {
        $("#level-title").text("level " + level);
        nextSequence();
        
        gameStarted = true;
    }
    
});

// user pattern detector
$(".btn").on("click", function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    }

    if(gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }

    else if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        playWrong("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

    else {
        console.log("wrong");
    }
}

// functions that generate sequence btw 0 and 3
function nextSequence() {

    userClickedPattern = []; 
    level++;

    $("#level-title").text("Level "  + level);
    
    var randomNumber = Math.floor(Math.random() * 4);

    // choosing color from the array
    var randomChosenColour = buttonColours[randomNumber];

    // adding the random choosen color to an end of an empty array
    gamePattern.push(randomChosenColour);

    // showing the user the active button
    $("." + randomChosenColour).fadeOut(fadeSpeed).fadeIn(fadeSpeed);
    
    playSound(randomChosenColour);
    
}

// button click and sound 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// playing wrong sound
function playWrong(sound) {
    var wrong = new Audio("sounds/" + sound + ".mp3");
    wrong.play();
}

// animation 
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    },100);
    
}

// restarting the the whole game 
function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
}