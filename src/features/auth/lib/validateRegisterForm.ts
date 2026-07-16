import type { RegisterFormValues } from '@/features/auth/model/types';
import { validateRegisterField } from './validateFieldRegister';
import type { FormErrors } from '@/shared/lib/form';

export const validateRegisterForm = (
    values: RegisterFormValues,
): FormErrors<RegisterFormValues> => {
    const errors: FormErrors<RegisterFormValues> = {};

    const fields: (keyof RegisterFormValues)[] = [
        'name',
        'email',
        'password',
        'confirmPassword',
        'agreement',
        'description',
        'userAvatar',
    ];
    fields.forEach((field) => {
        const error = validateRegisterField(field, values[field], values);

        if (error) {
            errors[field] = error;
        }
    });

    return errors;
};
