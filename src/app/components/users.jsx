import React, { useState, useEffect } from "react";
import UserTabel from "./userTabel";
import Status from "./searchStatus";
import Pagination from "./pagination";
import { Paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import _ from "lodash";

export const Users = (props) => {
    // users - массив из объектов (12)
    // metodDelet/metodHandleMark - пропсы, в которых методы из файла App.js
    const { users, methodDelete, methodHandleMark } = props;

    const pageSize = 8; // количество пользователей, которые будут отображатся на странице
    // состояния
    const [currentPage, setCurrenPage] = useState(1);
    // professions - массив из объектов профессий (6шт) / [{},{},...]
    const [professions, setProffesion] = useState();
    // selectedProf - объект одной из професии / { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" }
    const [selectedProf, setSelectedProf] = useState();
    // состояние для сортировки
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
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
    // хук, который обрабатывает промис и получает данные, после чего вызывается setProffesion, чтобы установить состояние professions
    // это происходит так потому, что данные приходят не сразу, поэтому состояние устанавливается в этом хуке после того, как пришли данные
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            return setProffesion(data);
        });
    }, []);

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    // сортировка с помощью lodash
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
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
                <Status value={users} />
                <UserTabel
                    users={userCrop}
                    onMark={methodHandleMark}
                    onDelete={methodDelete}
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
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    methodDelete: PropTypes.func.isRequired,
    methodHandleMark: PropTypes.func.isRequired
};
