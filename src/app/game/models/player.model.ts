import { Signal } from '@angular/core';
import { Token } from './token.model';

export interface Player {
  id: string;
  playerIndex: PlayerIndex;
  email?: string;
  name: string;
  gender?: 'male' | 'female' | 'other';
}

export type PlayerIndex = 0 | 1 | 2 | 3;