import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-home',
  imports: [],
  templateUrl: './game-home.component.html',
  styleUrl: './game-home.component.scss',
})
export class GameHomeComponent {
  color = input.required<string>();
  tokens: string[] = ['A', 'B', 'C', 'D'];
}
