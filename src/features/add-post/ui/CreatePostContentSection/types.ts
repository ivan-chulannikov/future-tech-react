import type { CreatePostSectionConfig } from '../../model/types';
import type { CreatePostFormValues } from '../../model/types';
import type { FormErrors, FormTouched } from '@/shared/lib/form';

export type CreatePostContentSectionProps = {
    section: CreatePostSectionConfig;
    position: number;
    values: CreatePostFormValues;
    errors: FormErrors<CreatePostFormValues>;
    touched: FormTouched<CreatePostFormValues>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
};
