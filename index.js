const gameBoard = (() => {
  let gameBoardArr = []
  const main = document.getElementById("main");

  for(let i = 0; i<9; i++) {
    const div = document.createElement("div");
    gameBoardArr.push(div);
    main.appendChild(div);
  }

  gameBoardArr.forEach((element, index) => {
    element.addEventListener("click", (e) => {
      if(e.target.childNodes.length == 0) {
        const h1 = document.createElement("h1");
        h1.innerText = game.getCurrentPlayer().identifier;
        gameBoardArr[index] = game.getCurrentPlayer().identifier;
        console.log(gameBoardArr);
        game.switchPlayers();
        e.target.appendChild(h1);
        game.checkWinner(gameBoardArr);
      }
    })
  })
})();

const player = (name, identifier) => {
  return {name, identifier};
}

const game = (() => {
  const players = [player("player1","X"), player("player2","O")];
  let currentPlayer = players[0];
  const getCurrentPlayer = () => currentPlayer;
  const switchPlayers = () => { currentPlayer = currentPlayer === players[0] ? players[1]:players[0]; }
  const checkWinner = (arr) => {
    let winningIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let Xindicies = arr.flatMap((value, index) => value === "X" ? index : []);
    let Oindicies = arr.flatMap((value, index) => value === "O" ? index : []);
    winningIndexes.forEach((value) => {
      if(value.every(value => Xindicies.includes(value))) {
        console.log("X WINS");
      }
      if(value.every(value => Oindicies.includes(value))) {
        console.log("O WINS");
      }
    })
  }
  return {getCurrentPlayer, switchPlayers, checkWinner};
})();