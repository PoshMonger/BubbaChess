import React from 'react';
import Board from '../components/Board/Board';
import BoardPage from '../ui/BoardPage';
type Props = {}

const Home = (props: Props) => {
  return (  
    <>  
      <BoardPage board={<Board />} />
    </>

  )
}

export default Home