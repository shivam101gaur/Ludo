import { Component, inject, signal } from '@angular/core';
import { GameEngineService } from '../../services/game-engine.service';
import { CommonModule } from '@angular/common';
import { diceRollingTime } from '../../constants/dice.constants';

@Component({
  selector: 'app-dice-roll',
  imports: [CommonModule],
  templateUrl: './dice-roll.component.html',
  styleUrl: './dice-roll.component.scss',
})
export class DiceRollComponent {
  public gameEngineService = inject(GameEngineService);
  public diceState_ = this.gameEngineService.diceState_;
  constructor() {}

  // Signal bound to the dice [style.transform]
  public diceTransform_ = signal<string>('rotateX(0deg) rotateY(0deg)');

  // Keep track of total rotation so it never spins backward abruptly
  private currentRotX = 0;
  private currentRotY = 0;

  /**
   * Rolls the dice physically in 3D and returns the result asynchronously.
   * Drop this right into the executeTurnFlow() we discussed!
   */
  public async rollDiceAndAnimate() {
    const diceRolledValue: number =  await new Promise((resolve) => {
      // 1. Generate standard Ludo dice result (1-6)
      const result = Math.floor(Math.random() * 6) + 1;

      // 2. Base rotations required to face the camera based on our CSS
      let targetRotX = 0;
      let targetRotY = 0;

      switch (result) {
        case 1: targetRotX = 0;   targetRotY = 0;    break; // Front
        case 2: targetRotX = 0;   targetRotY = -90;  break; // Right
        case 3: targetRotX = 0;   targetRotY = 90;   break; // Left
        case 4: targetRotX = -90; targetRotY = 0;    break; // Top
        case 5: targetRotX = 90;  targetRotY = 0;    break; // Bottom
        case 6: targetRotX = 0;   targetRotY = 180;  break; // Back
      }

      // 3. Add random full spins (360deg * random 2 to 4 spins) to make it tumble
      const extraSpinsX = (Math.floor(Math.random() * 3) + 2) * 360;
      const extraSpinsY = (Math.floor(Math.random() * 3) + 2) * 360;

      // We add to current rotation to ensure continuous forward rolling
      this.currentRotX += extraSpinsX + (targetRotX - (this.currentRotX % 360));
      this.currentRotY += extraSpinsY + (targetRotY - (this.currentRotY % 360));

      // 4. Update the signal, which triggers the CSS transition immediately
      this.diceTransform_.set(`rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`);

      // 5. Resolve the promise exactly when the CSS animation finishes (1000ms)
      setTimeout(() => {
        resolve(result);
      }, diceRollingTime); 
    });

    this.gameEngineService.rollDice(diceRolledValue);
  }
}
