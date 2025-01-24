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
const board = new Board(5);
board.display();
