import type { Piece } from '../types/piece';

const showMoves = (piece: Piece & { movementTypes: { dx: number; dy: number }[]; movementMagnitude: number }) => {
let x = piece.file;
let y = piece.rank;

  const moves = piece.movementTypes.map((type) => {
    let magnitude = 0;
    let pieceMovTypeArr = [];
    while (magnitude < piece.movementMagnitude) {
      const newX = x + type.dx
      const newY = y + type.dy
      
      pieceMovTypeArr.push({
        file: newX,
        rank: newY
      })
      magnitude++
      x += type.dx
      y += type.dy
    }
    return pieceMovTypeArr
  })
  console.log(moves.flat());
return moves.flat();
};

export { showMoves };