// King.tsx — turns a king from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whiteKing from '../../../assets/pieces/white-king.svg'
import blackKing from '../../../assets/pieces/black-king.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const King = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this king.
  const colorImage = piece.color === 'white' ? whiteKing : blackKing
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{ image: colorImage, name: piece.name }} />
}

export default King
