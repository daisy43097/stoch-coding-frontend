import {actionType, player} from "../helper/const";

const initState = {
  board: Array(9).fill(null),
  curPlayer: player.x,
  winner: null,
  gameId: null,
  isTie: false,
};

export const gameReducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.START_NEW_GAME:
      return {...state, gameId: action.payload};
    default:
      return state;
  }
}