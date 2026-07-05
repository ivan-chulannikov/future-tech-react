import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '@/shared/ui/FormInput';
import Button from '@/shared/ui/Button';
import { AppRoutes } from '@/shared/config/routes';
import { RegisterFormErrors, RegisterFormTouched, RegisterFormValues } from '../../model/types';
import { useRegisterMutation } from '../../api/authApi';
import {validateRegisterForm } from '../lib/validateRegisterForm';
import { getErrorMessage } from '@/shared/lib/errors';
import { validateRegisterField } from '../lib/validateFieldRegister';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState<RegisterFormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false,
        description: '',
    });

    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const errorMessage = isError ? getErrorMessage(error) : '';
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [touched, setTouched] = useState<RegisterFormTouched>({});

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateRegisterForm(values);
        setErrors(validationErrors);
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            agreement: true,
        });
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        try {
            const response = await register({
                email: values.email,
                username: values.name,
                password: values.password,
                description: values.description,
            }).unwrap();
            console.log(response);
            navigate(AppRoutes.login);
        } catch (error) {
            console.log('register error:', error);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = event.target;

        const fieldValue = type === 'checkbox' ? checked : value;

        setValues((prev) => ({
            ...prev,
            [name]: fieldValue,
        }));

        if (touched[name as keyof RegisterFormTouched]) {
            const nextValues = {
                ...values,
                [name]: fieldValue,
            } as RegisterFormValues;

            const error = validateRegisterField(
                name as keyof RegisterFormValues,
                fieldValue,
                nextValues,
            );

            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));

            if ((name === 'password' || name === 'confirmPassword') && touched.confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: validateRegisterField(
                        'confirmPassword',
                        nextValues.confirmPassword,
                        nextValues,
                    ),
                }));
            }
        }
    };

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = event.target;

        const fieldValue = type === 'checkbox' ? checked : value;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        const error = validateRegisterField(name as keyof RegisterFormValues, fieldValue, values);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    return (
        <form className="auth__form" onSubmit={onSubmit}>
            <FormInput
                id="name"
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="username"
                value={values.name}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.name ? errors.name : undefined}
            />
            <FormInput
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.email ? errors.email : undefined}
            />
            <FormInput
                id="description"
                label="Description"
                name="description"
                type="text"
                placeholder="Enter your description"
                value={values?.description}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.description ? errors.description : undefined}
            />
            <FormInput
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                value={values.password}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.password ? errors.password : undefined}
            />
            <FormInput
                id="confirmPassword"
                label="Confirm password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
            <div className="auth__form-extra">
                <label className="checkbox">
                    <input
                        className="checkbox__input"
                        type="checkbox"
                        name="agreement"
                        onChange={onChange}
                        onBlur={onBlur}
                        checked={values.agreement}
                    />
                    <span>Agreement with terms</span>
                </label>
                {touched.agreement && errors.agreement && (
                    <p className="field__error">{errors.agreement}</p>
                )}
            </div>
            <Button type="submit" className="button--accent auth__submit">
                {isLoading ? 'Loading...' : 'Sign up'}
            </Button>
            {errorMessage && (
                <p className="feedback-form__error feedback-form__error--submit">{errorMessage}</p>
            )}
        </form>
    );
};

export default RegisterForm;
