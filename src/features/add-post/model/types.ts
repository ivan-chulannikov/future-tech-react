export type CreatePostParagraphConfig = {
    id: string;
    placeholder: string;
    required?: boolean;
};

export type CreatePostSectionConfig = {
    id: string;
    paragraphs: readonly CreatePostParagraphConfig[];
};
