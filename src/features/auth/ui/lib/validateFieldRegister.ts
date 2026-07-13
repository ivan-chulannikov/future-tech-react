import type { RegisterFormValues } from '@/features/auth/model';

export const validateRegisterField = (
    name: keyof RegisterFormValues,
    value: string | boolean,
    values: RegisterFormValues,
): string => {
    if (name === 'name') {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return 'Enter name';
        }
    }

    if (name === 'email') {
        if (!value) {
            return 'Enter email';
        }

        if (typeof value === 'string' && !value.includes('@')) {
            return 'Invalid email';
        }
    }

    if (name === 'password') {
        if (!value) {
            return 'Enter password';
        }

        if (typeof value === 'string' && value.length < 6) {
            return 'The password must be at least 6 characters long';
        }
    }
    if (name === 'description') {
        if (typeof value === 'string' && value.length < 6) {
            return 'The description must be at least 6 characters long';
        }
    }

    if (name === 'confirmPassword') {
        if (typeof value !== 'string' || value.length === 0) {
            return 'Confirm password';
        }

        if (value !== values.password) {
            return 'Passwords do not match';
        }
    }

    if (name === 'agreement' && value !== true) {
        return 'You must accept the terms';
    }

    return '';
};
