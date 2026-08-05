import { Component, computed, inject, Signal, signal } from '@angular/core';
import { GameHomeComponent } from '../game-home/game-home.component';
import { BoardCell } from '../../models/game-board.model';
import { TokenComponent } from '../token/token.component';
import { GameEngineService } from '../../services/game-engine.service';
import { PathPosition, Token } from '../../models/token.model';
import { FormsModule } from "@angular/forms";
import { DiceRollComponent } from '../dice-roll/dice-roll.component';
import { DiceXComponent } from "../dice-x/dice-x.component";

@Component({
  selector: 'app-layout',
  imports: [GameHomeComponent, TokenComponent, FormsModule, DiceRollComponent, DiceXComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public gameEngineService = inject(GameEngineService);
  public boardCells: BoardCell[] = this.generateBoard();
  public tokenOnPath_: Signal<Token[]> = computed(() => {
    return this.gameEngineService.tokens?.filter(token => !token.isTokenInBase_() && !token.isInGoal_()) ?? []
  });

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

        if (y == 8 && x >= 2 && x <= 6) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'red', isSafeZone: true });
          continue;
        }
        if (y == 8 && x >= 10 && x <= 14) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'yellow', isSafeZone: true });
          continue;
        }
        if (x == 8 && y >= 2 && y <= 6) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'green', isSafeZone: true });
          continue;
        }
        if (x == 8 && y >= 10 && y <= 14) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'blue', isSafeZone: true });
          continue;
        }

        //red starting point
        if (x == 2 && y == 7) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'red', isSafeZone: true });
          continue;
        }
        //green starting point
        if (x == 9 && y == 2) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'green', isSafeZone: true });
          continue;
        }
        //blue starting point
        if (x == 7 && y == 14) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'blue', isSafeZone: true });
          continue;
        }
        //yellow starting point
        if (x == 14 && y == 9) {
          cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path', color: 'yellow', isSafeZone: true });
          continue;
        }

        // 5. Standard Path Cells
        cells.push({ id: `cell-${x}-${y}`, x, y, type: 'path' });
      }
    }
    return cells;
  }
}
