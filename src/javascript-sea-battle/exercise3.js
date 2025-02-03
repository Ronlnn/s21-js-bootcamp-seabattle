import { Board } from './exercise2.js';
import { Ship } from './exercise1.js';

class Player {
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

  placeShips(shipName, length, isVertical, startPosition) {
    if (
      !startPosition ||
      typeof startPosition.x !== 'number' ||
      typeof startPosition.y !== 'number'
    ) {
      throw new Error('Начальная позиция должна быть объектом {x, y}');
    }
    const orientation = isVertical ? 1 : 0;
    const myShip = new Ship(shipName, length, orientation);
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

// Запрос имени и размера доски
const input = prompt('Введите имя игрока и размер доски (пример: Arthur 5)');
const [playerName, boardSizeStr] = input.split(' ');
const boardSize = Number(boardSizeStr);

if (!playerName || isNaN(boardSize)) {
  throw new Error('Неверный ввод. Укажите имя и размер доски.');
}

console.log('%cEXERCISE 3', 'color: green; font-weight: bold;');


// Создание игрока
const player1 = new Player(playerName, boardSize);
console.log(`${player1.name}, ${player1.boardSize}`);

// Пример размещения корабля
player1.placeShips('Destroyer', 3, 1, { x: 1, y: 1 });
console.table(player1.board.grid);
