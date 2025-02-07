// import { Ship } from './ship.js';
// import { Board } from './board.js';
import { Player } from './player.js';
class App {
  constructor(boardSize, maxShipLength, maxShips) {
    this._boardSize = boardSize;
    this._maxShipLength = maxShipLength;
    this._maxShips = maxShips;
  }

  get boardSize() {
    return this._boardSize;
  }
  set boardSize(newBoardSize) {
    this._boardSize = newBoardSize;
  }
  get maxShipLength() {
    return this._maxShipLength;
  }
  set maxShipLength(newMaxShipLength) {
    this._maxShipLength = newMaxShipLength;
  }
  get maxShips() {
    return this._maxShips;
  }
  set maxShips(newMaxShips) {
    this._maxShips = newMaxShips;
  }

  firstPlayer;
  secondPlayer;

  // Экземпляр класса Игрока, кол-во кораблей и макс длину корабля
  shipArrangement(player, maxShips, maxShipLength) {
    for (let i = 0; i < maxShips; i++) {
      let shipName = prompt('Введите имя корабля');
      let shipLength = Number.parseInt(prompt('Введите длину корабля'));
      if (shipLength > maxShipLength) {
        throw new Error('Превышена длина корабля');
      }
      let location = Number.parseInt(
        prompt('Введите расположение (vertical = 1 horizontal = 0)')
      );
      let x = Number.parseInt(prompt('X координата корабля'));
      let y = Number.parseInt(prompt('Y координата корабля'));
      let startPosition = { x: x, y: y };

      player.placeShips(shipName, shipLength, location, startPosition);
    }
  }
  run() {
    this.firstPlayer = new Player('Arthur', 5);
    app.shipArrangement(this.firstPlayer, 1, 3);
    this.firstPlayer.board.display();
    this.secondPlayer = new Player('Bot', 5);
    app.shipArrangement(this.secondPlayer, 1, 2);
    this.secondPlayer.board.display();
    while (
      !this.firstPlayer.board.ships.every(ship => ship.isSunk()) &&
      !this.secondPlayer.board.ships.every(ship => ship.isSunk())
    ) {
      this.firstPlayer.takeTurn(this.secondPlayer);

      // Проверяем, не потоплены ли все корабли второго игрока
      if (this.secondPlayer.board.ships.every(ship => ship.isSunk())) {
        console.log(`${this.firstPlayer.name} выиграл!`);
        break;
      }

      this.secondPlayer.takeTurn(this.firstPlayer);

      // Проверяем, не потоплены ли все корабли первого игрока
      if (this.firstPlayer.board.ships.every(ship => ship.isSunk())) {
        console.log(`${this.secondPlayer.name} выиграл!`);
        break;
      }
    }
  }
}

console.log('%cEXERCISE 4', 'color: green; font-weight: bold;');

const app = new App(5, 3, 1);
// const player = new Player('Arthur', 5);
// app.shipArrangement(player, 1, 3);

app.run();
