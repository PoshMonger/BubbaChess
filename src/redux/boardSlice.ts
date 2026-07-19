// boardSlice.ts
// A Redux Toolkit "slice" bundles together one piece of your app's state
// (here: the chessboard) plus the functions ("reducers") allowed to change it.
import { createSlice } from "@reduxjs/toolkit";
// PayloadAction is only a TYPE (it describes an action that carries data).
// This project has `verbatimModuleSyntax: true`, so type-only imports MUST use `import type`.
import type { PayloadAction } from "@reduxjs/toolkit";
// The board's shapes now live in one shared place (src/types) instead of being
// defined here, so every file agrees on what a Square and a Board look like.
import type { Board } from "../types";

// The COLUMNS are called "files" and are labelled with LETTERS a–h.
// `export`ed so other modules can reuse them AND so they aren't flagged as
// unused now that the board below is written out by hand instead of via a loop.
export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Each PIECE stores its file as a NUMBER (see the Piece type), not a letter, so
// movement math (dx/dy on the board grid) is just arithmetic. The mapping below
// is the same order as FILES above: a→1, b→2, c→3, d→4, e→5, f→6, g→7, h→8.
// (We use 1–8 to match ranks, which are already numbered 1–8.)

// The ROWS are called "ranks" and are labelled with NUMBERS 1–8.
// Rank 8 is drawn at the TOP of the board and rank 1 at the BOTTOM. We list the
// numbers from 8 down to 1 so the FIRST row we build is the top row of the board.
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

// (The Square interface used to live here. It now lives in src/types/board.ts so
//  that components and future game logic can import the same definition.)

