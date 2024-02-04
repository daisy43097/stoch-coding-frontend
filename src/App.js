import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import actions from "./actions";
import Board from "./components/Board";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function App() {
  const curPlayer = useSelector(state => state?.gameReducers?.curPlayer);
  const winner = useSelector(state => state?.gameReducers?.winner);
  const isTie = useSelector(state => state?.gameReducers?.isTie);
  const errorMessage = useSelector(state => state?.gameReducers?.errorMessage);

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
      {
        isTie &&
        <h2>
          Game is in a tie!
        </h2>
      }
      {
        winner && winner !== null &&
        <h2>
          <FontAwesomeIcon icon={faStar} style={{marginRight: '0.5rem'}}/>
          Winner: {winner}
          <FontAwesomeIcon icon={faStar} style={{marginLeft: '0.5rem'}}/>
        </h2>
      }
      <h3>
        Current Player: {curPlayer}
      </h3>
      {
        errorMessage &&
        <h4 className='errorMessage'>
          {errorMessage}
        </h4>
      }
      <Board />
      <button className='newGameBtn' onClick={startGame}>
        Start New Game
      </button>
    </div>
  );
}

export default App;
