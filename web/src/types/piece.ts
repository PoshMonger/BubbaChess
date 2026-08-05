// piece.ts — the canonical shape of a chess piece.
// Keeping it in one place means the board state, the React components, and any
// future move-generation code all describe a piece in the exact same way.

// A piece belongs to one of the two sides. Using a string-literal UNION (instead
// of a plain `string`) tells TypeScript that ONLY these two exact words are
// allowed, so a typo like "wihte" fails to compile instead of failing at runtime.
export type PieceColor = "white" | "black";

// The six kinds of chess piece. Same idea as above: only these exact names pass.
// `type` is what will eventually decide HOW a piece is allowed to move.
export type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";

// One chess piece that can stand on a square.
// An `interface` describes the required fields and their types; TypeScript then
// rejects any piece object that is missing a field or uses the wrong type.
export interface Piece {
  name: string;      // human-readable label, e.g. "bishop"
  color: PieceColor; // which side owns the piece
  type: PieceType;   // what kind of piece it is (drives its movement rules later)
  value: number;
  rank: number; // the rank, a NUMBER 1–8  -> this is the ROW
  file: number; // the file, a LETTER a–h turned into number for easier calculation  -> this is the COLUMN
  coordinates: string;
  movementTypes: { dx: number; dy: number }[];
  movementMagnitude: number;
  movementRules: string[];
  isSelected: boolean;
  // the chess name, e.g. "e4" — file LETTER then rank NUMBER  
  moves: string[]; // the moves the piece can make
  targets: string[]; // the targets the piece can move to
}
