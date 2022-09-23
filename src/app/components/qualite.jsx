import React, { useState } from 'react';

// props является объектом {qualit: array}
// В array будет массив из 3 объектов. чтобы обратится конкретно к массиву (где 3 объекта), нужно указать ключ - это qualit
//
const Qualite = (props) => {
  //   console.log(props.qualit); //  [{…}, {…}, {…}]
  return (
    <th>
      {props.qualit.map((qualite, index) => {
        return (
          <span
            key={index}
            className={`badge bg-${qualite.color} m-1`}
          >{`${qualite.name} `}</span>
        );
      })}
    </th>
  );
};

export default Qualite;
