import React, { useState } from 'react';
import { User } from './user';
import api from '../api';
import { Status } from './searchStatus';
import { Pagination } from './pagination';

export const Users = (props) => {
  // users - массив из объектов (12)
  // metodDelet/metodHandleMark - пропсы, в которых методы из файла App.js
  const { users, metodDelet, metodHandleMark } = props;

  // 2 константы для работы с копмонентом pagination, эти константы будут использованы как пропсы
  const count = users.length;
  const pageSize = 4; // количество пользователей, которые будут отображатся на странице
  const handlePageChange = (pageIndex) => {
    console.log('page: ', pageIndex);
  };
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
            <th scope="col"></th>
            <th scope="col"></th>
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};
