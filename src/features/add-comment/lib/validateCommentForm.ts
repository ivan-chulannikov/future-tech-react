import type { CommentFormValues } from '../model/types';
import type { FormErrors } from '@/shared/lib/form';
export const validateCommentForm = (values: CommentFormValues) => {
    const errors: FormErrors<CommentFormValues> = {};
    const content = values.content.trim();

    if (!content) {
        errors.content = 'Enter comment';
    } else if (content.length > 500) {
        errors.content = 'Comment length must be no more than 500 characters';
    }

    return errors;
};
