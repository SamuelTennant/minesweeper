import GameManager from "./game_manager";

export default class Cell {
  public neighbourMineCount: number = 0;
  public isMine: boolean;
  public isRevealed: boolean = false;
  public isFlagged: boolean = false;
  public cellElement: HTMLElement;

  private readonly _x: number;
  private readonly _y: number;

  private _textElement: HTMLElement;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;

    this.cellElement = document.createElement("div");
    this.cellElement.classList.add("cell");
    this._textElement = document.createElement("p");
    this.cellElement.appendChild(this._textElement);

    this.cellElement.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.isRevealed) return;
      this.reveal();
    });

    this.cellElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (this.isRevealed) return;
      this.toggleFlagged();
    });

    GameManager.getInstance().gameContainerElement.appendChild(
      this.cellElement
    );

    // TEMPORARY: 20% chance of being a mine.
    this.isMine = Math.random() < 0.2;
  }

  public cleanup() {
    // Remove cell from DOM.
    this.cellElement.remove();
  }

  public toggleFlagged() {
    this.isFlagged = !this.isFlagged;
    this.cellElement.classList.toggle("flagged");

    // Check if won.
    GameManager.getInstance().checkIfWon();
  }

  public reveal() {
    this.isRevealed = true;
    if (this.isFlagged) this.toggleFlagged();

    // Call recursively.
    const neighbours = this.getNonDiagonalNeighbours();
    neighbours.forEach((cell) => {
      if (!cell.isMine && !cell.isRevealed && cell.neighbourMineCount != 0)
        cell.reveal();
    });

    if (this.isMine) {
      this.cellElement.classList.add("revealed-mine");

      // End game.
      GameManager.getInstance().handleMineExploded();
    } else {
      if (this.neighbourMineCount != 0)
        this._textElement.textContent = this.neighbourMineCount.toString();
      this.cellElement.classList.add("revealed-not-mine");
    }

    // Check if game is won.
    GameManager.getInstance().checkIfWon();
  }

  public getNeighbours(): Cell[] {
    const neighbours: Cell[] = [];

    for (let x = this._x - 1; x <= this._x + 1; x++) {
      for (let y = this._y - 1; y <= this._y + 1; y++) {
        if (x == this._x && y == this._y) continue;

        // Prevent wrapping.
        if (x < 0 || x >= GameManager.getInstance().grid.sideLength) continue;
        if (y < 0 || y >= GameManager.getInstance().grid.sideLength) continue;

        const cell = GameManager.getInstance().grid.getCell(x, y);
        if (cell) neighbours.push(cell);
      }
    }

    return neighbours;
  }

  public getNonDiagonalNeighbours(): Cell[] {
    const neighbours: Cell[] = [];

    for (let x = this._x - 1; x <= this._x + 1; x++) {
      for (let y = this._y - 1; y <= this._y + 1; y++) {
        if (x == this._x && y == this._y) continue;
        if (x != this._x && y != this._y) continue;

        // Prevent wrapping.
        if (x < 0 || x >= GameManager.getInstance().grid.sideLength) continue;
        if (y < 0 || y >= GameManager.getInstance().grid.sideLength) continue;

        const cell = GameManager.getInstance().grid.getCell(x, y);
        if (cell) neighbours.push(cell);
      }
    }

    return neighbours;
  }

  public calculateNeighbourMineCount(): number {
    this.getNeighbours().forEach((cell) => {
      if (cell.isMine) this.neighbourMineCount++;
    });

    return this.neighbourMineCount;
  }
}
