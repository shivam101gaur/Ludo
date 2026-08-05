import { Component, computed, input, InputSignal, model, ModelSignal, signal, Signal, WritableSignal } from '@angular/core';
import { PathPosition, Token } from '../../models/token.model';
import { getTokenGridCoordinates, isTokenSafe } from '../../utils/grid-path-mapper.util';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-token',
  imports: [CommonModule, FormsModule],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss',
  host: {
    '[style.grid-column]': 'token_().posX_()',
    '[style.grid-row]': 'token_().posY_()'
  }
})
export class TokenComponent {
  token_: InputSignal<Token> = input.required<Token>({ alias: 'token' });

}
