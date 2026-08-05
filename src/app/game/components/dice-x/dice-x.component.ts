import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dice-x',
  imports: [],
  templateUrl: './dice-x.component.html',
  styleUrl: './dice-x.component.scss',
})
export class DiceXComponent {
  // 1. New Signals for movement and bouncing
  public diceRotation_ = signal<string>('rotateX(0deg) rotateY(0deg)');
  public diceTranslation_ = signal<string>('translate(0px, 0px)');
  public isRolling_ = signal<boolean>(false);

  private currentRotX = 0;
  private currentRotY = 0;

  public async rollDiceAndAnimate(): Promise<number> {
    return new Promise((resolve) => {
      // Lock UI and trigger the CSS bounce animation
      this.isRolling_.set(true);

      const result = Math.floor(Math.random() * 6) + 1;

      // --- 1. Calculate Rotation (from previous logic) ---
      let targetRotX = 0, targetRotY = 0;
      switch (result) {
        case 1: targetRotX = 0; targetRotY = 0; break;
        case 2: targetRotX = 0; targetRotY = -90; break;
        case 3: targetRotX = 0; targetRotY = 90; break;
        case 4: targetRotX = -90; targetRotY = 0; break;
        case 5: targetRotX = 90; targetRotY = 0; break;
        case 6: targetRotX = 0; targetRotY = 180; break;
      }

      this.currentRotX += (Math.floor(Math.random() * 3) + 2) * 360 + (targetRotX - (this.currentRotX % 360));
      this.currentRotY += (Math.floor(Math.random() * 3) + 2) * 360 + (targetRotY - (this.currentRotY % 360));

      // --- 2. Calculate Random Translation (Movement) ---
      // The boundary is 160px. The dice is 60px. 
      // Safe movement range is roughly -40px to +40px from the center.
      const randomX = Math.floor(Math.random() * 80) - 40;
      const randomY = Math.floor(Math.random() * 80) - 40;

      // --- 3. Apply Signals ---
      this.diceRotation_.set(`rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`);
      this.diceTranslation_.set(`translate(${randomX}px, ${randomY}px)`);

      // --- 4. Resolve and Cleanup ---
      setTimeout(() => {
        this.isRolling_.set(false); // Remove bounce class
        resolve(result); // Return the number to the game engine
      }, 1000);
    });
  }
}
