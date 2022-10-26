import { React, useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.name);
    };
    return (
        <form>
            <TextField
                id="email"
                name="email"
                label="Электронная почта"
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                type="password"
                id="password"
                name="password"
                label="Пароль"
                value={data.password}
                onChange={handleChange}
            />
        </form>
    );
};

export default Login;
