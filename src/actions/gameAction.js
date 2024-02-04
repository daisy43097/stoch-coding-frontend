import axios from "axios";
import {actionType, BASE_URL} from "../helper/const";

const startNewGame = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/game/start`);
    const {data} = res;
    if (data.rs) {
      const {gameId} = data.data;
      dispatch({
        type: actionType.UPDATE_GAME_ID,
        payload: gameId,
      })
    }
  } catch (e) {
    console.log(e);
  }
}

export default {
  startNewGame,
}