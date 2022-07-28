import GameManager from "./game_manager";

export default class Cell {
  public neighbourMineCount: number = 0;

  private readonly _x: number;
  private readonly _y: number;

  private _cellElement: HTMLElement;
  private _textElement: HTMLElement;
  private _isMine: boolean;
  private _isFlagged: boolean = false;
  private _isRevealed: boolean = false;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;

    this._cellElement = document.createElement("div");
    this._cellElement.classList.add("cell");
    this._textElement = document.createElement("p");
    this._cellElement.appendChild(this._textElement);

    this._cellElement.addEventListener("click", (e) => {
      e.preventDefault();

      if (this._isRevealed) return;
      this.reveal();
    });

    this._cellElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (this._isRevealed) return;
      this.toggleFlagged();
    });

    GameManager.getInstance().gameContainerElement.appendChild(
      this._cellElement
    );

    // TEMPORARY: 20% chance of being a mine.
    this._isMine = Math.random() < 0.2;
  }

  public cleanup() {
    // Remove cell from DOM.
    this._cellElement.remove();
  }

  public toggleFlagged() {
    this._isFlagged = !this._isFlagged;
    this._cellElement.classList.toggle("flagged");
  }

  public reveal() {
    this._isRevealed = true;
    if (this._isFlagged) this.toggleFlagged();

    // Call recursively.
    const neighbours = this.getNonDiagonalNeighbours();
    neighbours.forEach((cell) => {
      if (!cell._isMine && !cell._isRevealed && cell.neighbourMineCount != 0)
        cell.reveal();
    });

    if (this._isMine) {
      this._cellElement.classList.add("revealed-mine");

      // End game.
      setTimeout(() => {
        alert("Game over!");
        GameManager.getInstance().startGame(10);
      }, 2000);
    } else {
      if (this.neighbourMineCount != 0)
        this._textElement.textContent = this.neighbourMineCount.toString();
      this._cellElement.classList.add("revealed-not-mine");
    }
  }

  public getNeighbours(): Cell[] {
    const neighbours: Cell[] = [];

    for (let x = this._x - 1; x <= this._x + 1; x++) {
      for (let y = this._y - 1; y <= this._y + 1; y++) {
        if (x == this._x && y == this._y) continue;

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

        const cell = GameManager.getInstance().grid.getCell(x, y);
        if (cell) neighbours.push(cell);
      }
    }

    return neighbours;
  }

  public calculateNeighbourMineCount(): number {
    this.getNeighbours().forEach((cell) => {
      if (cell._isMine) this.neighbourMineCount++;
    });

    return this.neighbourMineCount;
  }
}
