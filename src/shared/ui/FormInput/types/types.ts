import type { InputProps } from '@/shared/ui/Input/types/types';

export type FormInputProps = Omit<InputProps, 'className'> & {
    id: string;
    label: string;
    error?: string;
    fieldClassName?: string;
    inputClassName?: string;
};
