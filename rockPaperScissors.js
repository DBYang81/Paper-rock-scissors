const game = () => {
    let pScore = 0;
    let cScore = 0;
    let round = 0;
    let winHistory = [];
    console.log('win history', winHistory);
    const match = document.querySelector('.match');
    const gameOverScreen = document.querySelector(".gameOver");
    const gameOverText = document.querySelector(".gameOver p");
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    const options = document.querySelectorAll('.options button');
    
    //start the Game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        
        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };
    
    //play match
    const playMatch = () => {
        //const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');
        
        //computer options
        const computerOptions = ['rock', 'paper', 'scissors'];
        
        for (const option of options) {
            option.addEventListener('click', () => {
                playerHand.src = 'rock.png';
                computerHand.src = 'rock.png';
                round++;
                updateRound();
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                console.log(computerChoice);
                disabledBtn();
                
                setTimeout (() => {
                    //update playerhand Images
                    playerHand.src = option.textContent+'.png';
                    //update computerhand images
                    computerHand.src = computerChoice +'.png';
                    //here is the comparehands
                    compareHands (option.textContent, computerChoice); 
                    
                    //win when score reach to 10
                    if(checkWinsInARow (3)) {
                        match.classList.remove('fadeIn');
                        match.classList.add('fadeOut');
                        gameOverScreen.classList.add('fadeIn');
                        playAgn();
                        resetFig();
                        
                    } else {
                        const tenWins = 10;
                        if(pScore == tenWins) {
                            match.classList.remove('fadeIn');
                            match.classList.add('fadeOut');
                            gameOverScreen.classList.add('fadeIn');
                            gameOverText.textContent = "Player Won the Game!!"
                            playAgn();
                            resetFig();
                        }else if(cScore == tenWins) {
                            match.classList.remove('fadeIn');
                            match.classList.add('fadeOut');
                            gameOverScreen.classList.add('fadeIn');
                            gameOverText.textContent = 'Computer Won the Game!!'
                            playAgn();
                            resetFig();
                        }
                    }
                    // // add fucntion for play-again button
                    enabledBtn();
                }, 1000);
                
                //Animation
                playerHand.style.animation = 'shakePlayer 1s ease';
                computerHand.style.animation = 'shakeComputer 1s ease';    
                
                for (const hand of hands) {
                    hand.addEventListener('animationend', () => {
                        hand.style.animation ='';
                    });
                }
            });
        }       
    };
    
    //function for disable the buttons
    const disabledBtn = () => {
        for(const option of options) {
            option.disabled = true;
            option.style.background = 'rgb(90, 82, 82)';     
        }
    };
    //function for enable the buttons
    const enabledBtn = () => {
        for(const option of options){
            option.disabled = false;
            option.style.background ='';
        }
    };
    
    //update rounds
    const updateRound = () => {
        const gRound = document.querySelector('.rounds p');
        gRound.textContent = round;
    }
    
    //function for play-again button
    const playAgn = () => {
        const playAgnBtn = document.querySelector('.gameOver button');
        
        playAgnBtn.addEventListener('click', () => {
            gameOverScreen.classList.remove('fadeIn');
            gameOverScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };
    
    //reset figure function
    const resetFig = () => {
        const playAgnBtn = document.querySelector('.gameOver button');
        const gRound = document.querySelector('.rounds p');
        playAgnBtn.addEventListener('click', () => {
            pScore = 0;
            playerScore.textContent = 0;
            cScore = 0;
            computerScore.textContent = 0;
            round = 0;
            gRound.textContent = 0;
            winHistory = [];
        });
    }
    
    //update scores
    const updateScore = () => {
        
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;   
    };
    
    //check the win in a row
    const checkWinsInARow = (winCount) => {

        if (winHistory.length < winCount) {
            return false;
        }
        const itemCompared = winHistory.slice(winHistory.length - winCount);
        console.log(itemCompared);
        
        const last = itemCompared[winCount - 1];
        console.log('lastElement', last);
        let counter = 1;
        
        for (let i = winCount - 2; i >= 0; i--) {
            console.log(itemCompared[i]);
            if (itemCompared[i] === last) {
                counter++;
                console.log(counter + 'win(s) in a row');
            }else {
                break;
            }
            
            if (counter === winCount) {
                if(last === 'c') {
                    console.log('return', checkWinsInARow);
                    return (gameOverText.textContent = 'Computer '+ winCount + ' wins in a row !!');
                }
                if(last === 'p') {
                    console.log('return', checkWinsInARow);
                    return (gameOverText.textContent = 'Player ' + winCount + ' wins in a row !!'); 
                }
            }
        }
        return;
    };
    
    
    const compareHands = (playerChoice, computerChoice) => {
        //update text
        const winner = document.querySelector('.winner');
        //checking for tie
        if (playerChoice === computerChoice) {
            winner.textContent ='it is a tie';
            winHistory.push('t');
            return;
        }
        //check for rock
        if (playerChoice ==='rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                winHistory.push('p');
                return;
            }
            else {
                winner.textContent ='Computer wins';
                cScore++;
                updateScore();
                winHistory.push('c');
                return;
            }
        }
        //check for paper
        if (playerChoice ==='paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                winHistory.push('p');
                return;
            }
            else {
                winner.textContent ='Computer wins';
                cScore++;
                updateScore();
                winHistory.push('c');
                return;
            }
        }
        //check for scissors
        if (playerChoice ==='scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                winHistory.push('p');
                return;
            }
            else {
                winner.textContent ='Computer wins';
                cScore++;
                updateScore();
                winHistory.push('c');
                return;
            }
        }
    };

    //call all the inner function
    startGame();
    playMatch();
};

//start the game function
game();