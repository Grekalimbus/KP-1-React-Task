import React, { useEffect, useState } from "react";
import { Users } from "./app/components/users";
import api from "./app/api";

export function App() {
    const [getUsers, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((users) => {
            return setUsers(users);
        });
    }, []);
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
    if (getUsers) {
        return (
            <div>
                <Users
                    methodDelete={handleDelete}
                    methodHandleMark={handleMark}
                    users={[...getUsers]}
                />
            </div>
        );
    }
}
