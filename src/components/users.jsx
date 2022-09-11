import React, { useState } from 'react';
import api from '../api';
export const Users = () => {
  // состояние (массив из объектов)
  const [getUsers, setUsers] = useState(api.users.fetchAll());
  const deletUser = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  // функция основного рендера, в котором в <tbody> вызыывается массив из состояния, измененный на разметку с подставленными значениями
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
          <tbody>
            {getUsers.map((user) => {
              return (
                <tr key={user._id} className={user._id}>
                  <th>{user.name}</th>
                  <th>
                    {user.qualities.map((qual) => (
                      <span
                        key={qual._id}
                        className={`badge bg-${qual.color} m-1`}
                      >
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
            })}
          </tbody>
        </table>
      </>
    );
  };
  if (
    getUsers.length === 4 ||
    getUsers.length === 3 ||
    getUsers.length === 2 ||
    getUsers.length === 1
  ) {
    return createPatternTable(
      getUsers.length,
      'Человека тусанет с тобой сегодня',
      'badge bg-primary'
    );
  }
  if (getUsers.length === 0) {
    return <h1 className="badge bg-danger">С тобой никто не тусанет</h1>;
  }
  return createPatternTable(
    getUsers.length,
    'Человек тусанут с тобой сегодня',
    'badge bg-primary'
  );
};
