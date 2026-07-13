import type { PostBase } from "@/entities/post";
export type PostCommentsDrawerHeaderProps = {
    onClose: () => void;
    post: PostBase
}