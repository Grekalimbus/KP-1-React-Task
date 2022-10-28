import React from "react";
import PropTypes from "prop-types";

const Status = ({ value }) => {
    const valueStatus = value.length;
    const numberStatus = () => {
        if (valueStatus > 4 && valueStatus < 15) {
            return `${valueStatus} Тусанут с тобой сегодня`;
        }
        if (
            valueStatus === 4 ||
            valueStatus === 3 ||
            valueStatus === 2 ||
            valueStatus === 1
        ) {
            return `${valueStatus} Тусананет с тобой сегодня`;
        }
        if (valueStatus === 0) {
            return `Никто с тобой сегодня не тусанет`;
        }
    };
    return (
        <h1
            className={valueStatus > 0 ? `badge bg-primary` : `badge bg-danger`}
        >
            {numberStatus()}
        </h1>
    );
};

Status.propTypes = {
    value: PropTypes.array.isRequired
};
export default Status;
