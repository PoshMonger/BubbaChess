import React from 'react'
import Piece from '../../Piece/Piece'
import whiteBishop from '../../../assets/white-bishop.png'
import blackBishop from '../../../assets/black-bishop.png'
import { Piece as PieceType } from '../../../../redux/boardSlice'
const Bishop = ({piece}: {piece: PieceType}) => {
  const { image, name, color } = piece;
  
  return <Piece piece={piece} />;
};

export default Bishop;