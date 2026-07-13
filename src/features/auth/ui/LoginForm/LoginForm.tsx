import { FormInput } from '@/shared/ui/FormInput';
import Button from '@/shared/ui/Button';
import { validateForm } from '../../lib/validateForm';
import { useLoginMutation } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../model/authSlice';
import { useAppDispatch } from '@/app/store/hooks';
import { AppRoutes } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/errors';
import { baseApi } from '@/shared/api/baseApi';
import { useForm } from '@/shared/lib/form';
import type { LoginFormValues } from '../../model';
const loginInitialValues = {
    email: '',
    password: '',
    rememberMe: false,
};
const LoginForm = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [login, { isLoading, error, isError }] = useLoginMutation();
    const submitLogin = async (values: LoginFormValues) => {
        try {
            const response = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            const { user, accessToken } = response;

            dispatch(setCredentials({ user, accessToken }));
            dispatch(baseApi.util.invalidateTags(['Posts', 'SavedPosts']));
            void navigate(AppRoutes.home);
        } catch (error) {
            console.error('login error:', error);
        }
    };
    const errorMessage = isError ? getErrorMessage(error) : '';
    const { values, errors, touched, handleSubmit, onBlur, onChange } = useForm(
        loginInitialValues,
        validateForm,
        submitLogin,
    );

    return (
        <form className="auth__form" onSubmit={(event) => void handleSubmit(event)}>
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
                autoComplete="current-password"
                value={values.password}
                onChange={onChange}
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
            <Button type="submit" className="button--accent auth__submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign in'}
            </Button>
            {errorMessage && (
                <p className="feedback-form__error feedback-form__error--submit">{errorMessage}</p>
            )}
        </form>
    );
};

export default LoginForm;
