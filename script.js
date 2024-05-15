function Gameboard() {
    
    const createBoard = () => {
    const rows = 3;
    const cols = 3;
    const emptyBoard = []

    for(let i = 0; i < rows; i++) {
        emptyBoard[i] = []
        for(let j = 0; j < cols; j++) {
            emptyBoard[i].push(0);
        }
    }

    return emptyBoard}

    let board = createBoard()
    
    function newBoard() {
        board = createBoard()}
        
   
    const getBoard = () => board;

    const placeMarker = (row, col, player) => {
        board[row][col] = player
    }

    return {getBoard, placeMarker, newBoard};
}

function validateGame(board) {

    function isTie() {
        let result = 3
        board.forEach(element => {
            if(element.includes(0)){
            result = 0}
        });
        return result
    }

    function isWinner(){

        function checkDiagonals() {
            let diag = []
            for (let i = 0; i < 3; i++) {
                diag.push(board[i][i])};
            if (checkSet(diag) != 0) {
                return checkSet(diag)}
            diag = []
            let i = 0
            for (let j = 2; j >= 0; j--) {
                diag.push(board[i][j])
                i++};
            if (checkSet(diag) != 0) {
                return checkSet(diag)}
            return 0}


        function checkColumns() {
            for (let j = 0; j < 3; j++) {
                let col = []
                for (let i = 0; i < 3; i++) {
                    col.push(board[i][j])}
                if (checkSet(col) != 0) {
                    return checkSet(col)}
                }
            return 0}

        function checkRows() {
            let result = 0
            board.forEach(element => {
                marker = checkSet(element);
                if (marker != 0) {
                    result = marker
                }
            });
            return result}

        function checkSet(set) {
            if (set.includes(0)) {
                return 0
            }
            let marker = set[0]
            set.forEach(element => {
                if(element !== marker) {
                    marker = 0
                }
            });
            return marker}

            


        if (checkDiagonals() != 0) {
            return checkDiagonals()
        }

        if (checkColumns() != 0) {
            return checkColumns()
        }

        return checkRows()
    }

    let win = isWinner()
    if (win != 0) {
        return win
    }
    let tie = isTie()
    if (tie != 0) {
        return tie
    }
    return 0

}

function Players() {
    allPlayers = [
        {
            name: "Player One",
            marker: 1
        },
        {
            name: "Player Two",
            marker: 2
        }
    ];

    let activePlayer = allPlayers[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === allPlayers[0] ? allPlayers[1] : allPlayers[0];
    };

    const getActivePlayer = () => {
        return activePlayer
    }

    const resetPlayer = () => {
        activePlayer = allPlayers[0]
    }

    

    return {switchPlayerTurn, getActivePlayer, resetPlayer}
        
    
}

function GameController() {
    const gameSpace = Gameboard()
    let theBoard = gameSpace.getBoard()
    let playerController = Players()
    

    function playTurn(x, y) {
        currentPlayer = playerController.getActivePlayer()
        currentMarker = currentPlayer['marker']
        gameSpace.placeMarker(x, y, currentMarker)
        playerController.switchPlayerTurn()
        
    }

    function declareWinner() {
        return validateGame(theBoard)
    }

    function resetGame() {
        gameSpace.newBoard()
        theBoard = gameSpace.getBoard()
        playerController.resetPlayer()
        
    }


    
    return {playTurn, declareWinner, getBoard: gameSpace.getBoard, resetGame}
}

