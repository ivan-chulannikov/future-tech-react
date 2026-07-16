import type { SelectProps } from '@/shared/ui/Select';

export type FormSelectProps = Omit<SelectProps, 'className' | 'id'> & {
    id: string;
    label: string;
    error?: string;
    fieldClassName?: string;
    selectClassName?: string;
};
