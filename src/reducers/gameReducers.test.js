import {gameReducers} from "./gameReducers";
import {player} from "../helper/const";

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(gameReducers(undefined, {})).toEqual({
      board: Array(9).fill(null),
      curPlayer: player.x,
      winner: null,
      gameId: null,
      isTie: false,
    });
  });

  it('should handle START_NEW_GAME action', () => {
    const newGameAction = {
      type: 'START_NEW_GAME',
      payload: '123',
    };
    expect(gameReducers(undefined, newGameAction)).toEqual({
      board: Array(9).fill(null),
      curPlayer: player.x,
      winner: null,
      gameId: '123',
      isTie: false,
    });
  });

});
