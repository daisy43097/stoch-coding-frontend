import {gameReducers} from "./gameReducers";
import {actionType, player} from "../helper/const";

// Mocking axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(gameReducers(undefined, {})).toEqual({
      cells: Array(9).fill(null),
      curPlayer: player.x,
      winner: null,
      gameId: null,
      isTie: false,
      errorMessage: null,
    });
  });

  it('should handle UPDATE_GAME_ID action', () => {
    const newGameAction = {
      type: actionType.UPDATE_GAME_ID,
      payload: '123',
    };
    expect(gameReducers(undefined, newGameAction)).toEqual({
      cells: Array(9).fill(null),
      curPlayer: player.x,
      winner: null,
      gameId: '123',
      isTie: false,
      errorMessage: null,
    });
  });

});
