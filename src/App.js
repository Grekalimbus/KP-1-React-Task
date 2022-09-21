import React, { useState } from 'react';
import { Users } from './app/components/users';
import { Status } from './app/components/searchStatus';
import api from './app/api';

export function App() {
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
    <div>
      <Users
        metodDelet={handleDelete}
        metodHandleMark={handleMark}
        users={[...getUsers]}
      />
    </div>
  );
}
