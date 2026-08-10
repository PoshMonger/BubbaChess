import Board from "../components/Board/Board";
import type { BoardType } from "../types/board";
import SideNav from "./SideNav/SideNav";
type BoardPageProps = {
  board: BoardType;
};

const BoardPage = ({ board }: BoardPageProps) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <SideNav />
      {board && <Board />}
    </section>
  );
};

export default BoardPage;
