import type  { PostBase } from "@/entities/post/model/types"

export type DrawerProps = {
    post: PostBase;
    onClose: () => void
}