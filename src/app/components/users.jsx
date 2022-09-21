import React, { useState } from 'react';
import { User } from './user';
import api from '../api';
import { Status } from './searchStatus';

export const Users = (props) => {
  const { users, metodDelet, metodHandleMark } = props;
  return (
    <>
      <Status value={users} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Професия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <User
                key={item._id}
                {...item}
                onDelete={metodDelet}
                onMark={metodHandleMark}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
