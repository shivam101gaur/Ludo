import { WritableSignal, Signal } from '@angular/core';
import { PlayerIndex } from './player.model';
import { getTokenGridCoordinates } from '../utils/grid-path-mapper.util';


// The raw data shape
export interface BaseToken {
  readonly id: string;
  readonly color: PlayerColor;
  readonly playerIndex: PlayerIndex;
}

// The fully reactive shape (Base + Signals)
export interface Token extends BaseToken {
  readonly pathPosition_: WritableSignal<PathPosition>;
  readonly visualPathIndex_: Signal<number>;

  readonly isInGoal_: Signal<boolean>;
  readonly isSafe_: Signal<boolean>;
  readonly isTokenInBase_: Signal<boolean>;
  readonly posX_: Signal<number>;
  readonly posY_: Signal<number>;
}

export type PathPosition = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55;

export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue' | string;
export const PLAYER_COLOR_MAP: Record<PlayerIndex, PlayerColor> = {
  0: 'red',
  1: 'green',
  2: 'yellow',
  3: 'blue'
};

