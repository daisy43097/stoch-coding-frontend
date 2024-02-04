import React from 'react';
import {useSelector} from "react-redux";
import Cell from "./Cell";
import styles from './Board.module.css';

const Board = () => {
  const cells = useSelector(state => state?.gameReducers?.cells);
  const winner = useSelector(state => state?.gameReducers?.winner);

  return (
    <div className={styles.board}>
      {
        cells &&
        cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            disabled={winner !== null}
          />
        ))
      }
    </div>
  );
};

export default Board;
