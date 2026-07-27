import { Component, computed, input, model, ModelSignal, signal, Signal, WritableSignal } from '@angular/core';
import { PathPosition, Token } from '../../models/token.model';
import { isTokenSafe } from '../../utils/grid-path-mapper.util';

@Component({
  selector: 'app-token',
  imports: [],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss',
})
export class TokenComponent  {
  token_: ModelSignal<Token| undefined> = model<Token>();
  
  isTokenInBase_: Signal<boolean> = computed(() => this.token_()?.pathPosition === -1);
  isInGoal_: Signal<boolean> = computed(() => this.token_()?.pathPosition === 55);
  isSafe_: Signal<boolean> = computed(() => (isTokenSafe(this.token_()?.pathPosition??-1)));     
}
