export type ArticleType = 'news' | 'blog';
export type ImageInfo = {
    src: string;
    alt: string;
    width: number;
    height: number;
};
export type Author = {
    name: string;
    avatar: Avatar;
};
export type Avatar = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export type Stats = {
    likes: string;
    views: string;
    shares: number;
};

export type PostBase = {
    id: string;
    type: ArticleType;
    title: string;
    description: string;
    author: Author;
    categoryId: string;
    date: string;
    readingTime: string;
    stats: Stats;
};

export type PostPreview = PostBase;

export type PostDetails = PostBase & {
    bannerImage: ImageInfo;
    content: {
        introduction: string;
        sections: {
            title: string;
            paragraphs: string[];
        }[];
    };
};
