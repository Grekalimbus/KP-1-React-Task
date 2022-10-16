import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/main">
                        <h1>Main</h1>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        <h1>Login</h1>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/users">
                        <h1>Users</h1>
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default NavBar;
