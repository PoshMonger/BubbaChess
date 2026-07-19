// Queen.tsx — turns a queen from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whiteQueen from '../../../assets/pieces/white-queen.svg'
import blackQueen from '../../../assets/pieces/black-queen.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const Queen = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this queen.
  const colorImage = piece.color === 'white' ? whiteQueen : blackQueen
  // A queen combines the rook and bishop: all EIGHT directions — the four straight
  // ones (up/down/left/right) and the four diagonals. dx steps across files,
  // dy steps across ranks; a 0 means "don't move on that axis".
  const movementTypes: { dx: number; dy: number }[] = [
    {dx:1,dy:0},
    {dx:-1,dy:0},
    {dx:0,dy:1},
    {dx:0,dy:-1},
    {dx:1,dy:1},
    {dx:1,dy:-1},
    {dx:-1,dy:1},
    {dx:-1,dy:-1}
  ]
  // Magnitude 8: like the rook and bishop, she slides across the whole board.
  const movementMagnitude: number = 8;
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{...piece, movementTypes, movementMagnitude, image: colorImage, name: piece.name }} />
}

export default Queen
