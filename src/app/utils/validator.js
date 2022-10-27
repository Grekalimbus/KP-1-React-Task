export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g; // проверка для текст@mail.domen
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g; // проверка на заглавную букву
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod, // isRequired
                data[fieldName], // email or password
                config[fieldName][validateMethod] // message
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
