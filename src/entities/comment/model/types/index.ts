export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: AuthorTest;
}
type AuthorTest = {
    id: string;
    username: string;
};
