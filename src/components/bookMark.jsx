import React from 'react';

export const BookMark = (props) => {
  return (
    <button
      className={
        props.stateMark === false ? 'bi bi-bookmark' : 'bi bi-bookmark-heart'
      }
      onClick={() => props.callingOnMark(props.stateMark, props.id)}
    ></button>
  );
};
