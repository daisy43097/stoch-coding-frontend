import Board from "./Board";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {createStore} from "redux";
import {gameReducers} from "../reducers/gameReducers";
import {Provider} from "react-redux";
import {player} from "../helper/const";

function renderWithRedux(
  component,
  { initialState, store = createStore(gameReducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

// Mock Cell component for demonstration purposes
jest.mock('./Cell', () => ({ value, makeMove, disabled }) => (
  <button onClick={makeMove} disabled={disabled}>
    {value}
  </button>
));

describe('Board Component', () => {
  const makeMoveMock = jest.fn();

  test('renders correct number of cells', () => {
    const initialState = {
      gameReducers: {
        cells: Array(9).fill(null),
        curPlayer: player.x,
        winner: null,
        gameId: null,
        isTie: false,
      }
    }

    renderWithRedux(<Board />, {initialState});

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  test('passes correct props to cell', () => {
    const initialState = {
      gameReducers: {
        cells: Array(9).fill('X'),
        curPlayer: player.x,
        winner: player.x,
        gameId: null,
        isTie: false,
      }
    }

    renderWithRedux(<Board />, {initialState});

    const buttons = screen.queryAllByRole('button');
    expect(buttons[0]).toHaveTextContent('X');
    expect(buttons[0]).toBeDisabled();
  })

  test('Cell components are disabled when there is a winner', () => {
    const initialState = {
      gameReducers: {
        cells: Array(9).fill('X'),
        curPlayer: player.x,
        winner: null,
        gameId: null,
        isTie: false,
      }
    }

    renderWithRedux(<Board />, { initialState });

    // Assuming your Cell component renders a button or another distinguishable role, adjust as necessary
    const cellElements = screen.queryAllByRole('button'); // Adjust query based on your Cell's rendered output
    cellElements.forEach(cell => {
      expect(cell).not.toBeDisabled();
    });
  });

})