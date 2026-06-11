import { apiClient } from "@/shared/api/client";
import { isPostArray } from "../model/guard";
import { Post } from "../model/types";

export const  fetchPosts = async ():Promise<Post[]> => {
    return apiClient<Post[]>("posts", isPostArray)
}