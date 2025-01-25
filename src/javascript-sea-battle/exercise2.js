class Board {
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

  display() {
    for (let row of this._grid) {
      console.log(row);
    }
  }
}
function placeShip(ship, x, y) {
  const boardSize = board.size;
  const shipLength = ship.length;

  // Проверка, помещается ли корабль в заданные координаты
  if (
    (ship.location === 'vertical' && y + shipLength > boardSize) ||
    (ship.location === 'horizontal' && x + shipLength > boardSize)
  ) {
    throw new Error('Ship does not fit on the board.');
  }

  // Проверка, не пересекается ли корабль с другими кораблями
  for (let i = 0; i < shipLength; i++) {
    const currentX = ship.location === 'horizontal' ? x + i : x;
    const currentY = ship.location === 'vertical' ? y + i : y;
    if (board.grid[currentY][currentX] !== null) {
      throw new Error('Ship overlaps with another ship.');
    }
  }

  // Размещение корабля на поле
  for (let i = 0; i < shipLength; i++) {
    const currentX = ship.location === 'horizontal' ? x + i : x;
    const currentY = ship.location === 'vertical' ? y + i : y;

    board.grid[currentY][currentX] = ship.name;
  }

  // Сохраняем начальную позицию корабля
  ship.startPosition = { x, y };

  board.ships.push(ship);

  console.log(`${ship.name} Start position at (${x}, ${y}) ${ship.location}`);
}

//Возвращает массив объектов с x и y - пустые клетки поля
function findAvailableCells() {
  const availableCeils = [];
  for (let y = 0; y < board.grid.length; y++) {
    for (let x = 0; x < board.grid[y].length; x++) {
      if (board.grid[x][y] === null) {
        availableCeils.push({ x, y });
      }
    }
  }
  return availableCeils;
}
function receiveAttack(x, y) {
  for (const ship of board.ships) {
    const { startPosition, length, location, hits } = ship;

    // Определяем диапазон координат корабля
    if (location === 'horizontal') {
      if (
        y === startPosition.y &&
        x >= startPosition.x &&
        x < startPosition.x + length
      ) {
        const hitIndex = x - startPosition.x;
        hits[hitIndex] = true; // Помечаем часть корабля как поврежденную
        console.log(`Hit on ${ship.name} at (${x}, ${y})`);
        return true;
      }
    } else if (location === 'vertical') {
      if (
        x === startPosition.x &&
        y >= startPosition.y &&
        y < startPosition.y + length
      ) {
        const hitIndex = y - startPosition.y;
        hits[hitIndex] = true; // Помечаем часть корабля как поврежденную
        console.log(`Hit on ${ship.name} at (${x}, ${y})`);
        return true;
      }
    }
  }

  console.log(`Missed at (${x}, ${y})`);
  return false; // Возвращаем false, если по этим координатам нет корабля
}

function display() {
  const boardDisplay = board.grid.map((row, y) => {
    return row.map((cell, x) => {
      // Проверяем, является ли клетка частью корабля
      for (const ship of board.ships) {
        const { startPosition, length, location, hits } = ship;

        if (location === 'horizontal') {
          if (
            y === startPosition.y &&
            x >= startPosition.x &&
            x < startPosition.x + length
          ) {
            const index = x - startPosition.x;
            return hits[index] ? 'X' : 'S';
          }
        } else if (location === 'vertical') {
          if (
            x === startPosition.x &&
            y >= startPosition.y &&
            y < startPosition.y + length
          ) {
            const index = y - startPosition.y;
            return hits[index] ? 'X' : 'S';
          }
        }
      }
      // Если клетка не занята кораблем, возвращаем символ пустой клетки
      return 'O';
    });
  });

  boardDisplay.forEach(row => console.log(row.join(' ')));
}
console.log('Exercise2')
const boardSize = parseInt(prompt('Введите размер поля:', '5'), 10);
const board = new Board(boardSize);
const shipTest = new Ship('ShipTest', 3, 1);
placeShip(shipTest, 0, 0);
console.log('Размер доски:', board.size);
const attackResult = receiveAttack(0, 1);
console.log('Результат атаки по координатам (0,1):', attackResult);

display();
