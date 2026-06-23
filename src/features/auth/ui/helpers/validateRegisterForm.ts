import type { RegisterFormErrors, RegisterFormValues } from '@/features/auth/model/types';

export const validateRegisterField = (
    name: keyof RegisterFormValues,
    value: string | boolean,
    values: RegisterFormValues,
): string => {
    if (name === 'name') {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return 'Введите имя';
        }
    }

    if (name === 'email') {
        if (!value) {
            return 'Введите email';
        }

        if (typeof value === 'string' && !value.includes('@')) {
            return 'Некорректный email';
        }
    }

    if (name === 'password') {
        if (!value) {
            return 'Введите пароль';
        }

        if (typeof value === 'string' && value.length < 6) {
            return 'Пароль должен быть минимум 6 символов';
        }
    }

    if (name === 'confirmPassword') {
        if (typeof value !== 'string' || value.length === 0) {
            return 'Подтвердите пароль';
        }

        if (value !== values.password) {
            return 'Пароли не совпадают';
        }
    }

    if (name === 'agreement' && value !== true) {
        return 'Необходимо принять условия';
    }

    return '';
};

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    const fields: (keyof RegisterFormValues)[] = [
        'name',
        'email',
        'password',
        'confirmPassword',
        'agreement',
    ];

    fields.forEach((field) => {
        const error = validateRegisterField(field, values[field], values);

        if (error) {
            errors[field] = error;
        }
    });

    return errors;
};
