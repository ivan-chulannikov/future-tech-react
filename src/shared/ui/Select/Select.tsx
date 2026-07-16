import type { SelectProps } from './types';

const Select = ({ className = '', options, placeholder, ...props }: SelectProps) => {
    return (
        <select className={`field__control ${className}`.trim()} {...props}>
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}

            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
