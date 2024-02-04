import React from 'react';
import {useSelector} from "react-redux";
import Cell from "./Cell";

const Board = () => {
  const cells = useSelector(state => state?.gameReducers?.cells);
  const winner = useSelector(state => state?.gameReducers?.winner);

  return (
    <div>
      {
        cells &&
        cells.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            disabled={winner === null ? false : true}
          />
        ))
      }
    </div>
  );
};

export default Board;
