import { computed, DestroyRef, effect, inject, Service, Signal, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { DiceState, DiceValue } from '../models/dice.model';
import { DEFAULT_PLAYERS } from '../constants/players.constants';
import { Token } from '../models/token.model';
import { INITIAL_TOKENS } from '../constants/tokens.constants';
import { Player, PlayerIndex } from '../models/player.model';
import { DEFAULT_DICE_STATE } from '../constants/dice.constants';

@Service()
export class GameEngineService {
  readonly players_ = signal<readonly Player[]>(DEFAULT_PLAYERS);
  public activePlayerIndex_ = signal<PlayerIndex>(0);
  public activePlayer_: Signal<Player> = computed(() => this.players_()[this.activePlayerIndex_()]);
  private extraTurn: number = 0;
  public activePlayerTokens = computed(()=>this.tokens.filter(({playerIndex})=>(playerIndex === this.activePlayerIndex_())));

  public showDiceLayer_ = signal<boolean>(true);

  public diceState_ = signal<DiceState>(DEFAULT_DICE_STATE);

  public readonly tokens: readonly Token[] = INITIAL_TOKENS;
  // B. Spatial Index now holds direct memory references to the Tokens!
  private readonly _mainTrackOccupancyMap = signal<Record<number, Token[]>>({});

  constructor() {
    this.loadGameStateFromLocalStorage();
    inject(DestroyRef).onDestroy(() => {
      this.OnDestroy();
    });

    effect(() => {
      const activePlayerIndex = this.activePlayerIndex_();
      this.diceState_.set(DEFAULT_DICE_STATE);
    });
  }

  public moveToken(tokenId: string, newPathPosition: number): void {

  }

  public rollDice(diceRolledValue: number): void {
    const {
      diceRollHistory,
      rolledValue,
      consecutiveSixesCount
    } = this.diceState_();
    this.extraTurn -= 1;
    if(diceRolledValue>=1 && diceRolledValue<=6) {
      this.handleDiceRoll(diceRolledValue as DiceValue)
    } 
  }

  private handleDiceRoll(diceRolledValue: DiceValue): void {
     const activePlayerIndex = this.activePlayerIndex_();
     this.diceState_.update(state=>(
      {
        ...state,
        rolledValue:diceRolledValue,
        diceRollHistory : [...state.diceRollHistory, diceRolledValue],
        consecutiveSixesCount:diceRolledValue===6?(state.consecutiveSixesCount?? 0 )+1:state.consecutiveSixesCount
     }));
    // TODO handle token movement
    this.activePlayerTokens

    if(this.diceState_().consecutiveSixesCount===6){
      this.switchToNextPlayer();
    }
  }

  public updatePlayer(playerIndex: number, updatedPlayer: Partial<Player>): void {
    this.players_.update(oldPlayers => {

      if (![0, 1, 2, 3].includes(playerIndex)) {
        console.warn(`Attempted to update invalid playerIndex: ${playerIndex}`);
        return oldPlayers; // Exit immediately, saving performance
      }

      const players = [...oldPlayers];
      const oldPlayerToUpdate = players[playerIndex];
      if (!oldPlayerToUpdate) {
        console.error(`Player at index ${playerIndex} does not exist.`);
        return oldPlayers; // Return the old players array if the player doesn't exist
      }
      const {
        id: playerId, // avoid player id to update
        playerIndex: oldPlayerIndex, // avoid player index to update
        ...safePlayerUpdates
      } = updatedPlayer; // Destructure to ensure we don't accidentally overwrite properties
      players[playerIndex] = { ...oldPlayerToUpdate, ...safePlayerUpdates };
      return players;
    });
  }

  private getNextPathPosition(currentPathPosition: number, rolledDiceValue: DiceValue): number {
    return currentPathPosition + rolledDiceValue;
  }

  private switchToNextPlayer(): void {
    const currentIndex = this.activePlayerIndex_();
    const nextIndex = this.getNextPlayerIndex(currentIndex);
    this.activePlayerIndex_.set(nextIndex);
  }

  private getNextPlayerIndex(currentIndex: PlayerIndex): PlayerIndex {
    return (currentIndex + 1) % this.players_().length as PlayerIndex;
  }

  private OnDestroy(): void {
    // logic when the service is destroyed, if needed
    //TODO: Store the game state to local storage or perform cleanup tasks
    this.saveGameStateToLocalStorage();
  }

  private loadGameStateFromLocalStorage(): void {
    return;
    // TODO : Write complete logic to load the game state from local storage
    // const savedGameState = //read from localstorage utils
    // if (savedGameState) {
    //   try {
    //     const parsedState = JSON.parse(savedGameState);
    //     if (parsedState.players && parsedState.diceState) {
    //       this.players_.set(parsedState.players);
    //       this.diceState_.set(parsedState.diceState);
    //     }
    //   } catch (error) {
    //     console.error('Failed to parse game state from local storage:', error);
    //   }
    // }
  }

  private saveGameStateToLocalStorage(): void {
    return;
    //save to localStorage utils
  }
}
