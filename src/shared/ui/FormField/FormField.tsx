import type { FormFieldProps } from './types/types';

const FormField = ({
    id,
    label,
    error,
    required = false,
    className = '',
    children,
}: FormFieldProps) => {
    const errorId = `${id}-error`;

    return (
        <div className={`field ${error ? 'is-invalid' : ''} ${className}`.trim()}>
            {label && (
                <label className="field__label" htmlFor={id}>
                    {label}
                    {required && (
                        <>
                            {' '}
                            <span className="field__required-star" aria-hidden="true">
                                *
                            </span>
                        </>
                    )}
                </label>
            )}
            {children}
            {error && (
                <span id={errorId} className="feedback-form__error">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormField;
