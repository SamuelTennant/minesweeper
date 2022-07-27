import GameManager from './game_manager';

export default class Cell {
  private readonly _x: number;
  private readonly _y: number;

  private _cellElement: HTMLElement;
  private _isMine: boolean;
  private _isFlagged: boolean = false;
  private _isRevealed: boolean = false;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;

    this._cellElement = document.createElement('div');
    this._cellElement.classList.add('cell');

    this._cellElement.addEventListener('click', (e) => {
      e.preventDefault();

      // Do some checks and reveal.
    });

    this._cellElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      // Flag or unflag.
      if (this._isFlagged) {
        this._isFlagged = false;
        this._cellElement.classList.remove('flagged');
      } else {
        this._isFlagged = true;
        this._cellElement.classList.add('flagged');
      }
    });

    GameManager.gameContainerElement.appendChild(this._cellElement);
  }

  public cleanup() {
    // Remove cell from DOM.
    this._cellElement.remove();
  }
}
