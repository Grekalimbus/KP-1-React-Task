import React from "react";
import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";

const UserTabel = ({ users, onDelete, onMark, selectedSort, onSort }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
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
    selectedSort: PropTypes.object.isRequired
};
export default UserTabel;
