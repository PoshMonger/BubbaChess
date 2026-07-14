// boardSlice.ts
// A Redux Toolkit "slice" bundles together one piece of your app's state
// (here: the chessboard) plus the functions ("reducers") allowed to change it.

import { createSlice } from "@reduxjs/toolkit";
// PayloadAction is only a TYPE (it describes an action that carries data).
// This project has `verbatimModuleSyntax: true`, so type-only imports MUST use `import type`.
import type { PayloadAction } from "@reduxjs/toolkit";

// The COLUMNS are called "files" and are labelled with LETTERS a–h.
// `export`ed so other modules can reuse them AND so they aren't flagged as
// unused now that the board below is written out by hand instead of via a loop.
export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// The ROWS are called "ranks" and are labelled with NUMBERS 1–8.
// Rank 8 is drawn at the TOP of the board and rank 1 at the BOTTOM. We list the
// numbers from 8 down to 1 so the FIRST row we build is the top row of the board.
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

// Describe the shape of ONE square. Declaring it as an interface lets TypeScript
// catch mistakes for us (a missing field, or a value of the wrong type).
export interface Square {
  coordinate: string;   // its chess name, e.g. "e4" — always the file LETTER then the rank NUMBER
  row: number;          // the rank, a NUMBER 1–8  -> this is the ROW (what you asked for)
  column: string;       // the file, a LETTER a–h  -> this is the COLUMN (what you asked for)
  piece: string | null; // which piece stands here (e.g. "white-king"), or null for an empty square
  isSelected: boolean;  // true while the user has this square selected
  isHovered: boolean;   // true while the mouse is hovering over this square // true when this square is a highlighted legal destination
  theme: string;        // the visual theme/CSS class for the square, e.g. "default"
}

// The full 8×8 board written out square-by-square (a "board literal") so you can
// hand-edit individual squares — e.g. set `piece: "white-king"` on e1, or give a
// square a different `theme`. It is one OUTER array of ranks (rows), and each rank
// is an INNER array of 8 squares running from file a to file h.
//
// Rows are listed rank 8 (top of the board) down to rank 1 (bottom), matching how
// the board is drawn. Every square starts empty (piece: null) and unhighlighted;
// change any field on any line below without disturbing the others.
const initialBoard: Square[][] = [
  // ---- Rank 8 (top row) ----
  [
    { coordinate: "a8", row: 8, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b8", row: 8, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c8", row: 8, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d8", row: 8, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e8", row: 8, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f8", row: 8, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g8", row: 8, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h8", row: 8, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 7 ----
  [
    { coordinate: "a7", row: 7, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b7", row: 7, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c7", row: 7, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d7", row: 7, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e7", row: 7, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f7", row: 7, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g7", row: 7, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h7", row: 7, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 6 ----
  [
    { coordinate: "a6", row: 6, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b6", row: 6, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c6", row: 6, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d6", row: 6, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e6", row: 6, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f6", row: 6, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g6", row: 6, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h6", row: 6, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 5 ----
  [
    { coordinate: "a5", row: 5, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b5", row: 5, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c5", row: 5, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d5", row: 5, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e5", row: 5, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f5", row: 5, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g5", row: 5, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h5", row: 5, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 4 ----
  [
    { coordinate: "a4", row: 4, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b4", row: 4, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c4", row: 4, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d4", row: 4, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e4", row: 4, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f4", row: 4, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g4", row: 4, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h4", row: 4, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 3 ----
  [
    { coordinate: "a3", row: 3, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b3", row: 3, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c3", row: 3, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d3", row: 3, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e3", row: 3, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f3", row: 3, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g3", row: 3, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h3", row: 3, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 2 ----
  [
    { coordinate: "a2", row: 2, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b2", row: 2, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c2", row: 2, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d2", row: 2, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e2", row: 2, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f2", row: 2, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g2", row: 2, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h2", row: 2, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 1 (bottom row) ----
  [
    { coordinate: "a1", row: 1, column: "a", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b1", row: 1, column: "b", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c1", row: 1, column: "c", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d1", row: 1, column: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e1", row: 1, column: "e", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f1", row: 1, column: "f", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g1", row: 1, column: "g", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h1", row: 1, column: "h", piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
];

// createSlice generates the reducer + action creators for us from this config.
export const boardSlice = createSlice({
  name: "board", // label shown in Redux DevTools and baked into action type strings
  // The slice's state IS the 8×8 array of squares (it is NOT an object wrapping the array).
  initialState: initialBoard,
  reducers: {
    // Replace the whole board with a brand-new one.
    // Because the state is the array itself, we RETURN the new array.
    // (Your old code did `state.board = ...`, but there is no `.board` property —
    //  the array is the state, so assigning to `state.board` did nothing useful.)
    // The `_` in `_state` tells TypeScript we intentionally don't use that argument.
    setBoard: (_state, action: PayloadAction<Square[][]>) => action.payload,
  },
});

// createSlice auto-builds this action creator: call setBoard(newBoard) to trigger a change.
export const { setBoard } = boardSlice.actions;
// The reducer is what the store registers under the "board" key — export it as default.
export default boardSlice.reducer;
