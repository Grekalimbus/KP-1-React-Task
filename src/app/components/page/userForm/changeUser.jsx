import React from "react";
import ChangeUserForm from "../../ui/changeUserForm";
import PropTypes from "prop-types";

const ChangeUser = ({ user }) => {
    return <ChangeUserForm user={user} />;
};
ChangeUser.propTypes = {
    user: PropTypes.object
};
export default ChangeUser;
