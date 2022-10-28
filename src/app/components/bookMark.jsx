import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ callingOnMark, stateMark, id }) => {
    return (
        <button
            className={
                stateMark === false ? "bi bi-bookmark" : "bi bi-bookmark-heart"
            }
            onClick={() => callingOnMark(stateMark, id)}
        ></button>
    );
};
BookMark.propTypes = {
    callingOnMark: PropTypes.func.isRequired,
    stateMark: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};
export default BookMark;
