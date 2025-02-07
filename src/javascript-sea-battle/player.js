import { Board } from './board.js';
import { Ship } from './ship.js';

export class Player {
  constructor(name, boardSize) {
    this._name = name;
    this._boardSize = boardSize;
    this._board = new Board(boardSize);
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    if (newName.length < 1) {
      throw new Error('New name must be more than 1');
    }
    this._name = newName;
  }
  get boardSize() {
    return this._boardSize;
  }
  set boardSize(newBoardSize) {
    if (newBoardSize > 0 && typeof newBoardSize === 'number') {
      this._boardSize = newBoardSize;
    }
  }
  get board() {
    return this._board;
  }
  set board(newBoard){
    this._board = newBoard;
  }

  placeShips(shipName, length, location, startPosition) {
    if (
      !startPosition ||
      typeof startPosition.x !== 'number' ||
      typeof startPosition.y !== 'number'
    ) {
      throw new Error('Начальная позиция должна быть объектом {x, y}');
    }
    const myShip = new Ship(shipName, length, location);
    this._board.placeShip(myShip, startPosition.x, startPosition.y);
  }
  takeTurn(opponent) {
    let input = prompt('Введите координаты атаки в формате x y');
    let [x, y] = input.split(' ').map(Number);
    if (isNaN(x) || isNaN(y)) {
      console.log('Некорректный ввод. Попробуйте снова.');
      return this.takeTurn(opponent);
    }
    const hit = opponent.board.receiveAttack(x, y);
    console.log(hit ? 'Попадание!' : 'Промах!');
    return { x, y, opponent };
  }
}
console.log('%cEXERCISE 3', 'color: green; font-weight: bold;');

// Запрос имени и размера доски
// const input = prompt('Введите имя игрока и размер доски (пример: Arthur 5)');
// const [playerName, boardSizeStr] = input.split(' ');
// const boardSize = Number(boardSizeStr);
// const player1 = new Player(playerName, boardSize);
// console.log(`${player1.name}, ${player1.boardSize}`);
// player1.placeShips('Destroyer', 3, 1, { x: 1, y: 1 });
// console.table(player1.board.grid);

// const input2 = prompt('Введите имя игрока и размер доски (пример: Arthur 5)');
// const [playerName2, boardSizeStr2] = input2.split(' ');
// const boardSize2 = Number(boardSizeStr2);
// const player2 = new Player(playerName2, boardSize2);
// console.log(`${player2.name}, ${player2.boardSize}`);
// player2.placeShips('Full', 3, 1, { x: 2, y: 2 });
// console.table(player2.board.grid);

// player1.takeTurn(player2);
