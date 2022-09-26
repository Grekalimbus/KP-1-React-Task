import React, { useState } from "react";
import User from "./user";
import Status from "./searchStatus";
import Pagination from "./pagination";
import { Paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";

export const Users = (props) => {
    // users - массив из объектов (12)
    // metodDelet/metodHandleMark - пропсы, в которых методы из файла App.js
    const { users, metodDelet, metodHandleMark } = props;

    // 2 константы для работы с копмонентом pagination, эти константы будут использованы как пропсы
    const count = users.length;
    const pageSize = 4; // количество пользователей, которые будут отображатся на странице
    const [currentPage, setCurrenPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrenPage(pageIndex);
    };

    const userCrop = Paginate(users, currentPage, pageSize); // Paginate - функция которая режет массив обьекта и оставляет там 4 элемента
    // начиная с полученного индекса
    return (
        <>
            <GroupList />
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
