import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExplorerProfile, UserPreferences } from '@/types/domain';
const KEY = 'gedi.local.v1';
export type LocalState = { profile?: ExplorerProfile; preferences?: UserPreferences };
export async function loadLocalState(): Promise<LocalState> { const raw = await AsyncStorage.getItem(KEY); if (!raw) return {}; try { return JSON.parse(raw) as LocalState; } catch { await AsyncStorage.removeItem(KEY); return {}; } }
export async function saveLocalState(next: LocalState): Promise<void> { await AsyncStorage.setItem(KEY, JSON.stringify(next)); }
