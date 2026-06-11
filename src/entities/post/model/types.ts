import { Category } from "@/entities/categories";

export type ArticleType = "news" | "blog";
export type Author = {
    name: string;
    image: string;
}

export type Stats = {
  likes: string;
  views: string;
  shares: number;
};
export interface Post {
    id: string;
    type: ArticleType;
    title: string;
    description: string;
    author: Author;
    categoryId: string;
    date: string;
    readingTime: string;
    stats: Stats;
    image: string

}