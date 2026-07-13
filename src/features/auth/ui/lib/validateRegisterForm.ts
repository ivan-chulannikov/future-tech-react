import type { RegisterFormErrors, RegisterFormValues } from '@/features/auth/model/types';
import { validateRegisterField } from './validateFieldRegister';

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    const fields: (keyof RegisterFormValues)[] = [
        'name',
        'email',
        'password',
        'confirmPassword',
        'agreement',
        'description',
    ];

    fields.forEach((field) => {
        const error = validateRegisterField(field, values[field], values);

        if (error) {
            errors[field] = error;
        }
    });

    return errors;
};
