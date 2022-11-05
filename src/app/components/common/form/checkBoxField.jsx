import React from "react";
import PropTypes from "prop-types";
const CheckBoxField = (name, value, onChange, children) => {
    const handleChange = (value) => {
        onChange({ name: name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
        </div>
    );
};

CheckBoxField.propTypes = {
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default CheckBoxField;
