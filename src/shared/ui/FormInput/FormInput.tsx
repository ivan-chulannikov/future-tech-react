import { FormField } from '@/shared/ui/FormField';
import Input from '@/shared/ui/Input/Input';

import type { FormInputProps } from './types/types';

const FormInput = ({
    id,
    label,
    error,
    required = false,
    fieldClassName,
    inputClassName,
    ...inputProps
}: FormInputProps) => {
    const errorId = `${id}-error`;

    return (
        <FormField
            id={id}
            label={label}
            error={error}
            required={required}
            className={fieldClassName}
        >
            <Input
                id={id}
                required={required}
                className={inputClassName}
                aria-describedby={errorId}
                {...inputProps}
            />
        </FormField>
    );
};

export default FormInput;
