import GameManager from './game_manager';

export default class Cell {
  private readonly _x: number;
  private readonly _y: number;

  private _isMine: boolean;
  private _isFlagged: boolean = false;
  private _isRevealed: boolean = false;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');

    GameManager.gameContainerElement.appendChild(cellElement);
  }
}
