import { useNavigate } from 'react-router-dom';
import Button from '@/shared/ui/Button';
import { AppRoutes } from '@/shared/config/routes';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';

import { useRegisterMutation } from '../../api/authApi';
import { validateRegisterForm } from '../../lib/validateRegisterForm';
import { getErrorMessage } from '@/shared/lib/errors';

import { useForm } from '@/shared/lib/form';
import type { RegisterFormValues } from '../../model';
import { useEffect, useState } from 'react';
const registerInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
    description: '',
    userAvatar: null,
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const [preview, setPreview] = useState<string | null>(null);
    const errorMessage = isError ? getErrorMessage(error) : '';

    const submitRegister = async (values: RegisterFormValues) => {
        try {
            if (!(values.userAvatar instanceof File)) {
                return;
            }
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('username', values.name);
            formData.append('password', values.password);
            formData.append('description', values.description);
            formData.append('avatar', values.userAvatar);
            await register(formData).unwrap();
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

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);

        const avatar = event.target.files?.[0];
        setPreview(avatar ? URL.createObjectURL(avatar) : null);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);
    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <div className="auth__preview">
                        <span className="auth__badge">FutureTech account</span>

                        <div className="auth__preview-body">
                            <h1 className="auth__title">Create your account</h1>

                            <p className="auth__description">
                                Join the community, save articles and participate in discussions.
                            </p>
                        </div>

                        <ul className="auth__features">
                            <li className="auth__feature">Save useful publications</li>
                            <li className="auth__feature">Leave comments</li>
                            <li className="auth__feature">Create your personal profile</li>
                        </ul>
                    </div>

                    <div className="auth__card">
                        <header className="auth__card-header">
                            <span className="auth__eyebrow">Sign up</span>

                            <h2 className="auth__card-title">Create account</h2>

                            <p className="auth__card-description">Enter your details to continue</p>
                        </header>

                        <form className="auth__form" onSubmit={(event) => void handleSubmit(event)}>
                            <FormField
                                id="name"
                                label="Name"
                                required
                                error={touched.name ? errors.name : undefined}
                            >
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    autoComplete="username"
                                    value={values.name}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.name && errors.name ? 'name-error' : undefined
                                    }
                                    aria-invalid={touched.name && errors.name ? true : undefined}
                                />
                            </FormField>

                            <FormField
                                id="email"
                                label="Email"
                                required
                                error={touched.email ? errors.email : undefined}
                            >
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    value={values.email}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.email && errors.email ? 'email-error' : undefined
                                    }
                                    aria-invalid={touched.email && errors.email ? true : undefined}
                                />
                            </FormField>

                            <div className="avatar-upload">
                                <input
                                    className="avatar-upload__input"
                                    type="file"
                                    name="userAvatar"
                                    id="userAvatar"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleAvatarChange}
                                    onBlur={onBlur}
                                    required={true}
                                />

                                <label className="avatar-upload__label" htmlFor="userAvatar">
                                    <span className="avatar-upload__preview">
                                        {preview ? (
                                            <img
                                                className="avatar-upload__image"
                                                src={preview}
                                                alt="Avatar preview"
                                            />
                                        ) : (
                                            <span
                                                className="avatar-upload__placeholder"
                                                aria-hidden="true"
                                            >
                                                👤
                                            </span>
                                        )}
                                    </span>

                                    <span className="avatar-upload__content">
                                        <span className="avatar-upload__title">
                                            {preview ? 'Change avatar' : 'Choose avatar'}
                                        </span>

                                        <span className="avatar-upload__description">
                                            JPEG, PNG or WebP. Maximum 5 MB
                                        </span>
                                    </span>
                                </label>

                                {touched.userAvatar && errors.userAvatar && (
                                    <p className="field__error">{errors.userAvatar}</p>
                                )}
                            </div>
                            <FormField
                                id="description"
                                label="Description"
                                error={touched.description ? errors.description : undefined}
                            >
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Enter your description"
                                    value={values.description}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    aria-describedby={
                                        touched.description && errors.description
                                            ? 'description-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.description && errors.description ? true : undefined
                                    }
                                />
                            </FormField>

                            <FormField
                                id="password"
                                label="Password"
                                required
                                error={touched.password ? errors.password : undefined}
                            >
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    value={values.password}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.password && errors.password
                                            ? 'password-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.password && errors.password ? true : undefined
                                    }
                                />
                            </FormField>

                            <FormField
                                id="confirmPassword"
                                label="Confirm password"
                                required
                                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                            >
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    value={values.confirmPassword}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.confirmPassword && errors.confirmPassword
                                            ? 'confirmPassword-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.confirmPassword && errors.confirmPassword
                                            ? true
                                            : undefined
                                    }
                                />
                            </FormField>
                            <FormField
                                id="agreement"
                                error={touched.agreement ? errors.agreement : undefined}
                            >
                                <Checkbox
                                    id="agreement"
                                    label="Agreement with terms"
                                    name="agreement"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    checked={values.agreement}
                                    required
                                    aria-describedby={
                                        touched.agreement && errors.agreement
                                            ? 'agreement-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.agreement && errors.agreement ? true : undefined
                                    }
                                />
                            </FormField>
                            <Button
                                type="submit"
                                className="button--accent auth__submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Sign up'}
                            </Button>
                            {errorMessage && (
                                <p className="feedback-form__error feedback-form__error--submit">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
