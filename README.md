# Gedi

Gedi is a personal-first city exploration app. It helps people get to know a city through their own experiences instead of relying only on popular recommendations.

The first pilot city is **Jabalpur, Madhya Pradesh, India**, beginning around **Bada Fuhwara**.

The long-term product idea is simple: walk or ride through a city, reveal streets progressively, save places you personally discover, and build a private map of your own experience.

## Current status

This repository contains the first foundation stage:

- Welcome and product introduction
- Local explorer profile setup
- Jabalpur pilot-city selection
- Personal Mode privacy preference
- Bada Fuhwara starting-area preview
- Local persistence for onboarding data
- Map, Discoveries, and Profile tabs
- Typed domain models for future exploration features
- Basic onboarding validation tests

The GPS exploration engine, live map integration, route tracking, social sharing, authentication, and cloud synchronization are not implemented yet.

The current map is an explicitly labeled preview. It does not display fake GPS data or pretend that streets have already been explored.

## Product principles

- Personal discoveries over popularity rankings
- Privacy by default
- Local-first data ownership
- Progressive exploration instead of an overwhelming city map
- Readable, practical outdoor UI
- Real progress only; no fabricated routes or achievements

## Technology

- React Native
- Expo SDK 57
- Expo Router
- TypeScript with strict checking
- Zustand for lightweight app state
- AsyncStorage for the current onboarding persistence layer
- Expo SQLite included as the foundation for future local exploration data
- Jest with the Expo preset
- ESLint and Prettier-compatible project setup

## Requirements

Install the following before starting:

- Node.js 22 or a compatible current LTS release
- npm
- Expo Go on an Android or iOS device, or an Android/iOS simulator

Expo Go must be compatible with the Expo SDK used by this project. If Expo reports that the project requires a newer Expo Go version, update Expo Go from the Play Store or App Store.

## Setup

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Anmolawasthi117/Gedi.git
cd Gedi
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

If the development server or Metro cache is stale, use:

```bash
npx expo start --clear
```

For a local/offline start when the required packages are already installed:

```bash
npx expo start --clear --offline
```

Then scan the QR code with a compatible Expo Go app, or press `a` / `i` from the Expo terminal to launch a simulator.

## Useful commands

```bash
npm run start       # Start Expo
npm run android     # Start Expo and open Android
npm run ios         # Start Expo and open iOS
npm run web         # Start the web target
npm run typecheck   # Run TypeScript checking
npm run lint        # Run ESLint
npm test -- --runInBand
```

To validate that the Android bundle can be produced without Hermes bytecode generation on Windows:

```bash
npx expo export --platform android --no-bytecode
```

The `--no-bytecode` option is a debugging workaround for machines where `hermesc.exe` is blocked by Windows permissions. It is not intended as a production build setting.

## Onboarding flow

The app currently follows this path:

1. Welcome — introduces “Your city. Your discoveries.”
2. Explorer profile — collects a display name and username locally.
3. Choose your city — selects Jabalpur as the initial supported pilot.
4. Personal Mode — enables private-by-default exploration.
5. Ready to explore — previews Bada Fuhwara and enters the main app.

After onboarding, the user sees three tabs:

- **Map** — exploration status, preview surface, active zone, and Explore CTA.
- **Discoveries** — empty state for future personally saved places.
- **Profile** — local profile, city, and Personal Mode status.

## Project structure

```text
app/
  _layout.tsx              Root navigation setup
  index.tsx                Hydration and onboarding redirect
  onboarding/              Onboarding routes
  (tabs)/                  Main application tabs

src/
  components/              Reusable UI primitives
  features/onboarding/     Onboarding validation and feature logic
  lib/                     Local persistence helpers
  store/                   Zustand application state
  theme/                   Colors, spacing, radii, and visual tokens
  types/                   Typed domain models

tests/
  onboarding.test.ts       Profile validation tests
```

## Data and privacy

The current profile and onboarding preferences are stored locally on the device. No account, contacts permission, location permission, or server upload is required during onboarding.

Location access is intentionally not requested yet. It should only be requested when a later exploration flow is implemented and the user explicitly starts an exploration session.

Personal Mode is enabled by default. Public sharing and social features are not part of this stage.

## Domain model foundation

The project defines typed models for the future exploration system:

- `ExplorerProfile`
- `City`
- `Zone`
- `ExplorationSession`
- `RoadSegment`
- `Discovery`
- `UserPreferences`

Only the profile and onboarding preferences are currently persisted. Future versions should move exploration records into a versioned SQLite repository rather than putting database calls inside screens or UI components.

## Troubleshooting

### `Unable to resolve react-native-safe-area-context`

Install the Expo-compatible native dependencies:

```bash
npx expo install react-native-safe-area-context expo-linking react-native-screens react-native-gesture-handler react-native-reanimated
```

Then restart with a clean cache:

```bash
npx expo start --clear
```

### Port 8081 is already in use

Stop the existing Expo/Metro process with `Ctrl+C`, then restart:

```bash
npx expo start --clear
```

### Expo Go says the project requires a newer version

Update Expo Go on the device. The client version must support this repository’s Expo SDK.

### Windows reports `hermesc.exe: permission denied`

Use the development verification workaround:

```bash
npx expo export --platform android --no-bytecode
```

This usually indicates a Windows security, antivirus, or file-permission restriction affecting the Hermes compiler executable.

### Icons or fonts cannot be resolved

This warning is usually non-fatal during local development. Confirm dependencies are installed, restart Metro with `--clear`, and use a compatible Expo Go version.

## Current limitations

- No live GPS tracking
- No native map provider configured
- No street geometry or road-segment unlock algorithm
- No SQLite repository implementation yet
- No authentication or cloud backend
- No saved-discovery creation flow yet
- No social features or public sharing
- No physical-device testing has been claimed in this repository

## Contributing direction

When extending the app:

1. Keep route screens inside `app/` and non-route code inside `src/`.
2. Keep database, location, and geographic logic out of presentational components.
3. Preserve Personal Mode and local-first defaults.
4. Add validation and tests for new onboarding or persistence behavior.
5. Run typechecking, linting, tests, and an Expo bundle check before submitting changes.

