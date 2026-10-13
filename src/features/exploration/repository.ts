import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GpsSample } from './tracking';
export type TestExplorationSession = { id: string; samples: GpsSample[]; visitedRoadIds: string[]; discoveryIds: string[]; updatedAt: string };
const KEY = 'gedi.exploration.poc.v1';
export async function saveExplorationSession(session: TestExplorationSession): Promise<void> { await AsyncStorage.setItem(KEY, JSON.stringify(session)); }
export async function loadExplorationSession(): Promise<TestExplorationSession | undefined> { const raw = await AsyncStorage.getItem(KEY); if (!raw) return undefined; try { return JSON.parse(raw) as TestExplorationSession; } catch { await AsyncStorage.removeItem(KEY); return undefined; } }
