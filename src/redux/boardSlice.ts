// boardSlice.ts
// A Redux Toolkit "slice" bundles together one piece of your app's state
// (here: the chessboard) plus the functions ("reducers") allowed to change it.

import { createSlice } from "@reduxjs/toolkit";
// PayloadAction is only a TYPE (it describes an action that carries data).
// This project has `verbatimModuleSyntax: true`, so type-only imports MUST use `import type`.
import type { PayloadAction } from "@reduxjs/toolkit";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// The ROWS are called "ranks" and are labelled with NUMBERS 1–8.
// Rank 8 is drawn at the TOP of the board and rank 1 at the BOTTOM. We list the
// numbers from 8 down to 1 so the FIRST row we build is the top row of the board.
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

// Describe the shape of ONE square. Declaring it as an interface lets TypeScript
// catch mistakes for us (a missing field, or a value of the wrong type).
export interface Square {
  coordinate: string; // its chess name, e.g. "e4" — always the file LETTER then the rank NUMBER
  row: number;        // the rank, a NUMBER 1–8  -> this is the ROW (what you asked for)
  column: string;     // the file, a LETTER a–h  -> this is the COLUMN (what you asked for)
}

// Build the full 8×8 board with two loops instead of hand-typing 64 objects.
// (Hand-typing them is exactly how the earlier `row: ""` typo slipped in — a loop
//  guarantees every square is generated the same, correct way.)
function createInitialBoard(): Square[][] {
  // Outer loop: turn each rank NUMBER into one row of the board.
  return RANKS.map((rank) =>
    // Inner loop: within that row, turn each file LETTER into one square.
    FILES.map((file) => ({
      coordinate: `${file}${rank}`, // e.g. file "e" + rank 4  ->  "e4"
      row: rank,                    // the NUMBER is the row
      column: file,
      piece: null,
      isSelected: false,
      isHovered: false,
      targets: [],
      moves: [],
      isPossible: false,
      theme: 'default',
      
    }))
  );
}

// createSlice generates the reducer + action creators for us from this config.
export const boardSlice = createSlice({
  name: "board", // label shown in Redux DevTools and baked into action type strings
  // The slice's state IS the 8×8 array of squares (it is NOT an object wrapping the array).
  initialState: createInitialBoard(),
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
