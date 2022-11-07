import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const ChangeUserForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
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
        name: {
            isRequired: {
                message: "Имя пользователя не введено"
            },
            isSurname: {
                message: "Введите фамилию"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email Введен не коректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберете профессию"
            }
        }
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            label="Имя Фамилия"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Электронная почта"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
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

export default ChangeUserForm;
