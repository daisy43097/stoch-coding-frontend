import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Cell from "./Cell";
import styles from './Board.module.css';
import actions from "../actions";

const Board = () => {
  const cells = useSelector(state => state?.gameReducers?.cells);
  const winner = useSelector(state => state?.gameReducers?.winner);
  const gameId = useSelector(state => state?.gameReducers?.gameId);
  const curPlayer = useSelector(state => state?.gameReducers?.curPlayer);

  const dispatch = useDispatch();

  const makeMove = (cellNum) => {
    dispatch(actions?.gameAction?.makeMove({
      gameId,
      cellNum,
      curPlayer,
    }));
  };

  console.log('board cells-->>', cells);

  return (
    <div className={styles.board}>
      {
        cells &&
        cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            makeMove={() => makeMove(index)}
            disabled={winner !== null}
          />
        ))
      }
    </div>
  );
};

export default Board;
