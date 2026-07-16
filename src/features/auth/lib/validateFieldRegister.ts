import type { RegisterFormValues } from '@/features/auth/model';
const allowedAvatarTypes = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
export const validateRegisterField = (
    name: keyof RegisterFormValues,
    value: string | boolean | File | null,
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
        if (typeof value === 'string' && value.length < 6 && value.length > 0) {
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
    if (name === 'userAvatar') {
        if (!(value instanceof File)) {
            return 'Choose your avatar';
        }

        if (!allowedAvatarTypes.includes(value.type)) {
            return 'Choose a JPEG, PNG, or WebP image';
        }

        if (value.size > MAX_AVATAR_SIZE) {
            return 'The image must not exceed 5 MB';
        }
    }

    return '';
};
