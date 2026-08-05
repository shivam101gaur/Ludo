import { Component, computed, input, InputSignal, model, ModelSignal, signal, Signal, WritableSignal } from '@angular/core';
import { PathPosition, Token } from '../../models/token.model';
import { getTokenGridCoordinates, isTokenSafe } from '../../utils/grid-path-mapper.util';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-token',
  imports: [  CommonModule, FormsModule ],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss',
  host: {
    '[style.grid-column]': 'posX_()',
    '[style.grid-row]': 'posY_()'
  }
})
export class TokenComponent  {
  token_: InputSignal<Token> = input.required<Token>({alias: 'token'});
  // isTokenInBase_: InputSignal<boolean> = input(false,{alias:'isTokenInBase'});
  // isInGoal_: InputSignal<boolean> = input(false,{alias:'isInGoal'});
  isInGoal_: Signal<boolean> = computed(() => this.token_()?.pathPosition === 55);
  isSafe_: Signal<boolean> = computed(() => (isTokenSafe(this.token_()?.pathPosition??-1)));     
  isTokenInBase_: Signal<boolean> = computed(() => this.token_()?.pathPosition === -1);
  posX_ = computed(()=>getTokenGridCoordinates(this.token_())?.x);
  posY_ = computed(()=>getTokenGridCoordinates(this.token_())?.y); 
   

}
