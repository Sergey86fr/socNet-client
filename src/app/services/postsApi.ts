import type { Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, FormData>({
            query: (formData) => ({
              url: '/posts',
              method:'POST',
              body: formData
            }),
        }),

        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: '/posts',
                method: 'GET',
            })
        }),

        getPostById: builder.query<Post, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            })
        }),

        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery
} = postApi;

export const {
  endpoints: {
    createPost, deletePost, getAllPosts,getPostById
  }
} = postApi;