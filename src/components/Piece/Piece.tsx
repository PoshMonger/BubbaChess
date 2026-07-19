// We only need `useState` here; the automatic JSX runtime means we don't import
// React itself (importing it unused would trip the noUnusedLocals check).
import { useState } from "react";
import { showMoves } from "../../utils/piece";
import type { Piece } from "../../types/piece";
import { highlightMoves as highlightMovesAction, unhighlightMoves as unhighlightMovesAction, setSelected as setSelectedAction, unselect as unselectAction } from "../../redux/boardSlice";
import { useDispatch } from "react-redux";
import "./Piece.css";
const Piece = ({ piece }: { piece: Piece & { image: string; name: string; movementTypes: { dx: number; dy: number }[]; movementMagnitude: number, isSelected: boolean } }) => {
  const { image, name, movementTypes, movementMagnitude, isSelected } = piece;
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch(); 
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    dispatch(unhighlightMovesAction({ moves: showMoves(piece) as { file: number; rank: number }[] }));
    dispatch(unselectAction());
    dispatch(setSelectedAction([piece.file, piece.rank])
  );
    dispatch(highlightMovesAction({ moves: showMoves(piece) as { file: number; rank: number }[] }));
   
  };

  return (
    <img
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      width={60}
      height={60}
      src={image}
      alt={name}
      className={`piece ${isHovered ? "hovered" : ""} ${isSelected ? "selected" : ""}`}
    />
  );
};

export default Piece;
