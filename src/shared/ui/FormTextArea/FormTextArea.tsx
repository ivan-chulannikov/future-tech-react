import { FormField } from '@/shared/ui/FormField';
import { TextArea } from '@/shared/ui/TextArea';

import type { FormTextAreaProps } from './types';

const FormTextArea = ({
    id,
    label,
    error,
    required = false,
    fieldClassName,
    textAreaClassName,
    ...textAreaProps
}: FormTextAreaProps) => {
    const errorId = `${id}-error`;

    return (
        <FormField
            id={id}
            label={label}
            error={error}
            required={required}
            className={fieldClassName}
        >
            <TextArea
                id={id}
                required={required}
                className={textAreaClassName}
                aria-describedby={errorId}
                {...textAreaProps}
            />
        </FormField>
    );
};

export default FormTextArea;
