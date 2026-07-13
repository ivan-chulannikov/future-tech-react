import { useState } from 'react';
import {
    type FormTouched,
    type FormErrors,
    type FormValidator,
    type FormSubmitHandler,
} from './types';
export const useForm = <TValues extends object>(
    initialValues: TValues,
    validatorCallback: FormValidator<TValues>,
    onSubmit: FormSubmitHandler<TValues>,
) => {
    const [values, setValues] = useState<TValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors<TValues>>({});
    const [touched, setTouched] = useState<FormTouched<TValues>>({});
    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target;
        const name = target.name;

        const fieldValue =
            target instanceof HTMLInputElement && target.type === 'checkbox'
                ? target.checked
                : target.value;
        const nextValues = {
            ...values,
            [name]: fieldValue,
        };
        setValues(nextValues);
        const validationErrors = validatorCallback(nextValues);
        setErrors(validationErrors);
    };
    const onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = event.target;

        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
        const validationErrors = validatorCallback(values);
        setErrors(validationErrors);
    };
    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };
    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validatorCallback(values);
        setErrors(validationErrors);
        const keys = Object.keys(values) as Array<keyof TValues>;
        const allTouched = keys.reduce<FormTouched<TValues>>(
            (result, key) => ({
                ...result,
                [key]: true,
            }),
            {},
        );

        setTouched(allTouched);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        await onSubmit(values, { reset });
    };

    return {
        values,
        errors,
        touched,
        handleSubmit,
        onBlur,
        onChange,
        reset,
    };
};
