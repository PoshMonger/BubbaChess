import React from 'react'
import Piece from '../../Piece/Piece'
import whiteBishop from '../../../assets/pieces/white-bishop.svg'
import blackBishop from '../../../assets/pieces/black-bishop.svg'

const Bishop = ({color, moves}: {color: 'white' | 'black', moves: string[]}) => {
  const colorImage = color === 'white' ? whiteBishop : blackBishop;
  return <Piece image={colorImage} moves={moves} />;
};

export default Bishop;