export type ExplorerProfile = { displayName: string; username: string; createdAt: string };
export type City = { id: string; name: string; region: string; country: string; pilot: boolean };
export type Zone = { id: string; cityId: string; name: string; status: 'locked' | 'available' | 'explored' };
export type ExplorationSession = { id: string; startedAt: string; endedAt?: string };
export type RoadSegment = { id: string; zoneId: string; explored: boolean };
export type Discovery = { id: string; name: string; note?: string; createdAt: string };
export type UserPreferences = { onboardingComplete: boolean; personalMode: boolean; cityId: string };
