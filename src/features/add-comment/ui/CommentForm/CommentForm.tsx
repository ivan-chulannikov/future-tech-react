import { useAddCommentMutation } from "../../api/addCommentApi"
import type { CommentFormProps } from "./types"
import { useState } from "react"
const CommentForm = ({postId}: CommentFormProps) => {
    const [addComment, {isLoading}] = useAddCommentMutation()
    const [text, setText] = useState<string>('')
    const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await(addComment({
            postId,
            content: text
        })).unwrap()
        setText('')
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <section className="comments-drawer__form-section" aria-label="Add comment">
        <form className="comments-form" onSubmit={(event) => void onSubmit(event)}>
            <label className="visibility-hidden" htmlFor="comment-text">
                Write a comment
            </label>

            <textarea
                className="comments-form__textarea"
                id="comment-text"
                name="comment"
                placeholder="Write a comment..."
                maxLength={500}
                value={text}
                onChange={(event) => setText(event.target.value)}
            />

            <div className="comments-form__footer">
                <span className="comments-form__counter">{text.length}/500</span>

                <button 
                disabled = {isLoading}
                className="comments-form__submit" 
                type="submit">
                    {
                        isLoading ? 'Sending...' : 'Send'
                    }
                </button>
            </div>
        </form>
    </section>
    )
}
export default CommentForm