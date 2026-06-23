export const validateField = (name: string, value: string | boolean): string => {
    if (name === 'email') {
        if (!value) return 'Введите email';

        if (typeof value === 'string' && !value.includes('@')) {
            return 'Некорректный email';
        }
    }

    if (name === 'password') {
        if (!value) return 'Введите пароль';

        if (typeof value === 'string' && value.length < 6) {
            return 'Пароль должен быть минимум 6 символов';
        }
    }

    return '';
};
