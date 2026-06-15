import { Category } from "@/entities/categories";

import { PostBase } from "@/entities/post/model/types";
import { SectionHeaderProps } from "@/shared/ui/SectionHeader";

export interface PostSectionProps {
    posts: PostBase[];
    tabs: Category[];
    sectionHeader: SectionHeaderProps;
    activeCategoryId: string;
    handleCategoryChange: (activeCategoryId: string) => void;
}