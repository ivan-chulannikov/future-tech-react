import { apiClient } from "@/shared/api/client";
import { Category } from "../model/types";
import { isCategoryArray } from "../model/guard";

export const fetchCategories = async(): Promise<Category[]> => {
    return apiClient("categories", isCategoryArray)
}
