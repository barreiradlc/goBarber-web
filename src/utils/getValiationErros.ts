import { ValidationError } from "yup";

interface ErrorType{
    [key: string]: string;
}

export default function getValidationErros(err: ValidationError): ErrorType{
    const validationErrors: ErrorType = {};

    err.inner?.forEach(error => {
        validationErrors[error.path] = error.message;
    })

    return validationErrors
}