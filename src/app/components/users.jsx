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
    const { users, metodDelet, metodHandleMark } = props;

    // 2 константы для работы с копмонентом pagination, эти константы будут использованы как пропсы
    const count = users.length;
    const pageSize = 4; // количество пользователей, которые будут отображатся на странице
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProffesion] = useState();
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrenPage(pageIndex);
    };
    const handleProfessionSelect = (params) => {
        console.log(params);
    };
    // console.log(professions);
    // хук, который обрабатывает промис и получает данные, после чего вызывается setProffesion, чтобы установить состояние professions
    // это происходит так потому, что данные приходят не сразу, поэтому состояние устанавливается в этом хуке после того, как пришли данные
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            return setProffesion(data);
        });
    }, []);

    const userCrop = Paginate(users, currentPage, pageSize); // Paginate - функция которая режет массив обьекта и оставляет там 4 элемента
    // начиная с полученного индекса
    return (
        <>
            <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
            />
            <Status value={userCrop} />
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
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    metodDelet: PropTypes.func.isRequired,
    metodHandleMark: PropTypes.func.isRequired
};
