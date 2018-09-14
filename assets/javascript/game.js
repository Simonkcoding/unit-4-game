//Global variables
//values
var guildValue;
var playerValue;
var counter = 100;
//arrays
var crystalValueArray = [];
// T/F
var isDefItemObtained = false;
var isTimeItemObtained = false;
var isGameFinished = false;
//objects

var timer;
function counterDown() {
    timer = setInterval(function () {
        --counter;
        // Health bar relates to the counter's value
        var myBar = $("#myBar");
        myBar.width(counter + "%");
        //Game over 1: runnning out of energy
        if (counter <= 0) {
            clearInterval(timer);
            alert('You have no energy! Quest Failed!');
            isGameFinished = true;
            $('.msg-picture').attr("src", "assets/images/lose.png");
            alert('click once to restart')
            gameReset();
        }
        // use potion when 50% HP down
        if (counter<=50 && isTimeItemObtained==true){
            alert('Potion restored your health');
                    counter += 30;
                    isTimeItemObtained = false;
                    $('.item-2').attr("src", "assets/images/item_unknown.png");
                    console.log(isTimeItemObtained);
        }
    }, 200);
}

function gameReset() {
    //reset all images and message
    $('.start-btn').attr("style", "display:inline");
    $('.crystal-btn').attr("style", "display:none");
    $('.msg-picture').attr("src", "assets/images/pickaxe.png");
    $('.msg-picture-2').attr("style", "display:none");
    $('.item-1').attr("src", "assets/images/item_unknown.png");
    $('.item-2').attr("src", "assets/images/item_unknown.png");
    $(".word-message").text('Welcome to Ore Mine World.Here you can find rare ore to upgrade your guild base. But a guardian monster is portecting this beautiful land.');
    //reset all value
    counter = 100;
    playerValue = 0;
    isDefItemObtained = false;
    isTimeItemObtained = false;
};

$('.start-btn').click(function () {
    //change icons
    $('.start-btn').attr("style", "display:none");
    $('.crystal-btn').attr("style", "display:inline");
    isGameFinished = false;
    counterDown();
    $(".word-message").text('Now take the ore to your bag before monster finds you!');
});


function gamestart() { //game start function
    //reset guild Points
    var max = 120;
    var min = 19;
    guildValue = Math.floor(Math.random() * (max - min) + min); //random ans
    console.log(guildValue);

    function randomArrayOfFour() { //random button value
        var cryMax = 3;
        var cryMin = 1;
        // To prevent same value in the array...
        for (var i = 0; i < 4; i++) {
            crystalValueArray[i] = Math.round(Math.random() * (cryMax - cryMin) + cryMin);
            cryMax += 3;
            cryMin += 3;
        }
        console.log(crystalValueArray);
    }
    //reset crystal values
    randomArrayOfFour();
    //assign data value to buttons
    $('.crystal-btn1').attr("data-value", crystalValueArray[0]);
    $('.crystal-btn2').attr("data-value", crystalValueArray[1]);
    $('.crystal-btn3').attr("data-value", crystalValueArray[2]);
    $('.crystal-btn4').attr("data-value", crystalValueArray[3]);

    //reset player value
    playerValue = 0;
    //reset status
    isDefItemObtained = false;
    isTimeItemObtained = false;
    //reset health bar
    counter = 100;
};

//Run once gamestart when loaded
gamestart();
//don't forget to show guild value
$('.guildValue-Text').text(guildValue);

//Hover effect
$('.crystal-btn').hover(function () {
    $(this).animate({ opacity: 1 }, 500);
}, function () {
    $(this).animate({ opacity: 0.5 }, 500);
});

//when crystal is clicked
$('.crystal-btn').click(addScore);
//addScore function
function addScore() {
    if (!isGameFinished) {
        $('.msg-picture').attr("src", "assets/images/pickaxe.png");
        $('.msg-picture-2').attr("style", "display:none");
        var crystalBtnValue = $(this).attr("data-value");
        crystalBtnValue = parseInt(crystalBtnValue);
        playerValue += crystalBtnValue;
        alert('Your score now is ' + playerValue + " .");
        console.log(playerValue);
        $('.playerValue-Text').text(playerValue);
        checkScore();
        checkEvent();
    } else {
       gameReset();
    }
};

function checkScore() {
    if (playerValue === guildValue) {
        alert("You met guildmaster's expectation! Quest Completed!");
        $('.msg-picture').attr("src", "assets/images/win.png");
        isGameFinished = true;
        alert('click once to restart');
        gameReset();
        clearInterval(timer);
    } else if (playerValue > guildValue) {
        alert("Guildmaster isn't happy for your overwork! Try again!");
        $('.msg-picture').attr("src", "assets/images/lose.png");
        isGameFinished = true;
        alert('click once to restart');
        gameReset();
        clearInterval(timer);
    }
};

function checkEvent() {
    var eventIndex = Math.floor(Math.random() * 5);
    if (eventIndex == 0) {
        getDefUp();
    } else if (eventIndex == 1) {
        meetMonster();
    } else if (eventIndex == 2) {
        getTimeUp()
    }
};

function getDefUp() {
    if (!isDefItemObtained) {
        alert('Your equipment arrived!');
        alert('It protects you if a monster comes close to you!');
        $('.item-1').attr("src", "assets/images/item_eq.png");
        isDefItemObtained = true;
    };
};

function getTimeUp() {
    if (!isTimeItemObtained) {
        alert('Your found a potion! Your health will be restored when less than 50%');
        $('.item-2').attr("src", "assets/images/item_potion.png");
        isTimeItemObtained = true;
    }
};

function meetMonster() {
    $('.msg-picture').attr("src", "assets/images/monster.png");
    if (isDefItemObtained == false) {
        playerValue = 0;
        $('.msg-picture-2').attr("style", "display:inline");
        $('.playerValue-Text').text(playerValue);
        alert('MONSTER APPEARS! You freaked out and dropped all the ore!');
        alert('Your crystal is O');  
        $(".word-message").text('The monster took your bag! You have no ore now');
    } else {
        isDefItemObtained = false;
        $('.item-1').attr("src", "assets/images/item_unknown.png");
        $('.msg-picture').attr("src", "assets/images/pickaxe.png");
        alert('MONSTER APPEARS!');
        alert('Helmet protected you but it breaks!');    
    }
};