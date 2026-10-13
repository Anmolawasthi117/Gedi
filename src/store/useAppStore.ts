import { create } from 'zustand';
import type { ExplorerProfile, UserPreferences } from '@/types/domain';
type State = { profile?: ExplorerProfile; preferences: UserPreferences; hydrated: boolean; setProfile: (profile: ExplorerProfile) => void; setPreferences: (preferences: Partial<UserPreferences>) => void; hydrate: (profile?: ExplorerProfile, preferences?: UserPreferences) => void };
const defaults: UserPreferences = { onboardingComplete: false, personalMode: true, cityId: 'jabalpur' };
export const useAppStore = create<State>((set) => ({ preferences: defaults, hydrated: false, setProfile: (profile) => set({ profile }), setPreferences: (preferences) => set((s) => ({ preferences: { ...s.preferences, ...preferences } })), hydrate: (profile, preferences) => set({ profile, preferences: { ...defaults, ...preferences }, hydrated: true }) }));
