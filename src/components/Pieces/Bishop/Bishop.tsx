// Bishop.tsx — turns a bishop from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whiteBishop from '../../../assets/pieces/white-bishop.svg'
import blackBishop from '../../../assets/pieces/black-bishop.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const Bishop = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this bishop.
  const colorImage = piece.color === 'white' ? whiteBishop : blackBishop
  const movementTypes: { dx: number; dy: number }[] = [
    {dx:1,dy:1},
    {dx:1,dy:-1},
    {dx:-1,dy:1},
    {dx:-1,dy:-1}
  ]
  const movementMagnitude: number = 8;
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{...piece, movementTypes, movementMagnitude, image: colorImage, name: piece.name }} />
}

export default Bishop
