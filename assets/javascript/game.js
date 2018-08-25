// ==== VARIABLES ====
var alphabet = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var hiddenWord;
var wordToGuess;
var charArr;
var wins = 0;
var losses = 0;
var guessesLeft = 6;
var guessedLetters = "";
var lastWord = "";
var currentProducer;
var previousProducer;



// ==== OBJECTS ====
class Producer {
    constructor(keyword, album1, album2, album3, imgPath) {
        this.keyword = keyword.toLowerCase();
        this.album1 = album1;
        this.album2 = album2;
        this.album3 = album3;
        this.imgPath = "assets/images/" + keyword + ".jpg";
    
    }
}

// Producers to be guessed
var p01 = new Producer('jdilla');
var p02 = new Producer('eevee');
var p03 = new Producer('mfdoom');
var p04 = new Producer('ohbliv');
var p05 = new Producer('tomppabeats');

// Array of all producers
var producers = [p01, p02, p03, p04, p05];

// ==== GAME ====
// Start a new game
newGame();

// If it's the first time the game has been ran (0 wins and 0 losses), hide car info jumbotron
if ((wins == 0) || (losses == 0)){
    document.getElementById("prod-info").style.visibility = "hidden";
}

// On key press (key up)
document.onkeyup = function (event) {

    // Get the pressed key
    key = event.key;
    key = key.toLowerCase();

    // Run the game
    runGame(key);
}

// ==== FUNCTIONS ====
function hideWord(wordToHide) {
    hiddenWord = "";
    for (var i = 0; i < wordToHide.length; i++) {
        hiddenWord = hiddenWord + "_ ";
    }
    return hiddenWord;
}

function reavealLetter(index) {
    var hiddenArr = hiddenWord.split(" ");
    hiddenArr[index] = charArr[index];
    hiddenWord = hiddenArr.join(' ');

    checkIfSolved(hiddenWord);

    //Breaks if deleted...
    document.getElementById("hiddenWord-text").innerHTML = hiddenWord;
}

function checkIfSolved(string) {
    // not solved
    if (string.includes("_")) {
    }
    // solved
    else {
        wins++;
        newGame();

        document.getElementById("wins-text").innerHTML = wins;

        // Show 'prod-info' jumbotron
        showProd(previousProducer);
    }

}

function newGame() {
    if(typeof wordToGuess !== "undefined"){
        lastWord = wordToGuess;
        previousProducer = currentProducer;
        // lastWord = previousproducer.keyword;
        showProd(previousProducer);
    }

    // Show instructions text animation
    var startAccents = document.getElementsByClassName("startAccent");
    for (var i = 0; i < startAccents.length; i++) {
        startAccents[i].style.visibility = "visible";
    }

    guessesLeft = 6;
    guessedLetters = "";
    pickWord();
    hideWord(wordToGuess);
    refresh();
}

function runGame(guess){
    // Hide the animated 'press key to start..etc' angle brackets
    var startAccents = document.getElementsByClassName("startAccent");
    for (var i = 0; i < startAccents.length; i++) {
        startAccents[i].style.visibility = "hidden";
    }

    // get the key pressed, change to lowercase
    // key = event.key;
    // key = key.toLowerCase();

    // Limit input to alphabet...
    if (alphabet.includes(guess)) {

        // check if key pressed matches letters in 'wordToGuess'
        if (wordToGuess.includes(guess)) {

            // Split the word into an array of chars
            charArr = wordToGuess.split('');

            // For each matching letter, reveal it
            charArr.forEach(function (element, i) {
                if (element == guess) {
                    reavealLetter(i);
                }
            });
        }
        // if no matching letters found...
        else {
            if (guessedLetters.includes(guess)) {
            }
            else {
                guessesLeft--;
                guessedLetters = (guessedLetters + guess + " ");
                document.getElementById("guessesLeft-text").innerHTML = guessesLeft;
                document.getElementById("lettersGuessed-text").style.textTransform = "uppercase";

            }

            // if no guesses left, increase loss count and start a new game
            if (guessesLeft == 0) {
                losses++;
                newGame();
            }


           
        }
    }
    
    

    refresh();

}

function pickWord() {
    currentProducer = producers[Math.floor(Math.random() * producers.length)];
    wordToGuess = currentProducer.keyword;
    return wordToGuess;
}

function refresh() {
    // Hidden word
    document.getElementById("hiddenWord-text").innerHTML = hiddenWord;

    // Wins
    document.getElementById("wins-text").innerHTML = wins;

    // Losses
    document.getElementById("losses-text").innerHTML = losses;

    //Guesses left
    document.getElementById("guessesLeft-text").innerHTML = guessesLeft;

    // Guessed letters
    document.getElementById("lettersGuessed-text").innerHTML = guessedLetters;

    // Last word
    document.getElementById("lastWord-text").innerHTML = lastWord;
}

function showProd(Producer) {
    document.getElementById("prod-info").style.visibility = "visible";    
    document.getElementById("prodImage").outerHTML = "<img id='prodImage' src='" + Producer.imgPath + "' alt='image'>";
    // document.getElementById("prodAlbums-text").innerHTML = Producer.albums;
}



