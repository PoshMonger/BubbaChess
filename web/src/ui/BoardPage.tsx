import Board from '../components/Board/Board';
import type { BoardType } from '../types/board'

type BoardPageProps = {
  board: BoardType
}

const BoardPage = ({board}: BoardPageProps) => {
  return (
    <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      {board && <Board/>}
    </section>
  );
};

export default BoardPage;