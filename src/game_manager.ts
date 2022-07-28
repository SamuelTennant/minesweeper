import Grid from "./grid";

export default class GameManager {
  public gameContainerElement: HTMLElement;
  public grid: Grid;

  private static _instance: GameManager;

  private _gameOver: boolean = false;
  private _sideLength: number = 10;

  private constructor() {
    this.gameContainerElement = document.getElementById("game-container")!;
  }

  public static getInstance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }

    return GameManager._instance;
  }

  public startGame(gridSize: number) {
    this._sideLength = gridSize;
    this._gameOver = false;

    // If grid already exists, delete nodes.
    if (this.grid) {
      this.grid.cleanup();
    }

    this.grid = new Grid(this._sideLength);
    this.grid.calculateNeighbourMineCounts();
    this.gameContainerElement.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    this.gameContainerElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  }

  public handleMineExploded() {
    if (this._gameOver) return;
    this._gameOver = true;

    this.grid.revealAllMines();

    setTimeout(() => {
      alert("Game over!");
      this.startGame(this._sideLength);
    }, 2000);
  }

  public checkIfWon() {
    if (this._gameOver) return;

    let hasWon = true;

    this.grid.cells.forEach((cell) => {
      if (!cell.isRevealed && !cell.isMine) {
        hasWon = false;
      }

      if (!cell.isFlagged && cell.isMine) {
        hasWon = false;
      }
    });

    if (hasWon) {
      setTimeout(() => {
        alert("You won!");
        this.startGame(this._sideLength);
      }, 500);
    }
  }
}
