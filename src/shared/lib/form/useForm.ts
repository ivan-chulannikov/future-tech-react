import { useState } from 'react';
import {
    type FormTouched,
    type FormErrors,
    type FormValidator,
    type FormSubmitHandler,
    type NestedObject,
} from './types';
export const useForm = <TValues extends object>(
    initialValues: TValues,
    validatorCallback: FormValidator<TValues>,
    onSubmit: FormSubmitHandler<TValues>,
) => {
    const [values, setValues] = useState<TValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors<TValues>>({});
    const [touched, setTouched] = useState<FormTouched<TValues>>({});
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const target = event.target;
        const name = target.name;
        let fieldValue: string | boolean | File | null;

        if (target instanceof HTMLInputElement && target.type === 'file') {
            fieldValue = target.files?.[0] ?? null;
        } else if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            fieldValue = target.checked;
        } else {
            fieldValue = target.value;
        }
        const path = name.split('.');
        const parentPath = path.slice(0, path.length - 1);
        const lastKey = path[path.length - 1];
        const nextValues = { ...values };
        if (path.length === 1) {
            const nextValuesObject = nextValues as NestedObject;
            nextValuesObject[name] = fieldValue;
        }
        if (path.length > 1) {
            let currentValues = values as NestedObject;
            let currentNextValues = nextValues as NestedObject;
            for (const key of parentPath) {
                const childValue = currentValues[key];

                if (typeof childValue !== 'object' || childValue === null) {
                    return;
                }

                const childObject = childValue as NestedObject;
                const childObjectCopy = { ...childObject };

                currentNextValues[key] = childObjectCopy;

                currentValues = childObject;
                currentNextValues = childObjectCopy;
            }

            currentNextValues[lastKey] = fieldValue;
        }

        setValues(nextValues);
        const validationErrors = validatorCallback(nextValues);
        setErrors(validationErrors);
    };
    const onBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
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
