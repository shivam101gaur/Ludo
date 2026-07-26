import { Component, signal } from '@angular/core';
import { GameHomeComponent } from '../game-home/game-home.component';

export interface BoardCell {
  id: string;
  x: number;
  y: number;
  span?: number;
  type: 'path' | 'base' | 'goal-center' | 'safe-zone';
  color?: 'red' | 'green' | 'blue' | 'yellow';
}

@Component({
  selector: 'app-layout',
  imports: [GameHomeComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public boardCells: BoardCell[] = this.generateBoard();

  redOpen = signal(false);
  greenOpen = signal(false);
  blueOpen = signal(false);
  yellowOpen = signal(false);

  toggleRed() {
    this.redOpen.update(v => !v);
  }

  toggleGreen() {
    this.greenOpen.update(v => !v);
  }

  toggleBlue() {
    this.blueOpen.update(v => !v);
  }

  toggleYellow() {
    this.yellowOpen.update(v => !v);
  }

  private generateBoard(): BoardCell[] {
    const cells: BoardCell[] = [];

    for (let y = 1; y <= 15; y++) {
      for (let x = 1; x <= 15; x++) {

        // 1. Top-Left Base (Red)
        if (x <= 6 && y <= 6) {
          // Only create ONE cell at the top-left coordinate, tell it to span 6
          if (x === 1 && y === 1) {
            cells.push({ id: 'base-tl', x, y, span: 6, type: 'base', color: 'red' });
          }
          continue; // Skip the other 35 cells in this 6x6 area
        }

        // 2. Top-Right Base (Green)
        if (x >= 10 && y <= 6) {
          if (x === 10 && y === 1) {
            cells.push({ id: 'base-tr', x, y, span: 6, type: 'base', color: 'green' });
          }
          continue;
        }

        // 3. Bottom-Left Base (Blue)
        if (x <= 6 && y >= 10) {
          if (x === 1 && y === 10) {
            cells.push({ id: 'base-bl', x, y, span: 6, type: 'base', color: 'blue' });
          }
          continue;
        }

        // 4. Bottom-Right Base (Yellow)
        if (x >= 10 && y >= 10) {
          if (x === 10 && y === 10) {
            cells.push({ id: 'base-br', x, y, span: 6, type: 'base', color: 'yellow' });
          }
          continue;
        }

        // 5. Center Goal Area (3x3)
        // Spans coordinates 7, 8, 9 on both X and Y axes
        if (x >= 7 && x <= 9 && y >= 7 && y <= 9) {
          if (x === 7 && y === 7) {
            cells.push({ id: 'goal-center', x, y, span: 3, type: 'goal-center' });
          }
          continue; // Skip the other 8 cells in this 3x3 area
        }

        // 5. Standard Path Cells
        cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path' });
      }
    }
    return cells;
  }
}
