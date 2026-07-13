import { CommentList } from "@/entities/comment"
import  PostCommentsDrawerHeader from "../PostCommentsDrawerHeader/PostCommentsDrawerHeader"
import {Drawer} from "@/shared/ui/Drawer"
import { CommentForm } from "@/features/add-comment"
import type { PostCommentsDrawerProps } from "./types"
import { useGetPostCommentsQuery } from "@/entities/comment"
import { Button } from '@/shared/ui/Button';
import { StateView } from '@/shared/ui/StateView';
import { commentsStateViewContent } from "./model/stateViewPresets"
const PostCommentsDrawer = ({post, onClose}: PostCommentsDrawerProps) => {
    const postId = post.id
    const {
        data: commentsPostResponse,
        isLoading,
        isError,
        refetch,

    } = useGetPostCommentsQuery(postId)
    const comments = commentsPostResponse?.data ?? []
    return (
        <aside
    className="comments-drawer"
    aria-labelledby="comments-drawer-title"
> 
       <Drawer>
         <PostCommentsDrawerHeader post = {post} onClose={onClose}  />
        <div className="comments-drawer__summary">
            <span className="comments-drawer__summary-icon" aria-hidden="true">
                💬
            </span>
            <span>{post.stats.comments} comments</span>
        </div>
        <CommentForm postId = {postId} />
        {isLoading && (
            <StateView
                size="section"
                className="comments-drawer__state"
                {...commentsStateViewContent.loading}
            />
        )}
        {!isLoading && isError && (
            <StateView
                size="section"
                className="comments-drawer__state"
                {...commentsStateViewContent.error}
                action={
                    <Button
                        type="button"
                        onClick={() => void refetch()}
                    >
                        Try Again
                    </Button>
                }
            />
        )}
                    {!isLoading && !isError && comments.length === 0 && (
                <StateView
                    size="section"
                    className="comments-drawer__state"
                    {...commentsStateViewContent.empty}
                />
                        )}
                    {!isLoading && !isError && comments.length > 0 && (
                <CommentList comments={comments} />
            )}
       </Drawer>
    </aside>
    )
}
export default PostCommentsDrawer 