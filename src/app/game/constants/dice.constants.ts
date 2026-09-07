import { DiceState } from '../models/dice.model';

export const DEFAULT_DICE_STATE: DiceState = {
  rolledValue: null,
  diceRollHistory: [],
  consecutiveSixesCount: 0
} as const;

export const diceRollingTime = 1000; // milliseconds