// Pawn.tsx — turns a pawn from the board's data model into a rendered image.
import Piece from '../../Piece/Piece'
import whitePawn from '../../../assets/pieces/white-pawn.svg'
import blackPawn from '../../../assets/pieces/black-pawn.svg'
// We accept the SHARED Piece data model so the board can hand a square's piece
// straight to us. It is aliased to `PieceModel` here so it does not clash with
// the <Piece> COMPONENT imported above (which happens to share the name).
import type { Piece as PieceModel } from '../../../types'

const Pawn = ({ piece }: { piece: PieceModel }) => {
  // Choose the correctly-coloured SVG based on which side owns this pawn.
  const colorImage = piece.color === 'white' ? whitePawn : blackPawn
  // A pawn is the one piece whose direction depends on its COLOUR: white advances
  // UP the board toward rank 8 (dy: +1), black advances DOWN toward rank 1 (dy: -1).
  const forward: number = piece.color === 'white' ? 1 : -1
  // It steps straight ahead along its own file (dx: 0). Diagonal captures and the
  // two-square opening move aren't modelled here yet — this is just the basic
  // forward step, kept deliberately simple to match the other pieces' pattern.
  const movementTypes: { dx: number; dy: number }[] = [
    {dx:0,dy:forward}
  ]
  // Magnitude 1: a pawn steps a single square forward.
  const movementMagnitude: number = 1;
  // Hand the generic <Piece> component exactly the two things it renders:
  // the image to show and a name for the <img>'s alt text.
  return <Piece piece={{...piece, movementTypes, movementMagnitude, image: colorImage, name: piece.name }} />
}

export default Pawn
