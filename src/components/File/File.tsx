// File.tsx — renders ONE square of the board (its themed background, plus the
// piece standing on it if the square is occupied).
import Bishop from '../Pieces/Bishop/Bishop'
// A File is described entirely by a single Square from our shared types, so we
// take that as one prop instead of a long list of separate props.
import type { Square } from '../../types'

// React components receive exactly ONE props object. Here we destructure the
// `square` prop out of it, and TypeScript checks it is a Square.
const File = ({ square }: { square: Square }) => {
  // Pull out just the two fields this component actually uses.
  const { piece, theme } = square

  return (
    // `theme` is the square's CSS class (e.g. "default"); fall back to "default"
    // if it is ever empty so the div always has a valid theme class.
    <div className={`file ${theme ? theme : 'default'}`}>
      {/* Only draw a piece when the square is occupied. When `piece` is null the
          `&&` short-circuits and nothing renders. When it is a Piece object we
          hand it to <Bishop>. (Placeholder: every occupied square currently draws
          a Bishop — a per-piece-type choice comes later.) */}
      {piece && <Bishop piece={piece} />}
    </div>
  )
}

export default File
