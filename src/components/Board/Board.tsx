import React from 'react';
import './Board.css'
import { useSelector } from 'react-redux';
import File from '../File/File'; //TODO: create types for the board 
const Board = () => {
  const board = useSelector((state: any) => state.board);
  return (
    <div className='board'>
      {board.map((row, index) => (
        <div key={index} className='row'>
          {row.map((cell: { coordinate: string; row: string; column: number; }, index: number): JSX.Element => (   
                <File piece={cell.piece} isSelected={cell.isSelected} isHovered={cell.isHovered} isTarget={cell.isTarget} isPossible={cell.isPossible} theme={cell.theme} key={index} value={cell.coordinate} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;