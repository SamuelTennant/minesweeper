import Grid from "./grid";

export default class GameManager {
  private static _instance: GameManager;

  public gameContainerElement: HTMLElement;
  public grid: Grid;

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
    // If grid already exists, delete nodes.
    if (this.grid) {
      this.grid.cleanup();
    }

    this.grid = new Grid(gridSize);
    this.grid.calculateNeighbourMineCounts();
    this.gameContainerElement.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    this.gameContainerElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  }
}
