import type { PostPreview } from '@/entities/post';

export type PostCommentsDrawerProps = {
    post: PostPreview | null;
    onClose: () => void;
    isOpen: boolean; 

};
