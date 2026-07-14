// Board.tsx — draws the whole chessboard from the Redux state.
import './Board.css'
import { useSelector } from 'react-redux'
import File from '../File/File'
// RootState describes the shape of the ENTIRE Redux store. Importing it lets us
// type the selector below, which is how `board` becomes a real Board (Square[][])
// instead of `any`. It is a type-only import (`verbatimModuleSyntax: true`).
import type { RootState } from '../../redux/store'

const Board = () => {
  // Read the 8×8 array of squares out of the store. Typing `state` as RootState
  // means TypeScript knows `state.board` is a Board, so `row`/`square` below are
  // fully typed for free (no manual annotations, no `any`).
  const board = useSelector((state: RootState) => state.board)

  return (
    <div className='board'>
      {/* Outer loop: one <div className="row"> per rank (row) of the board. */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {/* Inner loop: one <File> per square in that rank. We hand the WHOLE
              square down as a single prop instead of spreading its fields out —
              simpler to pass and it stays type-checked against the Square type. */}
          {row.map((square, colIndex) => (
            <File key={colIndex} square={square} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
