const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

class AudioController {
    constructor() {
        this.bgMusic = new Audio('audio/kitty.mp3');
        // this.flipSound = new Audio('Assets/Audio/flip.wav');
        // this.matchSound = new Audio('Assets/Audio/match.wav');
        // this.victorySound = new Audio('Assets/Audio/victory.wav');
        // this.gameOverSound = new Audio('Audio/over.mp3');
        this.bgMusic.volume = 0.2;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    // flip() {
    //     this.flipSound.play();
    // }
    // match() {
    //     this.matchSound.play();
    // }
    // victory() {
    //     this.stopMusic();
    //     this.victorySound.play();
    // }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}



class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
       
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.flipCard = null;
        // this.hasFlippedCard= [];
        this.busy = true;
        setTimeout(() => {
            
            this.audioController.startMusic();
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
    
    
       
   
        // this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        // this.audioController.gameOverSound();
        
       
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
       
        document.getElementById('victory-text').classList.add('visible');
    }}
    




function flipCard(){
    if(lockBoard) return;
    // this.audioController.flip();
    // this.totalClicks++;
    // this.ticker.innerText = this.totalClicks;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch(){

    let isMatch = firstCard.dataset.frame === secondCard.dataset.frame
      

        // if elase block
        isMatch ? disableCards() : unFlipCards();
    
    
        
    

}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards(){
    lockBoard = true;

    setTimeout(() =>{
        // this.audioController.startMusic;
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
       
        resetBoard();
    }, 1300);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(30, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}




