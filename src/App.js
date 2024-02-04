import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import actions from "./actions";
import Board from "./components/Board";

function App() {
  const curPlayer = useSelector(state => state?.gameReducers?.curPlayer);
  const winner = useSelector(state => state?.gameReducers?.winner);
  const gameId = useSelector(state => state?.gameReducers?.gameId);
  const isTie = useSelector(state => state?.gameReducers?.isTie);

  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(actions?.gameAction?.startNewGame());
  }

  useEffect(() => {
    startGame();
  }, [])

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
      <button className='newGameBtn' onClick={startGame}>
        Start New Game
      </button>
    </div>
  );
}

export default App;
