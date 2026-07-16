import type { CheckboxProps } from './types';

const Checkbox = ({
    id,
    label,
    required = false,
    className = '',
    inputClassName = '',
    ...inputProps
}: CheckboxProps) => {
    return (
        <label className={`checkbox ${className}`.trim()} htmlFor={id}>
            <input
                id={id}
                className={`checkbox__input ${inputClassName}`.trim()}
                type="checkbox"
                required={required}
                {...inputProps}
            />
            <span>
                {label}
                {required && (
                    <>
                        {' '}
                        <span className="field__required-star" aria-hidden="true">
                            *
                        </span>
                    </>
                )}
            </span>
        </label>
    );
};

export default Checkbox;
