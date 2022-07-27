import Grid from './grid';

export default class GameManager {
  public static gameContainerElement: HTMLElement;

  private static _instance: GameManager;

  private _grid: Grid;

  private constructor() {
    GameManager.gameContainerElement =
      document.getElementById('game-container')!;
  }

  public static getInstance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }

    return GameManager._instance;
  }

  public startGame(gridSize: number) {
    // If grid already exists, delete nodes.

    this._grid = new Grid(gridSize);
    GameManager.gameContainerElement.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    GameManager.gameContainerElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  }
}
