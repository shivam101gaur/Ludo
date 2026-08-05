import { signal, computed, WritableSignal } from '@angular/core';
import { BaseToken, PathPosition, Token } from '../models/token.model';
import { getTokenGridCoordinates, isTokenSafe } from '../utils/grid-path-mapper.util';

const DEFAULT_TOKENS: BaseToken[] = [
  // --- Player 0 (Red) ---
  { id: 'red-1', color: 'red', playerIndex: 0 },
  { id: 'red-2', color: 'red', playerIndex: 0 },
  { id: 'red-3', color: 'red', playerIndex: 0 },
  { id: 'red-4', color: 'red', playerIndex: 0 },

  // --- Player 1 (Green) ---
  { id: 'green-1', color: 'green', playerIndex: 1 },
  { id: 'green-2', color: 'green', playerIndex: 1 },
  { id: 'green-3', color: 'green', playerIndex: 1 },
  { id: 'green-4', color: 'green', playerIndex: 1 },

  // --- Player 2 (Yellow) ---
  { id: 'yellow-1', color: 'yellow', playerIndex: 2 },
  { id: 'yellow-2', color: 'yellow', playerIndex: 2 },
  { id: 'yellow-3', color: 'yellow', playerIndex: 2 },
  { id: 'yellow-4', color: 'yellow', playerIndex: 2 },

  // --- Player 3 (Blue) ---
  { id: 'blue-1', color: 'blue', playerIndex: 3 },
  { id: 'blue-2', color: 'blue', playerIndex: 3 },
  { id: 'blue-3', color: 'blue', playerIndex: 3 },
  { id: 'blue-4', color: 'blue', playerIndex: 3 },
];

function initializeTokens(baseTokens: readonly BaseToken[]): Token[] {
  return baseTokens.map(baseToken => {
    const pathPosition_: WritableSignal<PathPosition> = signal(-1);

    return {
      ...baseToken,
      pathPosition_,

      isInGoal_: computed(() => pathPosition_() > 55),
      isSafe_: computed(() => (isTokenSafe(pathPosition_()))),
      isTokenInBase_: computed(() => pathPosition_() === -1),
      posX_: computed(() => getTokenGridCoordinates(pathPosition_(), baseToken.playerIndex)?.x),
      posY_: computed(() => getTokenGridCoordinates(pathPosition_(), baseToken.playerIndex)?.y),

      visualPathIndex_: computed(() => {
        const pathPosition = pathPosition_();
        if (pathPosition === -1) return -1;

        // Wrap around the 52-space board based on starting offset
        return (pathPosition + (baseToken.playerIndex * 13)) % 52;
      })
    };
  });
}
export const INITIAL_TOKENS = initializeTokens(DEFAULT_TOKENS);