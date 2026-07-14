import React from 'react'
import Piece from '../Piece/Piece'
const File = ({ value }: { value: string }, piece: Piece, isSelected: boolean, isHovered: boolean, isTarget: boolean, isPossible: boolean,theme: string) => {
  return (
    <div className={`file ${theme? theme : 'default'}`}>
 {piece && <Piece piece={piece} />}
    </div>
  )
}

export default File