import React from 'react';
import './Board.css'
import { useSelector } from 'react-redux';
import Cell from '../Cell/Cell'; //TODO: create types for the board 
const Board = () => {
  const board = useSelector((state: any) => state.board);
  return (
    <div className='board'>
      {board.map((row, index) => (
        <div key={index} className='row'>
          {row.map((cell: { coordinate: string; row: string; column: number; }, index: number): JSX.Element => (
            
                <Cell key={index} value={cell.coordinate} />
        
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;