import { Player } from '../models/player.model';

export const DEFAULT_PLAYERS: Player[] = [
  { 
    id: 'p1', 
    name: 'Player 1', 
    playerIndex: 0, 
    gender: 'other' 
  },
  { 
    id: 'p2', 
    name: 'Player 2', 
    playerIndex: 1, 
    gender: 'other' 
  },
  { 
    id: 'p3', 
    name: 'Player 3', 
    playerIndex: 2, 
    gender: 'other' 
  },
  { 
    id: 'p4', 
    name: 'Player 4', 
    playerIndex: 3, 
    gender: 'other' 
  }
] as const; //Const Assertion;