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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img src={image} alt={name} className={`${isHovered ? "hovered" : ""} ${selected ? "selected" : ""}`} />
    </div>
  );
};

export default Piece;
