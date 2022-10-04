import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTabel = ({ users, onDelete, onMark }) => {
    return (
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
    onMark: PropTypes.func.isRequired
};
export default UserTabel;
