import React from "react";
import Qualite from "./qualite";
import BookMark from "./bookMark";
import PropTypes from "prop-types";
const User = ({
    onDelete,
    onMark,
    name,
    qualities,
    completedMeetings,
    rate,
    bookmark,
    _id,
    profession
}) => {
    // console.log(props);
    return (
        <tr>
            <th>{name}</th>
            <Qualite property={qualities} />
            <th>{profession.name}</th>
            <th>{completedMeetings}</th>
            <th>{`${rate}/5`}</th>
            <th>
                <BookMark
                    stateMark={bookmark}
                    callingOnMark={onMark}
                    id={_id}
                />
            </th>
            <th>
                <button
                    key={_id}
                    className={`badge bg-danger mt-2`}
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </th>
        </tr>
    );
};
User.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onMark: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired
};
export default User;
