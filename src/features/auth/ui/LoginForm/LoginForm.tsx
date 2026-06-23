import { FormInput } from '@/shared/ui/FormInput';
import Button from '@/shared/ui/Button';
import { LoginFormErrors, LoginFormTouched, LoginFormValues } from '../../model/types';
import { useState } from 'react';
import { validateField } from '../helpers/validateField';
import { validateForm } from '../helpers/validateForm';
import { useLoginMutation } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../model/authSlice';
import { useAppDispatch } from '@/app/store/hooks';
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [values, setValues] = useState<LoginFormValues>({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [login, { isLoading, error }] = useLoginMutation();
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [touched, setTouched] = useState<LoginFormTouched>({});
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(values);

        setErrors(validationErrors);
        setTouched({
            email: true,
            password: true,
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await login({
                email: values.email,
                password: values.password,
            }).unwrap();
            console.log(response);
            navigate('/');
            const { user, accessToken } = response;
            dispatch(setCredentials({ user, accessToken }));
        } catch (error) {
            console.log('login error:', error);
        }
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = event.target;

        const fieldValue = type === 'checkbox' ? checked : value;

        setValues((prev) => ({
            ...prev,
            [name]: fieldValue,
        }));

        if (touched[name as keyof LoginFormTouched]) {
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

        const error = validateField(name, fieldValue);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    return (
        <form className="auth__form" onSubmit={onSubmit}>
            <FormInput
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => onChange(event)}
                onBlur={onBlur}
                error={touched.email ? errors.email : undefined}
            />

            <FormInput
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={values.password}
                onChange={(event) => onChange(event)}
                error={touched.password ? errors.password : undefined}
                onBlur={onBlur}
            />

            <div className="auth__form-extra">
                <label className="checkbox">
                    <input
                        className="checkbox__input"
                        type="checkbox"
                        name="rememberMe"
                        onChange={onChange}
                        onBlur={onBlur}
                        checked={values.rememberMe}
                    />
                    <span>Remember me</span>
                </label>
                <a className="auth__link" href="/">
                    Forgot password?
                </a>
            </div>
            <Button type="submit" className="button--accent auth__submit">
                Sign In
            </Button>
        </form>
    );
};

export default LoginForm;
