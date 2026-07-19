// Knight.tsx — turns a knight from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whiteKnight from '../../../assets/pieces/white-knight.svg'
import blackKnight from '../../../assets/pieces/black-knight.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const Knight = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this knight.
  const colorImage = piece.color === 'white' ? whiteKnight : blackKnight
  // A knight jumps in an "L": two squares along one axis and one along the other,
  // in all eight orientations. Unlike sliding pieces it does not travel down a
  // line, so each vector is a single fixed hop (dx across files, dy across ranks).
  const movementTypes: { dx: number; dy: number }[] = [
    {dx:1,dy:2},
    {dx:2,dy:1},
    {dx:2,dy:-1},
    {dx:1,dy:-2},
    {dx:-1,dy:-2},
    {dx:-2,dy:-1},
    {dx:-2,dy:1},
    {dx:-1,dy:2}
  ]
  // Magnitude 1: a knight makes exactly one jump — it never slides further.
  const movementMagnitude: number = 1;
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{...piece, movementTypes, movementMagnitude, image: colorImage, name: piece.name }} />
}

export default Knight
