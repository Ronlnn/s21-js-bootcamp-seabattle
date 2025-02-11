import { Player } from './player.js';

export class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }
  placeShips(shipName, length, location, startPosition) {
    super.placeShips(shipName, length, location, startPosition);
  }
  async takeTurn(opponent) {
    // await delay(1000);
    super.takeTurn(opponent);
  }
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
console.log('%cEXERCISE 5', 'color: green; font-weight: bold;');
// let human = new HumanPlayer('Max', 5);
// console.log('Имя игрока:', human.name);
