import { isCategoryArray } from "../model/guard";
import { Category } from "../model/types";
import { baseApi } from "@/shared/api/baseApi";

 export const categoryApiRtk = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<Category[], void>({
            query: () => 'categories',
            transformResponse: (response: unknown) => {
                if(!isCategoryArray(response)) {
                    throw new Error('invalid categories response')
                }
                return response
            }
        }),
    })
})
export const {
    useGetCategoriesQuery,
} = categoryApiRtk