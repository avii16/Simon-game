var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = []



// click button
$(".btn").click(function () {
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    // alert(userChosenColour)
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

// game: user answer against game sequence
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }else{
        //play wrong sound
        playSound("wrong")
        //danger bg
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        //change heading
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }   
}


// check weather game has started
var start=false
// create level
var level=0;
// keypress event to start game
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level : "+ level)
        nextSequence()
        start=true
    }
})

//generaate sequence of game
function nextSequence() {
    //reset user clicked array to empty for next level
    userClickedPattern=[];
    // update level every time next sequence is fired
    level++;
    $("#level-title").text("Level : "+level)

    var n = Math.random()
    n = n * 4
    var randomNumber = Math.floor(n)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // play music
    playSound(randomChosenColour)
}

// play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

// animate press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 120)
}

//restart game
function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}