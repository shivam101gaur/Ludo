import { Component, computed, inject, input, signal, Signal, WritableSignal} from '@angular/core';
import { TokenComponent } from '../token/token.component';
import { PathPosition, Token } from '../../models/token.model';
import { GameEngineService } from '../../services/game-engine.service';
import { TokenTestControllerComponent } from '../token-test-controller/token-test-controller.component';
import { DiceRollComponent } from "../dice-roll/dice-roll.component";
import { DiceXComponent } from "../dice-x/dice-x.component";

@Component({
  selector: 'app-game-home',
  imports: [TokenComponent, TokenTestControllerComponent, DiceRollComponent, DiceXComponent],
  templateUrl: './game-home.component.html',
  styleUrl: './game-home.component.scss',
})
export class GameHomeComponent {
  public gameEngineService = inject(GameEngineService);
  
  public color_ = input.required<string>({alias:'color'});

  public tokens_: Signal<Token[]> = computed(()=>{
   return this.gameEngineService.tokens_()?.filter(token=>( token?.pathPosition === -1 && token?.color === this.color_()) ?? [])
  });


}
