import { PlayerIndex } from './player.model';

export const DICE_VALUES = [1, 2, 3, 4, 5, 6] as const;
export type DiceValue = typeof DICE_VALUES[number];

export interface DiceState {
  rolledValue: DiceValue | null;
  diceRollHistory: DiceValue[];
  consecutiveSixesCount?: number; // Optional property to track consecutive sixes
}