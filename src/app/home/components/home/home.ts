import { Component } from '@angular/core';
import { GameComponent } from '../../../game/components/game/game';

@Component({
  selector: 'app-home',
  imports: [GameComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }
