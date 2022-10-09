import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookMark";
import Qualite from "./qualite";
const UserTabel = ({ users, onDelete, onMark, selectedSort, onSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualite property={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    stateMark={user.bookmark}
                    callingOnMark={onMark}
                    id={user._id}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className={`badge bg-danger mt-2`}
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
            {/* <tbody>
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
            </tbody> */}
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
