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

      this.reveal();
    });

    this._cellElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      this.toggleFlagged();
    });

    GameManager.gameContainerElement.appendChild(this._cellElement);
  }

  public cleanup() {
    // Remove cell from DOM.
    this._cellElement.remove();
  }

  public toggleFlagged() {
    this._isFlagged = !this._isFlagged;
    this._cellElement.classList.toggle('flagged');
  }

  public reveal() {
    this._isRevealed = true;
    if (this._isFlagged) this.toggleFlagged();

    if (this._isMine) {
      this._cellElement.classList.add('revealed-mine');

      // End game.
      setTimeout(() => {
        alert('Game over!');
        GameManager.getInstance().startGame(10);
      }, 2000);
    } else {
      this._cellElement.classList.add('revealed-not-mine');
    }
  }
}
