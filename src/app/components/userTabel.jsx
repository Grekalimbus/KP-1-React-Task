import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTabel = ({ users, onDelete, onMark, currentSort, onSort }) => {
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        onClick={() => handleSort("profession.name")}
                        scope="col"
                    >
                        Професия
                    </th>
                    <th
                        onClick={() => handleSort("completedMeetings")}
                        scope="col"
                    >
                        Встретился, раз
                    </th>
                    <th onClick={() => handleSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => handleSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((item) => {
                    return (
                        <User
                            key={item._id}
                            {...item}
                            onDelete={onDelete}
                            onMark={onMark}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};
UserTabel.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};
export default UserTabel;
