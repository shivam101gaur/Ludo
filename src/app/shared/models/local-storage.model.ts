import { Player, PlayerIndex } from '../../game/models/player.model';
import { STORAGE_KEYS, StorageKey } from '../utils/localStorage.utils';

export interface LocalStorageGameState {
  activePlayerIndex: PlayerIndex;
}
export interface LocalStorageSettings {
  isMuted: boolean;
  theme: 'dark'|'light';
}
export interface LocalStorageStatistic {
  topPlayer: Player;
}


// 2. Create a "Raw" map (TypeScript will use this as a dictionary)
type StorageTypeMap = {
  [STORAGE_KEYS.GAME_STATE]: LocalStorageGameState;
  [STORAGE_KEYS.SETTINGS]: LocalStorageSettings;
  [STORAGE_KEYS.STATISTICS]:LocalStorageStatistic
};

// 3. THE ENFORCER: This iterates over the official StorageKey union 
// and maps it strictly to the RawSchema.
export type StorageSchema = {
  [K in StorageKey]: StorageTypeMap[K];
};