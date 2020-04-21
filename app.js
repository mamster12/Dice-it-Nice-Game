/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, isGamePlaying, targetScore = 100;
var easy = true;
var medium = false;
var hard = false;

document.querySelector('.targetScoreView').textContent = targetScore;
init();


// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// diffiulty buttons

var easyBtn = document.getElementById('easy');
var mediumBtn = document.getElementById('medium');
var hardBtn = document.getElementById('hard');

easyBtn.addEventListener('click', function () {
    easy = true;
    medium = false;
    hard = false;
    easyBtn.classList.add('active-level');
    mediumBtn.classList.remove('active-level');
    hardBtn.classList.remove('active-level');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    init();
});

mediumBtn.addEventListener('click', function () {
    easy = false;
    medium = true;
    hard = false;
    easyBtn.classList.remove('active-level');
    mediumBtn.classList.add('active-level');
    hardBtn.classList.remove('active-level');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    init();
});

hardBtn.addEventListener('click', function () {
    easy = false;
    medium = false;
    hard = true;
    easyBtn.classList.remove('active-level');
    mediumBtn.classList.remove('active-level');
    hardBtn.classList.add('active-level');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    init();
});



document.querySelector('#submit').addEventListener('click', function () {
    targetScore = document.querySelector('#targetScore').value;
    if (targetScore > 500 || targetScore < 10) {
        alert('input too high or too low from required.');
    } else {
        document.querySelector('.targetScoreView').textContent = targetScore;
        document.querySelector('#targetScore').value = 0;
        init();
    }
});



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGamePlaying) {


        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice-2');
        diceDOM.style.display = 'block';
        if ((easy === true || medium === true) && hard === false) {
            diceDOM2.style.display = 'none'
            diceDOM.style.left = '50%';
        } else if (hard === true && (easy === false && medium === false)) {
            diceDOM.style.left = '43%';
            diceDOM2.style.display = 'block';
        }
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //1. easy mode =  Update the round score IF the rolled number was NOT a 1
        if (easy === true && (medium === false && hard === false)) {
            if (dice !== 1) {
                //Add Score 
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                //Next Player
                nextPlayer();
            }
        } else if (medium === true && (easy === false && hard === false)) {
            if (dice === 6 && previousDice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                //Next Player
                nextPlayer()
            } else {
                //Add Score
                roundScore += dice;
                previousDice = dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            }
        } else if (hard === true && (easy === false && medium === false)) {
            if (dice === 1 || dice2 === 1) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                //Next Player
                nextPlayer()
            } else {
                //Add Score
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            init();
        }




    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGamePlaying) {
        //add the current score to the player's global score
        scores[activePlayer] += roundScore;


        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game.
        if (scores[activePlayer] >= targetScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            alert('Player ' + (activePlayer + 1) + ' wins!');
            isGamePlaying = false;
        } else {
            //nextPlayer
            nextPlayer()
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    console.log(easy, medium, hard);
    showRules();
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}


document.querySelector('.closeBtn').addEventListener('click', function () {
    document.querySelector('.rules').style.display = 'none';
});

document.querySelector('.btn-rules').addEventListener('click', function () {
    showRules();
});


function showRules() {
    document.querySelector('.rules').style.display = 'block';
    if (easy === true && (medium === false && hard === false)) {
        document.querySelector('.easyMode').style.display = 'block';
        document.querySelector('.mediumMode').style.display = 'none';
        document.querySelector('.hardMode').style.display = 'none';
    } else if (medium === true && (easy === false && hard === false)) {
        document.querySelector('.easyMode').style.display = 'none';
        document.querySelector('.mediumMode').style.display = 'block';
        document.querySelector('.hardMode').style.display = 'none';
    } else if (hard === true && (medium === false && easy === false)) {
        document.querySelector('.easyMode').style.display = 'none';
        document.querySelector('.mediumMode').style.display = 'none';
        document.querySelector('.hardMode').style.display = 'block';
    }
}























