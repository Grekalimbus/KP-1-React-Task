import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ currentUser }) => {
    console.log(currentUser);
    if (currentUser !== undefined) {
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
                    <Link to="/users">Все пользователи</Link>
                </button>
            </div>
        );
    }
    return "Loading...";
};

User.propTypes = {
    currentUser: PropTypes.object.isRequired
};
export default User;
