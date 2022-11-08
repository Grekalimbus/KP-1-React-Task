import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ChangeUserForm = ({ user }) => {
    const history = useHistory();
    const qualitiesUser = [];
    user.qualities.forEach((user) => {
        qualitiesUser.push({ label: user.name, value: user._id });
    });
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession.name,
        sex: "male",
        qualities: qualitiesUser
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
    useEffect(() => {
        validate();
    }, [data]);
    // метод, который перенаправляет пользователя по данному url
    const handleBackPage = () => {
        changeDataUser();
        history.replace(`/users/${user._id}`);
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // метод, который создает новый объект с юзером, и меняет данные в localStorage, где хранятся объекты юзеров
    const changeDataUser = () => {
        const dataUser = { ...user };
        dataUser.name = data.name;
        dataUser.profession.name = data.profession;
        dataUser.qualities = [];
        data.qualities.forEach((qulitie) => {
            dataUser.qualities.push({
                name: qulitie.label,
                _id: qulitie.value
            });
        });
        dataUser.email = data.email;
        dataUser.qualities.forEach((qulitie) => {
            Object.keys(qualities).forEach((q) => {
                if (qulitie._id === qualities[q]._id) {
                    qulitie.color = qualities[q].color;
                }
            });
        });
        const allUsers = JSON.parse(localStorage.getItem("users"));
        const indexUser = allUsers.findIndex((u) => {
            return u._id === user._id;
        });
        allUsers[indexUser] = dataUser;
        localStorage.setItem("users", JSON.stringify(allUsers));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
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
                            name="profession"
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
                            onClick={() => {
                                handleBackPage();
                            }}
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

ChangeUserForm.propTypes = {
    user: PropTypes.object
};

export default ChangeUserForm;
