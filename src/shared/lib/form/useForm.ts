import { useState } from 'react';
import {
    type FormTouched,
    type FormErrors,
    type FormValidator,
    type FormSubmitHandler,
    type NestedObject,
    type FormFieldPath,
} from './types';

const isNestedObject = (value: unknown): value is NestedObject =>
    typeof value === 'object' && value !== null;

const getFieldPaths = (values: NestedObject, parentPath = ''): string[] =>
    Object.entries(values).flatMap(([key, value]) => {
        const path = parentPath ? `${parentPath}.${key}` : key;

        if (!isNestedObject(value) || Object.keys(value).length === 0) {
            return [path];
        }

        return getFieldPaths(value, path);
    });

export const useForm = <TValues extends object>(
    initialValues: TValues,
    validatorCallback: FormValidator<TValues>,
    onSubmit?: FormSubmitHandler<TValues>,
) => {
    const [values, setValues] = useState<TValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors<TValues>>({});
    const [touched, setTouched] = useState<FormTouched<TValues>>({});
    const setFieldTouched = (fieldPath: FormFieldPath<TValues>) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [fieldPath]: true,
        }));
    };
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const target = event.target;
        const name = target.name;

        if (!name) {
            return;
        }

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
            const valuesObject = values as NestedObject;

            if (!(name in valuesObject)) {
                return;
            }

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

            if (!(lastKey in currentValues)) {
                return;
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

        setFieldTouched(name as FormFieldPath<TValues>);
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
        const allTouched = getFieldPaths(initialValues as NestedObject).reduce<
            FormTouched<TValues>
        >(
            (result, fieldPath) => ({
                ...result,
                [fieldPath as FormFieldPath<TValues>]: true,
            }),
            {},
        );

        setTouched(allTouched);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        await onSubmit?.(values, { reset });
    };

    return {
        values,
        errors,
        touched,
        handleSubmit,
        onBlur,
        onChange,
        setFieldTouched,
        reset,
    };
};
