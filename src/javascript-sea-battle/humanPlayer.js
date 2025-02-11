import { Player } from './player.js';

export class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }
  placeShips(shipName, length, location, startPosition) {
    super.placeShips(shipName, length, location, startPosition);
  }
  takeTurn(opponent) {
    super.takeTurn(opponent);
  }
}


console.log('%cEXERCISE 5', 'color: green; font-weight: bold;');
// let human = new HumanPlayer('Max', 5);
// console.log('Имя игрока:', human.name);
