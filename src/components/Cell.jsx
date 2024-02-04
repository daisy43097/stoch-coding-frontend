import React from 'react';

const Cell = ({value, makeMove, disabled}) => {
  return (
    <button onClick={makeMove} disabled={disabled}>
      {value}
    </button>
  );
};

export default Cell;
