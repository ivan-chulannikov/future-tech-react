import type { LoginFormErrors, LoginFormValues } from '@/features/auth/model/types';
import { validateField } from './validateField';
export const validateForm = (values: LoginFormValues): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    const emailError = validateField('email', values.email);
    const passwordError = validateField('password', values.password);

    if (emailError) {
        errors.email = emailError;
    }

    if (passwordError) {
        errors.password = passwordError;
    }

    return errors;
};
