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
    isSaved: boolean;
};


export type PostPreview = PostBase;

export interface PostDetails extends PostBase  {
    bannerImage: ImageInfo;
    content: {
        introduction: string;
        sections: {
            title: string;
            paragraphs: string[];
        }[];
    };
};
