import { Signal } from '@angular/core';
import { Token } from './token.model';

export interface Player {
  id: string;
  email?: string;
  name: string;
  gender?: 'male' | 'female' | 'other';
  tokens: Signal<Token[]>;
}
