import * as Location from 'expo-location';
import type { Coordinate } from './geo';
export type TrackingState = 'idle' | 'requesting' | 'tracking' | 'paused' | 'denied' | 'error';
export type GpsSample = Coordinate & { timestamp: number };
export class ForegroundTracker { private subscription?: Location.LocationSubscription; private last?: Coordinate; public state: TrackingState = 'idle'; public samples: GpsSample[] = []; constructor(private readonly onUpdate?: (sample: GpsSample) => void) {}
  async start(): Promise<boolean> { this.state = 'requesting'; const permission = await Location.requestForegroundPermissionsAsync(); if (permission.status !== Location.PermissionStatus.GRANTED) { this.state = 'denied'; return false; } this.subscription = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 2000, distanceInterval: 3 }, (location) => { const sample: GpsSample = { latitude: location.coords.latitude, longitude: location.coords.longitude, accuracy: location.coords.accuracy ?? undefined, timestamp: location.timestamp }; if (sample.accuracy !== undefined && sample.accuracy > 50) return; if (this.last && Math.abs(sample.timestamp - (this.samples.at(-1)?.timestamp ?? 0)) < 1000) return; this.last = sample; this.samples.push(sample); this.state = 'tracking'; this.onUpdate?.(sample); }); this.state = 'tracking'; return true; }
  pause(): void { this.subscription?.remove(); this.subscription = undefined; if (this.state === 'tracking') this.state = 'paused'; }
  async resume(): Promise<boolean> { return this.start(); }
  stop(): void { this.subscription?.remove(); this.subscription = undefined; this.state = 'idle'; }
}
