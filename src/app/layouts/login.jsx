import React from "react";

const Login = () => {
    return (
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email"></input>
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input type="password" id="password"></input>
            </div>
        </form>
    );
};

export default Login;
