import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { loadLocalState } from '@/lib/storage';
import { useAppStore } from '@/store/useAppStore';
export default function RootLayout() { const hydrate = useAppStore((s) => s.hydrate); useEffect(() => { loadLocalState().then((s) => hydrate(s.profile, s.preferences)).catch(() => hydrate()); }, [hydrate]); return <Stack screenOptions={{ headerShown: false }} />; }
