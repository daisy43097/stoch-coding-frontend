import axios from "axios";
import {actionType, BASE_URL} from "../helper/const";

const startNewGame = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/game/start`);
    const {data} = res;
    if (data.rs) {
      console.log('new game action-->>', data.data.gameId)
      const {gameId} = data.data;
      dispatch({
        type: actionType.START_NEW_GAME,
      });
      dispatch({
        type: actionType.UPDATE_GAME_ID,
        payload: gameId,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

const makeMove = ({gameId, cellNum, curPlayer}) => async dispatch => {
  dispatch({
    type: actionType.UPDATE_ERROR_MESSAGE,
    payload: null,
  })

  try {
    const res = await axios.post(`${BASE_URL}/game/move`, {
      gameId,
      cellNum,
      player: curPlayer,
    });

    if (res.data.rs) {
      const {data} = res.data;

      dispatch({
        type: actionType.UPDATE_BOARD,
        payload: data.board,
      });

      dispatch({
        type: actionType.UPDATE_CUR_PLAYER,
        payload: data.nextPlayer,
      });

      if (data.winner !== null) {
        dispatch({
          type: actionType.UPDATE_WINNER,
          payload: data.winner,
        });
      }

      if (data.isTie) {
        dispatch({
          type: actionType.UPDATE_IS_TIE,
          payload: data.isTie,
        });
      }
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      const {data} = e?.response
      dispatch({
        type: actionType.UPDATE_ERROR_MESSAGE,
        payload: data.message,
      })
    }
  }
}

export default {
  startNewGame,
  makeMove,
}