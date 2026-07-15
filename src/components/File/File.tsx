// File.tsx — renders ONE square of the board (its themed background, plus the
// piece standing on it if the square is occupied).
// One component per kind of piece. Each knows how to draw ITSELF in either colour.
import Pawn from '../Pieces/Pawn/Pawn'
import Knight from '../Pieces/Knight/Knight'
import Bishop from '../Pieces/Bishop/Bishop'
import Rook from '../Pieces/Rook/Rook'
import Queen from '../Pieces/Queen/Queen'
import King from '../Pieces/King/King'
// `Square` types the whole square; `Piece` (aliased to PieceModel so it can't be
// confused with the <Piece> COMPONENT elsewhere) types a single piece.
import type { Square, Piece as PieceModel } from '../../types'

// Decide WHICH component draws a given piece.
// A `switch` is a STATEMENT, and JSX only allows EXPRESSIONS inside `{ ... }`, so
// the switch cannot live directly in the markup. We put it in this helper, which
// RETURNS the right element, and then call the helper from the JSX below.
const renderPiece = (piece: PieceModel) => {
  // Every case matches one member of the PieceType union in src/types/piece.ts.
  // Because that union has exactly these six members and all six are handled,
  // TypeScript knows the list is complete — misspell a case and it won't compile.
  switch (piece.type) {
    case 'pawn':
      return <Pawn piece={piece} />
    case 'knight':
      return <Knight piece={piece} />
    case 'bishop':
      return <Bishop piece={piece} />
    case 'rook':
      return <Rook piece={piece} />
    case 'queen':
      return <Queen piece={piece} />
    case 'king':
      return <King piece={piece} />
    // All six types are covered above, so this is unreachable today. We keep it
    // as a safety net: if a bad `type` ever sneaks in from outside TypeScript's
    // reach (say, saved game data), we render nothing rather than crashing.
    default:
      return null
  }
}

// React components receive exactly ONE props object; we destructure `square`
// out of it, and TypeScript checks it is a Square.
const File = ({ square }: { square: Square }) => {
  // Pull out just the two fields this component uses.
  const { piece, theme } = square

  return (
    // `theme` is the square's CSS class (e.g. "default"); fall back to "default"
    // if it is ever empty so the div always has a valid theme class.
    <div className={`file ${theme ? theme : 'default'}`}>
      {/* Only draw a piece when the square is occupied. When `piece` is null the
          `&&` short-circuits and nothing renders; otherwise renderPiece picks the
          correct component for this piece's type. */}
      {piece && renderPiece(piece)}
    </div>
  )
}

export default File
