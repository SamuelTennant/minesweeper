import { ElementFlags } from "typescript";
import Cell from "./cell";

export default class Grid {
  public readonly sideLength: number = 10;
  public cells: Cell[] = [];

  constructor(sideLength: number) {
    this.sideLength = sideLength;

    for (let x = 0; x < this.sideLength; x++) {
      for (let y = 0; y < this.sideLength; y++) {
        this.cells.push(new Cell(x, y));
      }
    }
  }

  // Reset grid for new game.
  public cleanup() {
    this.cells.forEach((cell) => {
      cell.cleanup();
    });
  }

  public calculateNeighbourMineCounts() {
    this.cells.forEach((cell) => {
      cell.calculateNeighbourMineCount();
    });
  }

  public getCell(x: number, y: number): Cell | null {
    return this.cells[x * this.sideLength + y];
  }

  public revealAllMines() {
    this.cells.forEach((cell) => {
      if (cell.isMine) {
        cell.cellElement.classList.add("revealed-mine");
      }
    });
  }
}
