import React, { useState } from 'react';
import Qualite from './qualite';
import BookMark from './bookMark';
const User = (props) => {
  // console.log(props);
  return (
    <tr>
      <th>{props.name}</th>
      <Qualite qualit={props.qualities} />
      <th>{props.profession.name}</th>
      <th>{props.completedMeetings}</th>
      <th>{`${props.rate}/5`}</th>
      <th>
        <BookMark
          stateMark={props.bookmark}
          callingOnMark={props.onMark}
          id={props._id}
        />
      </th>
      <th>
        <button
          key={props._id}
          className={`badge bg-danger mt-2`}
          onClick={() => props.onDelete(props._id)}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default User;