function ScreenController() {
    const game = GameController()
    let board = game.getBoard()
    const gameDiv = document.querySelector(".gameSpace")
    const themeButton = document.querySelector(".theme-button")
    const restartButton = document.querySelector(".restart-game")
    const body = document.querySelector("body")
    const form = document.querySelector("#form")
    let player1 = ""
    let player2 = ""
    
     function addPlayerstoBoard(setplayer1, setplayer2) {
        player1 = setplayer1
        player2 = setplayer2
    }

    const findPlayer1 = document.querySelector("#player1")
    const findPlayer2 = document.querySelector("#player2")
    const leftSidePlayer = document.querySelector('.left-side')
    const rightSidePlayer = document.querySelector('.right-side')
    const dialog = document.querySelector("dialog")
    dialog.showModal()
    const submitPlayers = document.querySelector('#player-submit')
    submitPlayers.addEventListener("click", function(e) {
        e.preventDefault();
        addPlayerstoBoard(findPlayer1.value, findPlayer2.value)
        leftSidePlayer.textContent = `X IS ${findPlayer1.value.toUpperCase()}`
        rightSidePlayer.textContent = `O IS ${findPlayer2.value.toUpperCase()}`
        form.reset()
        dialog.close()
    })

    

    
    const updateScreen = () => {

        gameDiv.textContent = "";

        board.forEach((element, index) => {
            element.forEach((element2, index2) => {
                
                cellButton = document.createElement('button');
                cellButton.classList.add("cell")
                cellButton.dataset.squarex = (index)
                cellButton.dataset.squarey = (index2)
                if (element2 === 1) {
                    cellButton.textContent = "X"
                    cellButton.classList.add("x-selected")
                }
                if (element2 === 2) {
                    cellButton.innerHTML = "O"
                    cellButton.classList.add("o-selected")
                }
                gameDiv.appendChild(cellButton)
            });
            

        });
    }

   

    const gameOverScreen = () => {
        
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild)
        }
        gameDiv.classList.add("GameOver")
        let currentResult = validateGame(board)
        
        let endMessage = ""
        if (currentResult != 3) {
            endMessage += `Player ${(currentResult === 1 ? player1 : player2).toUpperCase()} Wins! Would you like to play again?`
        }
        else {
            endMessage += `It's a Tie! Would you like to play again?`
        }
        if (currentResult === 1) {
            winningPlayer = document.querySelector(".left-side")
        }
        if (currentResult === 2) {
            winningPlayer = document.querySelector(".right-side")
        }
        if (currentResult != 3) {
            winningPlayer.classList.add("winning-side")
        }
        messageDiv = document.createElement("h2")
        messageDiv.textContent = endMessage
        playAgainButton = document.createElement("button")
        playAgainButton.textContent = "Play Again?"
        playAgainButton.classList.add("play-again-button")
        gameDiv.appendChild(messageDiv)
        gameDiv.appendChild(playAgainButton)
        playAgainButton.addEventListener("click", resetGame)
    }

    function resetGame(){
        winningPlayer1 = document.querySelector(".left-side")
        winningPlayer2 = document.querySelector(".right-side")
        winningPlayer1.classList.remove("winning-side")
        winningPlayer2.classList.remove("winning-side")
        game.resetGame()
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild)
        }
        gameDiv.classList.remove("GameOver")
        board = game.getBoard()
        updateScreen()
    }
    
    function gameClickHandler(e) {
        
        const selectedSquarex = e.target.dataset.squarex
        const selectedSquarey = e.target.dataset.squarey 
        if(!selectedSquarex) return;
        if (board[selectedSquarex][selectedSquarey] === 0) {
        game.playTurn(selectedSquarex, selectedSquarey)
        const currentResult = validateGame(board)
        
        if (currentResult != 0) {
            gameOverScreen()
            return
        } 
        updateScreen();}
        
    }

    function themeChanger() {
        body.classList.toggle("dark")
        gameDiv.classList.toggle("dark-theme")
        themeButton.classList.toggle("dark-button")
        restartButton.classList.toggle("dark-button")
        if (themeButton.textContent === "Dark Mode") {
            themeButton.textContent = "Light Mode"
        }
        else {
            themeButton.textContent = "Dark Mode"
        } 
    }

    function fullRestart() {
        resetGame()
        dialog.showModal()
    }
    gameDiv.addEventListener("click", gameClickHandler)
    themeButton.addEventListener("click", themeChanger)
    restartButton.addEventListener("click", fullRestart)
    
    updateScreen()

}

ScreenController()
