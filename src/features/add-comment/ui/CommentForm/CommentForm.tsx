import { useAddCommentMutation } from '../../api/addCommentApi';
import type { CommentFormProps } from './types';
import { useForm } from '@/shared/lib/form';
import type { FormActions } from '@/shared/lib/form';
import { validateCommentForm } from '../../lib/validateCommentForm';
import type { CommentFormValues } from '../../model/types';
import { FormTextArea } from '@/shared/ui/FormTextArea';
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
                <FormTextArea
                    id="content"
                    name="content"
                    label="Write a comment"
                    value={values.content}
                    maxLength={500}
                    error={touched.content ? errors.content : undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                    textAreaClassName="comments-form__textarea"
                    required={true}
                />
                <div className="comments-form__footer">
                    <span className="comments-form__counter">{values.content.length}/500</span>

                    <button disabled={isLoading} className="comments-form__submit" type="submit">
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default CommentForm;
