// gameboard module
const gameBoard = () => {
  // Array to store info on gameboard
  let gameBoardArr = []
  // initialize game board
  const main = document.getElementById("main");
  for(let i = 0; i<9; i++) {
    const div = document.createElement("div");
    gameBoardArr.push(div);
    main.appendChild(div);
  }

  // main game functionality adds event listeners to each grid div
  gameBoardArr.forEach((element, index) => {
    element.addEventListener("click", (e) => {
      // if statement to allow each sqaure to be played only once
      if(e.target.childNodes.length == 0) {
        // append X or O to sqaure
        const h1 = document.createElement("h1");
        h1.innerText = game.getCurrentPlayer().identifier;
        e.target.appendChild(h1);
        // replace array indexes with X or O for checkWinner function
        gameBoardArr[index] = game.getCurrentPlayer().identifier;
        // switch player
        game.switchPlayers();
        game.checkWinner(gameBoardArr);
      }
    })
  })
};

// player object
const player = (name, identifier) => {
  return {name, identifier};
}

const game = (() => {
  // initialize two player objects
  const players = [];
  let currentPlayer;
  const playerTurnInfo = document.getElementById("playerTurn");
  const initializePlayers = (player1Name, player2Name) => {
    players.push(player(player1Name,"X"));
    players.push(player(player2Name,"O"));
    currentPlayer = players[0];
    playerTurnInfo.innerText = `${currentPlayer.name}'s Turn`;
  }
  // get current player
  const getCurrentPlayer = () => currentPlayer;
  // switch player
  const switchPlayers = () => { 
    currentPlayer = currentPlayer === players[0] ? players[1]:players[0];
    playerTurnInfo.innerText = `${currentPlayer.name}'s Turn`;
  }
  // check for winner
  const checkWinner = (arr) => {
    // winning array index combinations
    let winningIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // flatten gameBoardArr to only provide indexes of Xs and Os
    let Xindicies = arr.flatMap((value, index) => value === "X" ? index : []);
    let Oindicies = arr.flatMap((value, index) => value === "O" ? index : []);
    winningIndexes.forEach((value) => {
      // check if Xindices or Oindicies array contain any of the winning combinations
      if(value.every(value => Xindicies.includes(value))) {
        console.log("X WINS");
      }
      if(value.every(value => Oindicies.includes(value))) {
        console.log("O WINS");
      }
    })
  }
  return {initializePlayers, getCurrentPlayer, switchPlayers, checkWinner};
})();

const startGame = (() => {
  const startGameForm = document.getElementById("startGame");
  // event listener that gets user submitted names for players, initializes players, and starts game.
  startGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const main = document.getElementById("main");
    const startGameDiv = document.getElementById("startGameDiv");
    startGameDiv.style.display = "none";
    main.style.display = "grid";
    game.initializePlayers(startGameForm.player1Name.value,startGameForm.player2Name.value);
    e.target.reset();
    gameBoard();
  })
})();