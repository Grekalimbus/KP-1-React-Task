import React, { useState } from 'react';
import api from '../api';
export const Users = () => {
  const elementsTabelUsers = api.users.fetchAll().map((user) => {
    return (
      <tr key={user._id}>
        <th>{user.name}</th>
        <th>
          {user.qualities.map((qual) => (
            <span key={qual._id} className={`badge bg-${qual.color} m-1`}>
              {qual.name}
            </span>
          ))}
        </th>
        <th>{user.profession.name}</th>
        <th>{user.completedMeetings}</th>
        <th>{`${user.rate}/5`}</th>
        <button
          className="badge bg-danger mt-2"
          onClick={() => deletUser(user._id)}
        >
          Delete
        </button>
      </tr>
    );
  });
  const [users, setUsers] = useState(elementsTabelUsers);
  const [valuePipl, setPiple] = useState(users.length);

  const deletUser = (id) => {
    setUsers((prevState) => prevState.filter((user) => user.key !== id));
    setPiple((prevState) => prevState - 1);
  };

  const createPatternTable = (value, text, classNameTitle) => {
    return (
      <>
        <h1 className={classNameTitle}>{`${value} ${text}`}</h1>
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
          <tbody>{users}</tbody>
        </table>
      </>
    );
  };

  if (
    valuePipl === 4 ||
    valuePipl === 3 ||
    valuePipl === 2 ||
    valuePipl === 1
  ) {
    return createPatternTable(
      valuePipl,
      'Человека тусанет с тобой сегодня',
      'badge bg-primary'
    );
  }
  if (valuePipl === 0) {
    return <h1 className="badge bg-danger">С тобой никто не тусанет</h1>;
  }
  return createPatternTable(
    valuePipl,
    'Человек тусанут с тобой сегодня',
    'badge bg-primary'
  );
};
