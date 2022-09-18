import React, { useState } from 'react';
import { User } from './user';
import api from '../api';
import { Status } from './searchStatus';

export const Users = () => {
  const [getUsers, setUsers] = useState(api.users.fetchAll());
  // метод, который удаляет юзеров
  // этот метод вызывается в пропсе в компоненте User
  const handleDelete = (userId) => {
    setUsers(
      getUsers.filter((item) => {
        return item._id !== userId;
      })
    );
  };
  // функция, в которой меняется состояние ключа bookmark
  // при нажатии на кнопку, вычисляется индекс, потом создается новый объект, где по указаному индксу в ключе bookmark меняется значение
  const handleMark = (state, id) => {
    const indexBookMark = getUsers.findIndex((item) => {
      return item._id === id;
    });
    const newState = [...getUsers];
    if (newState[indexBookMark].bookmark === false) {
      newState[indexBookMark].bookmark = true;
    } else if (newState[indexBookMark].bookmark === true) {
      newState[indexBookMark].bookmark = false;
    }
    setUsers(newState);
  };
  return (
    <>
      <Status value={getUsers} />
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
          {getUsers.map((item) => {
            return (
              <User
                key={item._id}
                {...item}
                onDelete={handleDelete}
                onMark={handleMark}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
