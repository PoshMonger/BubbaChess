// board.ts — the shapes that describe the chessboard itself.
// The board is made of squares, and a square may hold a piece, so this file
// depends on the Piece type. We import it as a TYPE-ONLY import because this
// project sets `verbatimModuleSyntax: true`, which requires `import type` for
// anything used only in type positions.
import type { Piece } from "./piece";

// A board coordinate such as "e4" (file letter + rank number). It is just a
// string for now; giving it its own name documents intent and lets us tighten
// it to a stricter type later without hunting down every plain `string`.
export type Coordinate = string;

// The shape of ONE square on the board.
export interface Square {
  coordinate: Coordinate; // its chess name, e.g. "e4" — file LETTER then rank NUMBER
  row: number;            // the rank, a NUMBER 1–8  -> this is the ROW
  column: string;         // the file, a LETTER a–h  -> this is the COLUMN
  piece: Piece | null;    // the piece standing here, or null when the square is empty
  isSelected: boolean;    // true while the user has this square selected
  isHovered: boolean;     // true while the mouse is hovering over this square
  theme: string;          // the visual theme / CSS class for the square, e.g. "default"
}

// The whole board is 8 rows, each holding 8 squares — hence a 2-D array.
export type Board = Square[][];
