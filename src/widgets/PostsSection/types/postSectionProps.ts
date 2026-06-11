import { Category } from "@/entities/categories/model/types";
import {  Post } from "@/entities/post/model/types";
import { SectionHeaderProps } from "@/shared/ui/SectionHeader/types/SectionHeaderTypes";

export interface PostSectionProps {
    posts: Post[];
    tabs: Category[];
    sectionHeader: SectionHeaderProps;
    
}