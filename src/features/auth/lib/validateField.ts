type LoginValidatedFieldName = 'email' | 'password';
export const validateField = (name: LoginValidatedFieldName, value: string): string => {
    if (name === 'email') {
        if (!value) return 'Enter email';

        if (typeof value === 'string' && !value.includes('@')) {
            return 'Invalid email';
        }
    }

    if (name === 'password') {
        if (!value) return 'Enter password';

        if (typeof value === 'string' && value.length < 6) {
            return 'The password must be at least 6 characters long';
        }
    }

    return '';
};
