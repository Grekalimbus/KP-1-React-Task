import React, { useState, useEffect } from "react";
import User from "./user";
import Status from "./searchStatus";
import Pagination from "./pagination";
import { Paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

export const Users = (props) => {
    // users - массив из объектов (12)
    // metodDelet/metodHandleMark - пропсы, в которых методы из файла App.js
    const { users, methodDelete, methodHandleMark } = props;

    // 2 константы для работы с копмонентом pagination, эти константы будут использованы как пропсы

    const pageSize = 2; // количество пользователей, которые будут отображатся на странице
    const [currentPage, setCurrenPage] = useState(1);
    // professions - массив из объектов профессий (6шт) / [{},{},...]
    const [professions, setProffesion] = useState();
    // selectedProf - объект одной из професии / { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" }
    const [selectedProf, setSelectedProf] = useState();
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrenPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setCurrenPage(1);
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
    const userCrop = Paginate(filteredUsers, currentPage, pageSize); // Paginate - функция которая режет массив обьекта и оставляет там 4 элемента
    // начиная с полученного индекса
    const clearfilter = () => {
        setSelectedProf();
    };
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
                        {userCrop.map((item) => {
                            return (
                                <User
                                    key={item._id}
                                    {...item}
                                    onDelete={methodDelete}
                                    onMark={methodHandleMark}
                                />
                            );
                        })}
                    </tbody>
                </table>
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
