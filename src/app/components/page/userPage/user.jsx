import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ChangeUser from "../userForm";

const User = ({ currentUser, edit }) => {
    if (currentUser !== undefined) {
        if (!edit) {
            return (
                <div>
                    <h1>{currentUser.name}</h1>
                    <h2>Профессия: {currentUser.profession.name}</h2>
                    {currentUser.qualities.map((property) => {
                        return (
                            <span
                                className={`badge bg-${property.color} m-2`}
                                key={property.name}
                            >
                                {`${property.name} `}{" "}
                            </span>
                        );
                    })}
                    <h2>CompletedMeetings: {currentUser.completedMeetings}</h2>
                    <h2>Rate: {currentUser.rate}</h2>
                    <button>
                        <Link to={`/users/${currentUser._id}/edit`}>
                            Изменить
                        </Link>
                    </button>
                </div>
            );
        } else {
            return <ChangeUser />;
        }
    }
    return "Loading...";
};

User.propTypes = {
    currentUser: PropTypes.object,
    edit: PropTypes.string
};
export default User;
