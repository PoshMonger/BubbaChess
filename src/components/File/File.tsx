// File.tsx — renders ONE square of the board (its themed background, plus the
// piece standing on it if the square is occupied).
import Bishop from '../Pieces/Bishop/Bishop'
// `Square` types the whole square; `Piece` (aliased to PieceModel so it can't be
// confused with the <Piece> COMPONENT elsewhere) types a single piece.
import type { Square, Piece as PieceModel } from '../../types'

// Decide WHICH component draws a given piece.
// A `switch` is a STATEMENT, and JSX only allows EXPRESSIONS inside `{ ... }`, so
// the switch cannot live directly in the markup. We put it in this helper, which
// RETURNS the right element, and then call the helper from the JSX below.
const renderPiece = (piece: PieceModel) => {
  switch (piece.type) {
    // A bishop has its own component, which picks the right-coloured SVG.
    case 'bishop':
      return <Bishop piece={piece} />
    // The other piece types don't have their own component yet, so we draw
    // nothing for them. As you build each one, add a case here, e.g.
    //   case 'knight': return <Knight piece={piece} />
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
