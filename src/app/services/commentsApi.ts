import type { Comment } from "../types"
import { api } from "./api"

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
    }),

    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi
