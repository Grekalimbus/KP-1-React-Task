import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "./textField";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        // 2 строки ниже закоментированы пока что, т.к с ними код не работает из-за линтера, но в уроке код был таким.
        // const isValid = validate();
        // if (!isValid) return;
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email Введен не коректно"
            }
        },
        password: {
            isRequired: { message: "Пороль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "пароль должен содержать минимум 1 заглавную букву"
            },
            isContainDigit: {
                message: "пароль должен содержать минимум 1 цифру"
            },
            min: {
                message: "пароль должен состоять минимум из 8 цифр",
                value: 8
            }
        }
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Электронная почта"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            type="password"
                            id="password"
                            name="password"
                            label="Пароль"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
