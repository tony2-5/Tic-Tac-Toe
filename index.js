/* gameboard module */
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
        game.checkWinner(gameBoardArr);
        game.switchPlayers();
      }
    })
  })
};

/* player object */
const player = (name, identifier) => {
  return {name, identifier};
}

const game = (() => {

  /* initialize two player objects */
  const players = [];
  let currentPlayer;
  const playerTurnInfo = document.getElementById("playerTurn");
  const initializePlayers = (player1Name, player2Name) => {
    players.push(player(player1Name,"X"));
    players.push(player(player2Name,"O"));
    currentPlayer = players[0];
    playerTurnInfo.innerText = `${currentPlayer.name}'s Turn`;
  }

  /* get current player */
  const getCurrentPlayer = () => currentPlayer;

  /* switch player */
  const switchPlayers = () => { 
    currentPlayer = currentPlayer === players[0] ? players[1]:players[0];
    playerTurnInfo.innerText = `${currentPlayer.name}'s Turn`;
  }

  /* function for when winner is found */
  const winner = (draw) => {
    const main = document.getElementById("main");
    const endGameDiv = document.getElementById("endGame");
    const playerTurnInfo = document.getElementById("playerTurn");
    // hides player turn info in top left of page
    playerTurnInfo.style.display =  "none";
    // hides game board
    main.style.display = "none";
    // makes end game screen visible
    endGameDiv.style.display = "flex";
    // creating header for announcing winner and button for starting new game
    const h1 = document.createElement("h1");
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      location.reload();
    });
    button.setAttribute("id","newGame");
    button.innerText = "New Game";
    if(draw) {
      h1.innerText = "IT'S A DRAW!"
    } else {
      h1.innerText = `${game.getCurrentPlayer().name} WINS!`
    }
    // append winner and new game button to end game screen
    endGameDiv.append(h1,button);
  }

  /* check for winner */
  const checkWinner = (arr) => {
    // winning array index combinations
    let winningIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // flatten gameBoardArr to only provide indexes of Xs and Os
    let Xindicies = arr.flatMap((value, index) => value === "X" ? index : []);
    let Oindicies = arr.flatMap((value, index) => value === "O" ? index : []);
    for(let i = 0; i<winningIndexes.length;i++) {
      // check if Xindices or Oindicies array contain any of the winning combinations
      if(winningIndexes[i].every(value => Xindicies.includes(value))) {
        winner(false);
        break;
      }
      if(winningIndexes[i].every(value => Oindicies.includes(value))) {
        winner(false);
        break;
      }
      // draw functionality
      if(Xindicies.length === 5 && Oindicies.length === 4) {
        winner(true);
        break;
      }
    }
  }
  return {initializePlayers, getCurrentPlayer, switchPlayers, checkWinner};
})();

/* start game module */
const startGame = (() => {
  const startGameForm = document.getElementById("startGame");
  // event listener that gets user submitted names for players, initializes players, and starts game.
  startGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const main = document.getElementById("main");
    const startGameDiv = document.getElementById("startGameDiv");
    // remove starting screen
    startGameDiv.style.display = "none";
    // make game board visible
    main.style.display = "grid";
    //initialize players and start game
    game.initializePlayers(startGameForm.player1Name.value,startGameForm.player2Name.value);
    e.target.reset();
    gameBoard();
  })
})();