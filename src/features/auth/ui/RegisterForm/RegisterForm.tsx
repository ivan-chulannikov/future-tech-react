import { useState } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import Button from '@/shared/ui/Button';
import { RegisterFormErrors, RegisterFormTouched, RegisterFormValues } from '../../model/types';
import { validateField } from '../helpers/validateField';
import { validateForm } from '../helpers/validateForm';
import { useRegisterMutation } from '../../api/authApi';

const RegisterForm = () => {
    const [values, setValues] = useState<RegisterFormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false,
    });

    const [register, { isLoading }] = useRegisterMutation();

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [touched, setTouched] = useState<RegisterFormTouched>({});

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(values);

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
            }).unwrap();

            console.log('register success:', response);
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
            const error = validateField(name, fieldValue);

            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = event.target;

        const fieldValue = type === 'checkbox' ? checked : value;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        const error = validateField(name, fieldValue, values);

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
        </form>
    );
};

export default RegisterForm;
