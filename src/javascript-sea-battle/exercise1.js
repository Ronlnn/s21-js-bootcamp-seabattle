class Ship {
  constructor(name, length, location) {
    this._name = name;
    this._length = length;
    this._location = location === 1 ? 'vertical' : 'horizontal';
    this._hits = Array(length).fill(false); // Создаем массив и инициализируем false
    this._startPosition = {
      x: 0,
      y: 0,
    }; // Стартовая позиция корабля
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
  get length() {
    return this._length;
  }
  set length(newLength) {
    if (newLength > 0) {
      this._length = newLength;
      this._hits = Array(newLength).fill(false); // Обновляем массив hits под новую длину корабля
    } else {
      throw new Error('Length must be more than 0');
    }
  }
  get location() {
    return this._location;
  }
  set location(newLocation) {
    this._location = newLocation;
  }
  get hits() {
    return this._hits;
  }
  set hits(newHits) {
    if (Array.isArray(newHits) && newHits.length === this._length) {
      this._hits = newHits;
    } else {
      throw new Error('Hits must be array and the same length as ship');
    }
  }
  get startPosition() {
    return this._startPosition;
  }
  set startPosition(newPosition) {
    if (
      newPosition &&
      typeof newPosition.x === 'number' &&
      typeof newPosition.y === 'number'
    ) {
      this._startPosition = newPosition;
    } else {
      throw new Error('startPosition must be object and x/y must be numbers');
    }
  }
  get startX() {
    return this._startPosition.x;
  }
  set startX(newX) {
    if (typeof newX === 'number') {
      this._startPosition.x = newX;
    } else {
      throw new Error('startX must be number');
    }
  }
  get startY() {
    return this._startPosition.y;
  }
  set startY(newY) {
    if (typeof newY === 'number') {
      this._startPosition.y = newY;
    } else {
      throw new Error('startY must be number');
    }
  }
  hit(index) {
    if (index >= 0 && index < this._length) {
      this.hits[index] = true;
    } else {
      throw new Error('Index outs of bounds');
    }
  }
  isSunk() {
    if (this._hits.every(num => num === true)) {
      return true;
    }
    return false;
  }
}

function createShipWithPrompt() {
  const name = prompt(
    'Как корабль назовешь, так он и поплывет:',
    'Месть Королевы Анны'
  );
  const length = 5;
  const location = 1;

  const ship = new Ship(name, length, location);

  ship.hit(0);
  ship.hit(1);

  console.log(
    `${ship.name}, ${ship.length}, ${ship.location}, ${ship.isSunk()}`
  );

  return ship;
}
console.log('Exercise1')
createShipWithPrompt();
