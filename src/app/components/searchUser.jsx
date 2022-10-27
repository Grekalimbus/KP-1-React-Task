import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ value, onChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="w-100"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
SearchUser.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default SearchUser;
