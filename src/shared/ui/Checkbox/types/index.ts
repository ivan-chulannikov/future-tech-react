import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    id: string;
    label: ReactNode;
    className?: string;
    inputClassName?: string;
};
