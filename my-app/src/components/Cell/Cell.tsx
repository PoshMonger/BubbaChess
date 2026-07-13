import React from 'react'

const Cell = ({ value }: { value: string }, piece: Piece, isSelected: boolean, isHovered: boolean, isTarget: boolean, isPossible: boolean,theme: string) => {
  return (
    <div className={`cell ${theme? theme : 'default'}`}>
      {value}
    </div>
  )
}

export default Cell