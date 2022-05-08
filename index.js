var gamePattern=[];
var userClickedPattern=[];

var level=0;

const buttonColours=["red","blue","green","yellow"];

//starts the game
function start() {
    $(document).one('keypress',function(e){
        nextSequecnce();
    });
}
start();
//generates Sequence
function nextSequecnce(){
    level++;
    $("h1").text("level "+ level);
    var num= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour)
}

//user input answer
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    $("#"+name).fadeOut(50).fadeIn(50);
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout (function(){
        $("#"+currentColour).removeClass("pressed");
    },100) ;
}




function checkAnswer(currentLevel){


    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequecnce();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
        console.log("wrong");
        $("body").css("background-color","red");
        $("h1").text("Game Over, Press any key to restart");
        start();
        setTimeout(function(){
            $("body").css("background-color","#011F3F")
        },200);
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();
        level=0;
        gamePattern=[];
        userClickedPattern=[];
    }

}
