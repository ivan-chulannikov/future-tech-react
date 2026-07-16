export type CreatePostParagraphConfig = {
    id: string;
    placeholder: string;
    required?: boolean;
};

export type CreatePostSectionConfig = {
    id: string;
    paragraphs: readonly CreatePostParagraphConfig[];
};

export type CreatePostSectionValues = {
    title: string;
    paragraphs: Record<string, string>;
};

export type CreatePostFormValues = {
    title: string;
    description: string;
    categoryId: string;
    bannerImage: File | null;
    bannerAlt: string;
    introduction: string;
    sections: Record<string, CreatePostSectionValues>;
};
