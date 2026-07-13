import type { PostPreview } from '@/entities/post';

export type PostCommentsDrawerProps = {
    post: PostPreview;
    onClose: () => void;
};
