import { Ship } from './exercise1.js';

export class Board {
  constructor(size) {
    this._size = size;
    this._grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    this._ships = [];
  }

  get size() {
    return this._size;
  }
  set size(newSize) {
    if (newSize > 0 && typeof newSize === 'number') {
      this._size = newSize;
      this._grid = Array(newSize)
        .fill(null)
        .map(() => Array(newSize).fill(null));
    } else {
      throw new Error('Size must be a positive number');
    }
  }
  get grid() {
    return this._grid;
  }
  set grid(newGrid) {
    // Проверка чтобы сетка была 2д и по размеру
    if (
      Array.isArray(newGrid) &&
      newGrid.length === this._size &&
      newGrid.every(row => Array.isArray(row) && row.length === this.size)
    ) {
      this._grid = newGrid;
    } else {
      throw new Error(
        'Grid must be a 2D array with dimensions matching the size'
      );
    }
  }
  get ships() {
    return this._ships;
  }

  set ships(newShips) {
    if (Array.isArray(newShips)) {
      this._ships = newShips;
    } else {
      throw new Error('Ships must be an array');
    }
  }

  placeShip(ship, x, y) {
    //Проверка на выход за границы поля по горизонту или вертикали
    if (
      (ship.location === 'horizontal' && y + ship.length > this._grid.length) ||
      (ship.location === 'vertical' && x + ship.length > this._grid.length)
    ) {
      throw new Error('Корабль выходит за пределы поля');
    }

    //Проверка на пересечение с другими кораблями
    for (let i = 0; i < ship.length; i++) {
      const posX = ship.location === 'vertical' ? x + i : x;
      const posY = ship.location === 'horizontal' ? y + i : y;

      if (this._grid[posX][posY] !== null) {
        throw new Error(
          `Position (${posX}, ${posY}) is already occupied by another ship!`
        );
      }
    }
    //Располагаем стартовую позицию корабля на доске
    for (let row = 0; row < this._grid.length; row++) {
      for (let col = 0; col < this._grid.length; col++) {
        for (let i = 0; i < ship.length; i++) {
          const posX = ship.location === 'vertical' ? x + i : x;
          const posY = ship.location === 'horizontal' ? y + i : y;
          if (row === posX && col === posY) {
            this._grid[posX][posY] = ship;
          }
        }
      }
    }
    ship.startX = x;
    ship.startY = y;
    console.log(ship.name, ship.startPosition);
  }

  findAvailableCells() {
    let result = [];
    for (let row = 0; row < this._grid.length; row++) {
      for (let col = 0; col < this._grid.length; col++) {
        if (this._grid[row][col] === null) {
          result.push({ row, col });
        }
      }
    }
    return result;
  }
  receiveAttack(x, y) {
    const cell = this._grid[x][y]; // Получаем объект корабля из клетки

    if (cell !== null && cell !== 'hit') {
      // Мы находим корабль, который находится в клетке
      const ship = cell; // Присваиваем корабль прямо из клетки

      let index;
      if (ship.location === 'vertical') {
        index = x - ship.startX;
      } else {
        index = y - ship.startY;
      }

      ship.hit(index); // Отметим попадание
      this._grid[x][y] = 'hit'; // Обозначаем попадание на поле
      return true; // Попадание
    }
    return false; // Промах
  }
}
function display() {
  for (let row = 0; row < board.grid.length; row++) {
    let line = ''; // Создаем строку для текущей строки поля
    for (let col = 0; col < board.grid[row].length; col++) {
      if (board.grid[row][col] === null) {
        line += 'O '; // Пустая клетка
      } else if (board.grid[row][col] instanceof Ship) {
        line += 'S '; // Корабль
      } else if (board.grid[row][col] === 'hit') {
        line += 'X '; // Попадание
      }
    }
    console.log(line.trim()); // Выводим строку
  }
}
console.log('%cEXERCISE 2', 'color: green; font-weight: bold;');

const board = new Board(5);
const myShip = new Ship('Ship', 3, 1);
board.placeShip(myShip, 1, 1);
console.log('Текущее поле после размещения корабля ');
console.table(board.grid);

console.log(board.receiveAttack(2, 1)); // Попадание в третью ячейку корабля
console.log(myShip.hits);
console.table(board.grid);
const availableCells = board.findAvailableCells();
console.log(`Свободных клеток: ${availableCells.length}`);
console.log(availableCells);

display();
