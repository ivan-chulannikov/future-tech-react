import { FormField } from '@/shared/ui/FormField';
import { Select } from '@/shared/ui/Select';

import type { FormSelectProps } from './types';

const FormSelect = ({
    id,
    label,
    error,
    required = false,
    fieldClassName,
    selectClassName,
    ...selectProps
}: FormSelectProps) => {
    const errorId = `${id}-error`;

    return (
        <FormField
            id={id}
            label={label}
            error={error}
            required={required}
            className={fieldClassName}
        >
            <Select
                id={id}
                required={required}
                className={selectClassName}
                aria-describedby={error ? errorId : undefined}
                aria-invalid={error ? true : undefined}
                {...selectProps}
            />
        </FormField>
    );
};

export default FormSelect;
