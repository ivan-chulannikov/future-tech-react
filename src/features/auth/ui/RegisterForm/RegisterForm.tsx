import { useNavigate } from 'react-router-dom';
import { FormInput } from '@/shared/ui/FormInput';
import Button from '@/shared/ui/Button';
import { AppRoutes } from '@/shared/config/routes';

import { useRegisterMutation } from '../../api/authApi';
import { validateRegisterForm } from '../lib/validateRegisterForm';
import { getErrorMessage } from '@/shared/lib/errors';
import { useForm } from '@/shared/lib/form';
import type { RegisterFormValues } from '../../model';
const registerInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
    description: '',
};
const RegisterForm = () => {
    const navigate = useNavigate();
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const errorMessage = isError ? getErrorMessage(error) : '';

    const submitRegister = async (values: RegisterFormValues) => {
        try {
            await register({
                email: values.email,
                username: values.name,
                password: values.password,
                description: values.description,
            }).unwrap();
            void navigate(AppRoutes.login);
        } catch (error) {
            console.error('register error:', error);
        }
    };
    const { values, errors, touched, onChange, onBlur, handleSubmit } = useForm(
        registerInitialValues,
        validateRegisterForm,
        submitRegister,
    );

    return (
        <form className="auth__form" onSubmit={(event) => void handleSubmit(event)}>
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
                value={values.description}
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
            <Button type="submit" className="button--accent auth__submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign up'}
            </Button>
            {errorMessage && (
                <p className="feedback-form__error feedback-form__error--submit">{errorMessage}</p>
            )}
        </form>
    );
};

export default RegisterForm;
