import { Player } from './player.js';

export class AIPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
    this.attackedCells = new Set();
  }

  placeShips(shipName, length) {
    let x, y, direction;
    let validPosition = false;

    while (!validPosition) {
      x = this.getRandomInt(0, this.boardSize - 1);
      y = this.getRandomInt(0, this.boardSize - 1);
      direction = Math.random() < 0.5 ? 0 : 1; // 0 - горизонтально, 1 - вертикально

      // Проверяем, не выходит ли корабль за границы
      if (
        (direction === 0 && y + length <= this.boardSize) || // Горизонтально
        (direction === 1 && x + length <= this.boardSize) // Вертикально
      ) {
        validPosition = true;
      }
    }

    super.placeShips(shipName, length, direction, { x, y });
    console.log(
      `AI разместил ${shipName} в (${x}, ${y}) ${
        direction === 0 ? 'горизонтально' : 'вертикально'
      }`
    );
  }

  // Случайная атака
  takeTurn(opponent) {
    let x, y;
    do {
      x = this.getRandomInt(0, this.boardSize - 1);
      y = this.getRandomInt(0, this.boardSize - 1);
    } while (this.attackedCells.has(`${x},${y}`));
    this.attackedCells.add(`${x},${y}`); // Добавляем в список атакованных
    const hit = opponent.board.receiveAttack(x, y);
    console.log(
      `AI атаковал (${x}, ${y}) и это ${hit ? 'попадание!' : 'промах!'}`
    );
    return { x, y, opponent };
  }

  // Генерация случайного числа
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Создаём AI игрока
// const ai = new AIPlayer('AIPlayer', 5);
// const ai2 = new AIPlayer('Second', 5);
// console.log(ai.name); // "AIPlayer"
// ai.placeShips('Test', 3);
// ai2.placeShips('Second', 3);
// console.table(ai.board.grid);
// ai.takeTurn(ai2);
