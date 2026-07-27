export interface BoardCell {
  id: string;
  x: number;
  y: number;
  span?: number;
  type: 'path' | 'base' | 'goal-center';
  isSafeZone?: boolean;
  color?: 'red' | 'green' | 'blue' | 'yellow';
}