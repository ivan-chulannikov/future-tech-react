import { ReactNode } from "react";
export interface PostActionsProps {
    likes: string;
    shares: number;
    views: string;
    className?: string;
    children?: ReactNode;

}