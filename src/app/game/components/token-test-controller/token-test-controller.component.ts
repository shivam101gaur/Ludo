import { JsonPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PathPosition, Token } from '../../models/token.model';
import { GameEngineService } from '../../services/game-engine.service';

@Component({
  selector: 'app-token-test-controller',
  imports: [JsonPipe, CommonModule, FormsModule],
  templateUrl: './token-test-controller.component.html',
  styleUrl: './token-test-controller.component.scss',
})
export class TokenTestControllerComponent {
  public gameEngineService = inject(GameEngineService);

  public color_ = input.required<string>({alias:'color'});
  
  public selectedTokenId_: WritableSignal<string | null> = signal<string | null>('0');
  public selectedToken_: Signal<Token | null | undefined> = computed(() => {
    return this.gameEngineService.tokens_()?.find(token => (token?.id === this.selectedTokenId_()))
  });
  constructor() { }

  public updateTokenPathPosition(newPathPosition: PathPosition): void {
    const tokenId = this.selectedTokenId_();
    const tokenToUpdate = { ...this.selectedToken_() };
    tokenToUpdate.pathPosition = newPathPosition;

    this.gameEngineService.tokens_.update((oldTokens) => {
      if (!tokenId) {
        console.warn('No token selected for updating path position.');
        return oldTokens;
      }
      const tokenIndex = oldTokens.findIndex(token => token.id === tokenId);
      if (tokenIndex === -1) {
        console.error(`Token with id ${tokenId} not found.`);
        return oldTokens;
      }
      const updatedToken = { ...oldTokens[tokenIndex], pathPosition: newPathPosition };
      const updatedTokens = [...oldTokens];
      updatedTokens[tokenIndex] = updatedToken;
      return updatedTokens;
    });
  }
}
