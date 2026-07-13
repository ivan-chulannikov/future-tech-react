import CommentsCard from "../CommentCard/CommentCard"
import type { CommentsListProps } from "./types/types"
const CommentList = ({comments}: CommentsListProps) => {
    return (
        <section className="comments-drawer__list-section" aria-labelledby="comments-list-title">
        <h3 className="visibility-hidden" id="comments-list-title">
            Comments list
        </h3>
        <ul className="comments-list">
            {
                comments.map((comment) => {
                    return (
                         <li key={comment.id} className="comments-list__item">
                            <CommentsCard 
                            comment={comment}
                            />
                        </li>
                    )
                })
            }
        </ul>

    </section>
        
    )
}
export default CommentList