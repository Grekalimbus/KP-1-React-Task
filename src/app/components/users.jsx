import React, { useState, useEffect } from "react";
import UserTabel from "./userTabel";
import Status from "./searchStatus";
import Pagination from "./pagination";
import { Paginate } from "../utils/paginate";

import GroupList from "./groupList";
import api from "../api";
import _ from "lodash";

export const Users = () => {
    const pageSize = 8; // количество пользователей, которые будут отображатся на странице
    // состояния
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProffesion] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [getUsers, setUsers] = useState();
    // методы
    // метод для пагинации
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrenPage(pageIndex);
    };
    // метод для груп листа
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setCurrenPage(1);
    };
    // метод для сбрасывания состояния selectedProf
    const clearfilter = () => {
        setSelectedProf();
    };
    // метод для таблицы
    const handleSort = (item) => {
        setSortBy(item);
    };
    // console.log(getUsers);
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
    // хук, который обрабатывает промис и получает данные, после чего вызывается setProffesion, чтобы установить состояние professions
    // это происходит так потому, что данные приходят не сразу, поэтому состояние устанавливается в этом хуке после того, как пришли данные
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            return setProffesion(data);
        });
    }, []);
    if (getUsers !== undefined) {
        const filteredUsers = selectedProf
            ? getUsers.filter(
                  (user) => user.profession._id === selectedProf._id
              )
            : getUsers;
        const count = filteredUsers.length;
        // сортировка с помощью lodash
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = Paginate(sortedUsers, currentPage, pageSize); // Paginate - функция которая режет массив обьекта и оставляет там 4 элемента

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearfilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <Status value={getUsers} />
                    <UserTabel
                        users={userCrop}
                        onMark={handleMark}
                        onDelete={handleDelete}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
