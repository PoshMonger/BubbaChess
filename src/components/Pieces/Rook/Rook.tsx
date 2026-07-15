// Rook.tsx — turns a rook from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whiteRook from '../../../assets/pieces/white-rook.svg'
import blackRook from '../../../assets/pieces/black-rook.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const Rook = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this rook.
  const colorImage = piece.color === 'white' ? whiteRook : blackRook
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{ image: colorImage, name: piece.name }} />
}

export default Rook
