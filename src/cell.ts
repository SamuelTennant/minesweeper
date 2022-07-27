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

    cellElement.addEventListener('click', (e) => {
      e.preventDefault();

      // Do some checks and reveal.
    });

    cellElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      // Flag or unflag.
      if (this._isFlagged) {
        this._isFlagged = false;
        cellElement.classList.remove('flagged');
      } else {
        this._isFlagged = true;
        cellElement.classList.add('flagged');
      }
    });

    GameManager.gameContainerElement.appendChild(cellElement);
  }
}
