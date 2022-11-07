import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const [errors, setErrors] = useState({});
    const [profession, setProffesion] = useState();
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            return setProffesion(data);
        });
        api.qualities.fetchAll().then((data) => {
            return setQualities(data);
        });
    }, []);
    const handleChange = (target) => {
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
        const isValid = validate();
        if (!isValid) return;
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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберете профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервиз без использования лицензионног соглашения"
            }
        }
    };
    return (
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
            <SelectField
                onChange={handleChange}
                options={profession}
                defaultOption="Chose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите вашу профессию"
                name="professions"
            />
            <RadioField
                options={[
                    { name: "Женский", value: "male" },
                    { name: "Мужской", value: "female" },
                    { name: "Другой", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
