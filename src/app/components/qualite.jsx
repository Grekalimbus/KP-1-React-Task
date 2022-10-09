import React from "react";
import PropTypes from "prop-types";
// props является объектом {qualit: array}
// В array будет массив из 3 объектов. чтобы обратится конкретно к массиву (где 3 объекта), нужно указать ключ - это qualit
const Qualite = ({ property }) => {
    //   console.log(props.qualit); //  [{…}, {…}, {…}]
    return (
        <>
            {property.map((qualite, index) => {
                return (
                    <span
                        key={index}
                        className={`badge bg-${qualite.color} m-1`}
                    >{`${qualite.name} `}</span>
                );
            })}
        </>
    );
};
Qualite.propTypes = {
    property: PropTypes.array.isRequired
};
export default Qualite;
