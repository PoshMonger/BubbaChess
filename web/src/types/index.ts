// index.ts — a "barrel" file. It re-exports everything from the individual type
// modules so the rest of the app can write a single tidy import:
//   import type { Square, Piece, Board } from "../types";
// instead of having to remember which file each type lives in.
export * from "./piece";
export * from "./board";
