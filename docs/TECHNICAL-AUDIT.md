# Part 2 technical audit

## Recommendation: CONDITIONAL GO

The application foundation is suitable to continue, with one device-build condition: the native map must be validated in an Expo development build, not Expo Go.

## Evidence

- TypeScript, ESLint, and Jest pass locally.
- Android JavaScript bundling reaches the app entry after installing the Expo Router native dependencies.
- Expo Location is the correct foreground-location module for the current SDK and is configured for permission-at-use rather than onboarding.
- The tracking proof of concept rejects denied permission, readings over 50m accuracy, duplicate timestamps, and duplicate movement samples. It supports pause, resume, and stop.
- `src/features/exploration/geo.ts` is independently testable and uses longitude/latitude correctly for GeoJSON coordinates.
- `src/features/exploration/repository.ts` persists a typed test session locally and recovers malformed state by clearing it.

## Map SDK decision

MapLibre React Native is the preferred native direction because it supports interactive native maps, GeoJSON sources/layers, line and fill styling, markers, and a current-location layer without placing a web map in a WebView.

It is not an Expo Go-only integration. The package requires native build integration, so the validation path is:

```bash
npx expo prebuild
npx expo run:android
```

The attempted package installation was blocked by the repository's existing React/React DOM peer-dependency conflict. Therefore a MapLibre native render has not been claimed as verified. The smallest safe next step is to resolve that dependency tree, install MapLibre, rebuild, and test on an Android emulator or physical device.

## Fixtures

`src/features/exploration/fixtures.ts` contains clearly synthetic GeoJSON: one zone polygon and two road LineStrings around the pilot area. These coordinates are only fixtures and must not be presented as verified road geometry.

Real road data should be derived from OpenStreetMap or another licensed source. The ingestion pipeline must preserve attribution, license obligations, stable source IDs, access metadata, and `[longitude, latitude]` GeoJSON order. Bada Fuhwara should be ingested as a limited pilot area before attempting full-city coverage.

## Matching limitations

The current utility uses a simple distance-to-line-midpoint approximation and an accuracy threshold. It is useful for testing boundaries and persistence, not for claiming accurate road matching. Dense intersections, parallel roads, GPS multipath, and urban canyons require a proper map-matching strategy and more geometry-aware distance calculations.

## Device-only verification still required

- Foreground permission prompts and denied-permission behavior on Android.
- Accuracy and stale-reading behavior while moving outdoors.
- MapLibre native rendering with polygon, line, marker, and location layers.
- Expo development build startup after `expo prebuild`.
- Hermes and native permission behavior on a real device.

## Non-goals for this stage

No social features, production authentication, background tracking, full-city data ingestion, automatic zone generation, or complete exploration game logic is included.
