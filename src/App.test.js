import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import * as reactRedux from 'react-redux';
import {Provider} from "react-redux";
import {createStore} from "redux";
import actions from "./actions";

jest.mock('./actions', () => ({
  gameAction: {
    startNewGame: jest.fn(),
  },
}));

jest.mock('react-redux', () => {
  const originalModule = jest.requireActual('react-redux');

  // Mock only useDispatch and useSelector
  return {
    ...originalModule,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

describe('App Component', () => {
  // Mock dispatch function
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Clear mocks and set up initial state for each test
    mockDispatch.mockClear();
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRedux.useSelector.mockImplementation(selector => selector({
      gameReducers: {
        cells: Array(9).fill('X'),
        curPlayer: 'X',
        winner: null,
        gameId: '123',
        isTie: false,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state and dispatches action on mount', () => {
    render(
      <Provider store={createStore(() => {}, {})}>
        <App />
      </Provider>
    );

    const newGameBtn = screen.getByText(/start new game/i);

    expect(newGameBtn).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test('dispatches startNewGame action on button click', () => {
    render(
      <Provider store={createStore(() => {}, {})}>
        <App />
      </Provider>
    );

    const newGameBtn = screen.getByText(/start new game/i);

    fireEvent.click(newGameBtn);

    // Verify that startNewGame action is dispatched on button click
    expect(mockDispatch).toHaveBeenCalled();
    expect(actions.gameAction.startNewGame).toHaveBeenCalledTimes(2); // Once on mount and once on click
  });
});


