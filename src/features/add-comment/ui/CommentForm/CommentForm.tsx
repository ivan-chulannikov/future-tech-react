import { useAddCommentMutation } from '../../api/addCommentApi';
import type { CommentFormProps } from './types';
import { useForm } from '@/shared/lib/form';
import type { FormActions } from '@/shared/lib/form';
import { validateCommentForm } from '../../lib/validateCommentForm';
import type { CommentFormValues } from '../../model/types';
import { FormField } from '@/shared/ui/FormField';
import { TextArea } from '@/shared/ui/TextArea';
const commentInitialValue = {
    content: '',
};
const CommentForm = ({ postId }: CommentFormProps) => {
    const [addComment, { isLoading }] = useAddCommentMutation();
    const commentSubmit = async (values: CommentFormValues, { reset }: FormActions) => {
        try {
            const content = values.content;
            await addComment({
                postId,
                content,
            }).unwrap();
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    const { values, errors, touched, onChange, onBlur, handleSubmit } = useForm(
        commentInitialValue,
        validateCommentForm,
        commentSubmit,
    );
    return (
        <section className="comments-drawer__form-section" aria-label="Add comment">
            <form
                className="comments-form"
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
            >
                <FormField
                    id="content"
                    label="Write a comment"
                    error={touched.content ? errors.content : undefined}
                    required
                >
                    <TextArea
                        id="content"
                        name="content"
                        value={values.content}
                        maxLength={500}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="comments-form__textarea"
                        required
                        aria-describedby={
                            touched.content && errors.content ? 'content-error' : undefined
                        }
                        aria-invalid={touched.content && errors.content ? true : undefined}
                    />
                </FormField>
                <div className="comments-form__footer">
                    <span className="comments-form__counter">{values.content.length}/500</span>

                    <button
                        disabled={isLoading}
                        className="comments-form__submit button button--accent"
                        type="submit"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default CommentForm;
