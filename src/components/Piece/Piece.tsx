// We only need `useState` here; the automatic JSX runtime means we don't import
// React itself (importing it unused would trip the noUnusedLocals check).
import { useState } from "react";

const Piece = ({ piece }: { piece: { image: string; name: string } }) => {
  const { image, name } = piece;
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setSelected(!selected);
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
      className={`${isHovered ? "hovered" : ""} ${selected ? "selected" : ""}`}
    />
  );
};

export default Piece;
