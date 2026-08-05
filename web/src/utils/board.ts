import type { Board } from "../types/board";
import type { Piece } from "../types/piece";
import { showMoves } from "./piece";
import { useDispatch } from "react-redux";
import { highlightMoves as highlightMovesAction } from "../redux/boardSlice";

const highlightMoves = (board: Board, piece: Piece,moves: { file: number, rank: number }[]) => {
  const dispatch = useDispatch();
  dispatch(highlightMovesAction({ moves }))
}

export { highlightMoves };