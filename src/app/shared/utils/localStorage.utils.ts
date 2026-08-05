import { StorageSchema } from '../models/local-storage.model';

export const STORAGE_KEYS = {
  GAME_STATE: 'LUDO_GAME_STATE_V1',
  SETTINGS: 'LUDO_SETTINGS_V1',
  STATISTICS: 'LUDO_STATS_V1',
} as const;


export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

export function saveToLocalStorage<K extends keyof StorageSchema>(
  key: K, 
  data: StorageSchema[K]
): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true
  } catch (error) {
    console.error(`Failed to save ${key} to storage`, error);
    return false
  }
}

export function loadFromLocalStorage<K extends keyof StorageSchema>(
  key: K
): StorageSchema[K] | null {
  try {
    const item = localStorage.getItem(key);
    
    // If there's no data (e.g., first time playing), return null
    if (!item) {
      return null;
    }

    // JSON.parse returns 'any', so we assert it strictly matches our schema
    return JSON.parse(item) as StorageSchema[K];
  } catch (error) {
    // If the JSON is corrupted, catch the error so it doesn't crash the engine
    console.error(`Failed to parse ${key} from storage. Data might be corrupted.`, error);
    
    // Returning null allows your Angular service to safely fall back to the default state
    return null;
  }
}