// The full 8×8 board written out square-by-square (a "board literal") so you can
// hand-edit individual squares — swap the `piece` on a square, or give it a
// different `theme`. It is one OUTER array of ranks (rows), and each rank is an
// INNER array of 8 squares running from file a to file h.
//
// Rows are listed rank 8 (top of the board) down to rank 1 (bottom), matching how
// the board is drawn. This is the STANDARD STARTING POSITION: black occupies ranks
// 8 and 7 at the top, white occupies ranks 2 and 1 at the bottom, and the four
// middle ranks (6–3) are empty. Change any field on any line without disturbing
// the others — deleting a piece is just putting `piece: null` back.
const initialBoard: Board = [
  // ---- Rank 8 (top row) ----
  // BLACK's back rank. The standard order is rook, knight, bishop, QUEEN, KING,
  // bishop, knight, rook. The easy way to remember the middle two: the queen
  // starts on the square matching her OWN colour (black queen -> the dark d8),
  // and the king takes the square beside her on e8.
  [
    // Anatomy of a NON-empty square: the `piece` value is a Piece object
    // (name/color/type/value); the square's OWN flags (isSelected, isHovered,
    // theme) stay on the square, NOT inside the piece.
    { coordinate: "a8", rank: 8, file: 1, piece: { name: "rook", color: "black", type: "rook", value: 5, rank: 8, file: 1 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b8", rank: 8, file: 2, piece: { name: "knight", color: "black", type: "knight", value: 3, rank: 8, file: 2 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c8", rank: 8, file: 3, piece: { name: "bishop", color: "black", type: "bishop", value: 3, rank: 8, file: 3 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d8", rank: 8, file: 4, piece: { name: "queen", color: "black", type: "queen", value: 9, rank: 8, file: 4 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e8", rank: 8, file: 5, piece: { name: "king", color: "black", type: "king", value: 0, rank: 8, file: 5 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f8", rank: 8, file: 6, piece: { name: "bishop", color: "black", type: "bishop", value: 3, rank: 8, file: 6 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g8", rank: 8, file: 7, piece: { name: "knight", color: "black", type: "knight", value: 3, rank: 8, file: 7 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h8", rank: 8, file: 8, piece: { name: "rook", color: "black", type: "rook", value: 5, rank: 8, file: 8 }, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 7 ----
  // BLACK's eight pawns fill the whole rank, shielding the back rank behind them.
  [
    
    { coordinate: "a7", rank: 7, file: 1, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 1 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b7", rank: 7, file: 2, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 2 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c7", rank: 7, file: 3, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 3 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d7", rank: 7, file: 4, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 4 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e7", rank: 7, file: 5, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 5 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f7", rank: 7, file: 6, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 6 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g7", rank: 7, file: 7, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 7 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h7", rank: 7, file: 8, piece: { name: "pawn", color: "black", type: "pawn", value: 1, rank: 7, file: 8 }, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 6 ----
  [
    { coordinate: "a6", rank: 6, file: 1, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b6", rank: 6, file: 2, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c6", rank: 6, file: 3, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d6", rank: 6, file: 4, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e6", rank: 6, file: 5, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f6", rank: 6, file: 6, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g6", rank: 6, file: 7, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h6", rank: 6, file: 8, piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 5 ----
  [
    { coordinate: "a5", rank: 5, file: 1, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b5", rank: 5, file: 2, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c5", rank: 5, file: 3, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d5", rank: 5, file: "d", piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e5", rank: 5, file: 5, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f5", rank: 5, file: 6, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g5", rank: 5, file: 7, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h5", rank: 5, file: 8, piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 4 ----
  [
    { coordinate: "a4", rank: 4, file: 1, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b4", rank: 4, file: 2, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c4", rank: 4, file: 3, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d4", rank: 4, file: 4, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e4", rank: 4, file: 5, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f4", rank: 4, file: 6, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g4", rank: 4, file: 7, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h4", rank: 4, file: 8, piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 3 ----
  [
    { coordinate: "a3", rank: 3, file: 1, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b3", rank: 3, file: 2, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c3", rank: 3, file: 3, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d3", rank: 3, file: 4, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e3", rank: 3, file: 5, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f3", rank: 3, file: 6, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g3", rank: 3, file: 7, piece: null, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h3", rank: 3, file: 8, piece: null, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 2 ----
  // WHITE's eight pawns, mirroring black's rank-7 wall at the other end.
  [
    { coordinate: "a2", rank: 2, file: 1, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 1 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b2", rank: 2, file: 2, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 2 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c2", rank: 2, file: 3, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 3 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d2", rank: 2, file: 4, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 4 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e2", rank: 2, file: 5, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 5 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f2", rank: 2, file: 6, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 6 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g2", rank: 2, file: 7, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 7 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h2", rank: 2, file: 8, piece: { name: "pawn", color: "white", type: "pawn", value: 1, rank: 2, file: 8 }, isSelected: false, isHovered: false, theme: "default" },
  ],
  // ---- Rank 1 (bottom row) ----
  // WHITE's back rank. Same left-to-right order as black's rank 8, which is why
  // the two kings face each other down the e-file and the two queens down the d-file.
  // (White's queen on d1 also sits on her own colour — d1 is a light square.)
  [
    { coordinate: "a1", rank: 1, file: 1, piece: { name: "rook", color: "white", type: "rook", value: 5, rank: 1, file: 1 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "b1", rank: 1, file: 2, piece: { name: "knight", color: "white", type: "knight", value: 3, rank: 1, file: 2 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "c1", rank: 1, file: 3, piece: { name: "bishop", color: "white", type: "bishop", value: 3, rank: 1, file: 3 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "d1", rank: 1, file: 4, piece: { name: "queen", color: "white", type: "queen", value: 9, rank: 1, file: 4 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "e1", rank: 1, file: 5, piece: { name: "king", color: "white", type: "king", value: 0, rank: 1, file: 5 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "f1", rank: 1, file: 6, piece: { name: "bishop", color: "white", type: "bishop", value: 3, rank: 1, file: 6 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "g1", rank: 1, file: 7, piece: { name: "knight", color: "white", type: "knight", value: 3, rank: 1, file: 7 }, isSelected: false, isHovered: false, theme: "default" },
    { coordinate: "h1", rank: 1, file: 8, piece: { name: "rook", color: "white", type: "rook", value: 5, rank: 1, file: 8 }, isSelected: false, isHovered: false, theme: "default" },
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
    setBoard: (_state, action: PayloadAction<Board>) => action.payload,
    movePiece: (_state, action: PayloadAction<{ from: string, to: string }>) => {
      const { from, to } = action.payload;
      const board = _state;
      const piece = board.find(file => file.coordinate === from)?.piece;
      if (piece) {
        piece.coordinates = to;
      }
    },
    highlightMoves: (_state, action: PayloadAction<{ moves: { file: number, rank: number }[] }>) => {
      const { moves } = action.payload;
      const board = _state;
        board.forEach(rank => {
            rank.forEach(file => {
                file.isHighlighted = moves.some(move => move.file === file.file && move.rank === file.rank);
            })
        })
        return board;
    },
    unhighlightMoves: (_state) => {
      const board = _state;
      const newBoard = board.map(file => {
        return file.map(piece => {
          return { ...piece, highlighted: false }
        })
      })
    },
  },
});

// createSlice auto-builds this action creator: call setBoard(newBoard) to trigger a change.
export const { setBoard, highlightMoves, unhighlightMoves } = boardSlice.actions;
// The reducer is what the store registers under the "board" key — export it as default.
export default boardSlice.reducer;
