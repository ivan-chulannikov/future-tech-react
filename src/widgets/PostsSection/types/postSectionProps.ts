import { Category } from "@/entities/categories";
import {  Post } from "@/entities/post";
import { SectionHeaderProps } from "@/shared/ui/SectionHeader";

export interface PostSectionProps {
    posts: Post[];
    tabs: Category[];
    sectionHeader: SectionHeaderProps;
    activeCategoryId: string;
    onCategoryChange: (activeCategoryId: string) => void;
}