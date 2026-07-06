import { useParams } from 'react-router-dom';
import AboutSection from '@/widgets/AboutSection';
import BlogDetailSection from '@/widgets/BlogDetailSection';
import { StateView } from '@/shared/ui/StateView';
import { blogDetailsStateViewContent } from '../model/stateViewPresets';
import { useGetPostByIdQuery } from '@/entities/post/api/postApi';
const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: postResponse,
        isLoading: isPostLoadingQuery,
        isError: isPostErrorQuery,
        refetch: refetchPost,
    } = useGetPostByIdQuery(id ?? '', {
        skip: !id,
    });
    const post = postResponse ?? null;
    if (isPostLoadingQuery) {
        return <StateView size="page" {...blogDetailsStateViewContent.loading} />;
    }
    if (isPostErrorQuery || !post) {
        return (
            <StateView
                size="page"
                {...blogDetailsStateViewContent.error}
                action={
                    <button className="button button--accent" type="button" onClick={() => void refetchPost()}>
                        Try again
                    </button>
                }
            />
        );
    }
    return (
        <>
            <BlogDetailSection post={post} />
            <AboutSection />
        </>
    );
};
export default BlogDetails;
