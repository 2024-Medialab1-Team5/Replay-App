# Replay App

## How to use

- Install with `yarn` or `npm install`.
- Run `yarn start` or `npm run start` to try it out **on a device** (this will not work on the iOS simulator).

## Notes

- [Expo GL docs](https://docs.expo.dev/versions/latest/sdk/gl-view/)
- [Three.js docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [React Native Paper docs](https://callstack.github.io/react-native-paper/docs/components/Button)

## Code Conventions

Formatting using `typescript-language-server` (Built-into VSCode.)

All global state must be documented in the README.

## Code Documentation

### Global State

*App.tsx*
- `playing` if true, rotates the cube. (checked in `update()`)