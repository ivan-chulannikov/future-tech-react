export const validateField = (name: string, value: string | boolean): string => {
    if (name === 'email') {
        if (!value) return 'Enter email';

        if (typeof value === 'string' && !value.includes('@')) {
            return 'Invalid email';
        }
    }

    if (name === 'password') {
        if (!value) return 'Введите пароль';

        if (typeof value === 'string' && value.length < 6) {
            return 'The password must be at least 6 characters long';
        }
    }

    return '';
};
