import { PlayerIndex } from '../models/player.model';
import { PathPosition, Token } from '../models/token.model';

export const isTokenSafe = (pathPosition: PathPosition): boolean => {
  return typeof pathPosition === 'number' && pathPosition === -1 || (pathPosition % 13 === 0) || (pathPosition % 13 === 8);
}
// --- CONSTANTS ---

const TOTAL_TRACK_STEPS = 52;
const PLAYER_GAP = 13;

/**
 * THE MASTER PATH (52 Steps)
 * 1-Based Coordinates: [Column, Row].
 * Starts at Player 0's start position [2, 7] and loops clockwise.
 */
const MASTER_PATH: [number, number][] = [
  // Player 0 Arm (Left side, moving Right)
  [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
  // Player 1 Arm (Top side, moving Up)
  [7, 6], [7, 5], [7, 4], [7, 3], [7, 2], [7, 1],
  // Direction switch
  [8, 1],
  // Player 1 Arm (Top side, moving Down)
  [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6],
  // Player 2 Arm (Right side, moving Right)
  [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
  // Direction switch
  [15, 8],
  // Player 2 Arm (Right side, moving Left)
  [15, 9], [14, 9], [13, 9], [12, 9], [11, 9], [10, 9],
  // Player 3 Arm (Bottom side, moving Down)
  [9, 10], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15],
  // Direction switch
  [8, 15],
  // Player 3 Arm (Bottom side, moving Up)
  [7, 15], [7, 14], [7, 13], [7, 12], [7, 11], [7, 10],
  // Player 0 Arm (Left side, moving Left)
  [6, 9], [5, 9], [4, 9], [3, 9], [2, 9], [1, 9],
  // Direction switch (Index 50)
  [1, 8],
  // Final outer step before closing the loop (Index 51 globally)
  [1, 7]
];

/**
 * HOME STRETCH GENERATORS [Indices 51-55]
 * Returns [Column, Row] tuples for the 5 inner path steps toward the center.
 */
const HOME_STRETCH_GENERATORS = [
  (step: number): [number, number] => [1 + step, 8],   // Player 0 (Moves Right)
  (step: number): [number, number] => [8, 1 + step],   // Player 1 (Moves Down)
  (step: number): [number, number] => [15 - step, 8],  // Player 2 (Moves Left)
  (step: number): [number, number] => [8, 15 - step]   // Player 3 (Moves Up)
];

/**
 * BASE ANCHORS
 * The exact [Column, Row] coordinate for the top-most token slot (A) in each yard.
 */
const BASE_ANCHORS: [number, number][] = [
  [1, 1],   // Player 0 (Top-Left)
  [10, 1],  // Player 1 (Top-Right)
  [10, 10], // Player 2 (Bottom-Right)
  [1, 10]   // Player 3 (Bottom-Left)
];


// --- MAIN UTILITY FUNCTION ---

/**
 * Returns strictly typed { x, y } coordinates based on token state.
 */
export function getTokenGridCoordinates(pathPosition: PathPosition, playerIndex: PlayerIndex): { x: number; y: number } {

  // 1. IS IN BASE (pathPosition === -1)
  if (pathPosition === -1) {
    const [anchorX, anchorY] = BASE_ANCHORS[playerIndex];

    // Stacks the tokens vertically downwards (A, B, C, D)
    return {
      x: anchorX,
      y: anchorY
    };
  }

  // 2. IS IN GOAL (Game won for this token)
  if (pathPosition >= 56) {
    // 8,8 is the absolute mathematical center of a 15x15 grid
    return { x: 8, y: 8 };
  }

  // 3. HOME STRETCH (Indices 51 to 55)
  if (pathPosition > 50) {
    const step = pathPosition - 50;
    const [x, y] = HOME_STRETCH_GENERATORS[playerIndex](step);

    return { x, y };
  }

  // 4. MAIN SHARED TRACK (Indices 0 to 50)
  // Utilizes the dynamic (i + 2) % 8 principle scaled up for the 52-step track
  const mappedIndex = (pathPosition + (playerIndex * PLAYER_GAP)) % TOTAL_TRACK_STEPS;
  const [x, y] = MASTER_PATH[mappedIndex];

  return { x, y };
}