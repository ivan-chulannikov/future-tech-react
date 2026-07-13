import type { TextAreaProps } from '@/shared/ui/TextArea';

export type FormTextAreaProps = Omit<TextAreaProps, 'className'> & {
    id: string;
    label: string;
    error?: string;
    fieldClassName?: string;
    textAreaClassName?: string;
};
