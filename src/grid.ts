import Cell from "./cell";

export default class Grid {
  private readonly _sideLength: number = 10;

  private _cells: Cell[] = [];

  constructor(sideLength: number) {
    this._sideLength = sideLength;

    for (let x = 0; x < this._sideLength; x++) {
      for (let y = 0; y < this._sideLength; y++) {
        this._cells.push(new Cell(x, y));
      }
    }
  }

  // Reset grid for new game.
  public cleanup() {
    this._cells.forEach((cell) => {
      cell.cleanup();
    });
  }

  public calculateNeighbourMineCounts() {
    this._cells.forEach((cell) => {
      cell.calculateNeighbourMineCount();
    });
  }

  public getCell(x: number, y: number): Cell | null {
    return this._cells[x * this._sideLength + y];
  }
}
