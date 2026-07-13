import { describe, expect, it } from 'vitest';
import type { RegisterFormValues } from '@/features/auth/model';
import { validateRegisterField } from './validateFieldRegister';

const validRegisterValues: RegisterFormValues = {
    name: 'ivan',
    email: 'test@gmail.com',
    password: '123456',
    confirmPassword: '123456',
    agreement: true,
    description: 'test test test',
};

const validFieldCases: Array<{
    fieldName: keyof RegisterFormValues;
    value: string | boolean;
}> = [
    {
        fieldName: 'name',
        value: validRegisterValues.name,
    },
    {
        fieldName: 'email',
        value: validRegisterValues.email,
    },
    {
        fieldName: 'password',
        value: validRegisterValues.password,
    },
    {
        fieldName: 'confirmPassword',
        value: validRegisterValues.confirmPassword,
    },
    {
        fieldName: 'agreement',
        value: validRegisterValues.agreement,
    },
    {
        fieldName: 'description',
        value: validRegisterValues.description,
    },
];

describe('validateRegisterField', () => {
    it('returns error when name is empty', () => {
        expect(
            validateRegisterField('name', '', {
                ...validRegisterValues,
                name: '',
            }),
        ).toBe('Enter name');
    });

    it('returns error when email is invalid', () => {
        expect(
            validateRegisterField('email', 'test', {
                ...validRegisterValues,
                email: 'test',
            }),
        ).toBe('Invalid email');
    });

    it('returns error when email is empty', () => {
        expect(
            validateRegisterField('email', '', {
                ...validRegisterValues,
                email: '',
            }),
        ).toBe('Enter email');
    });

    it('returns error when password is invalid', () => {
        expect(
            validateRegisterField('password', '123', {
                ...validRegisterValues,
                password: '123',
            }),
        ).toBe('The password must be at least 6 characters long');
    });

    it('returns error when password is empty', () => {
        expect(
            validateRegisterField('password', '', {
                ...validRegisterValues,
                password: '',
            }),
        ).toBe('Enter password');
    });

    it('returns error when confirm password does not match password', () => {
        expect(
            validateRegisterField('confirmPassword', '123', {
                ...validRegisterValues,
                confirmPassword: '123',
            }),
        ).toBe('Passwords do not match');
    });

    it('returns error when confirm password is empty', () => {
        expect(
            validateRegisterField('confirmPassword', '', {
                ...validRegisterValues,
                confirmPassword: '',
            }),
        ).toBe('Confirm password');
    });

    it('returns error when description is invalid', () => {
        expect(
            validateRegisterField('description', 'test', {
                ...validRegisterValues,
                description: 'test',
            }),
        ).toBe('The description must be at least 6 characters long');
    });

    it('returns error when agreement is not selected', () => {
        expect(
            validateRegisterField('agreement', false, {
                ...validRegisterValues,
                agreement: false,
            }),
        ).toBe('You must accept the terms');
    });

    it.each(validFieldCases)(
        'returns empty string when $fieldName is valid',
        ({ fieldName, value }) => {
            expect(validateRegisterField(fieldName, value, validRegisterValues)).toBe('');
        },
    );
});
