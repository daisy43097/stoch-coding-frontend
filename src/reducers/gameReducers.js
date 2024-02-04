import {actionType, player} from "../helper/const";

const initState = {
  cells: Array(9).fill(null),
  curPlayer: player.x,
  winner: null,
  gameId: null,
  isTie: false,
  errorMessage: null,
};

export const gameReducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.START_NEW_GAME:
      return initState;
    case actionType.UPDATE_GAME_ID:
      return {...state, gameId: action.payload};
    case actionType.UPDATE_ERROR_MESSAGE:
      return {...state, errorMessage: action.payload};
    case actionType.UPDATE_IS_TIE:
      return {...state, isTie: action.payload};
    case actionType.UPDATE_WINNER:
      return {...state, winner: action.payload};
    case actionType.UPDATE_CUR_PLAYER:
      return {...state, curPlayer: action.payload};
    case actionType.UPDATE_BOARD:
      return {...state, cells: action.payload};
    default:
      return state;
  }
}