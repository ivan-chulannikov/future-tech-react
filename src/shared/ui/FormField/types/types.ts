import type { ReactNode } from 'react';

export type FormFieldProps = {
    id: string | undefined;
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
};
