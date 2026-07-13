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
    likes: number;
    views: number;
    shares: number;
    comments: number;
};

export interface PostBase {
    id: string;
    type: ArticleType;
    title: string;
    description: string;
    author: Author;
    categoryId: string;
    date: string;
    readingTime: string;
    stats: Stats;
}

export interface PostPreview extends PostBase {
    isSaved: boolean;
    isLiked: boolean;
}

export interface PostDetails extends PostBase {
    bannerImage: ImageInfo;
    content: {
        introduction: string;
        sections: {
            title: string;
            paragraphs: string[];
        }[];
    };
}
