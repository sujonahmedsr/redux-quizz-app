import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api` }),
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => `/quizzes`
        }),
        addQuiz: builder.mutation({
            query: (body) => ({
                url: `/quizzes`,
                method: "POST",
                body
            })
        }),
        updateQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: data
            })
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",
            }),
        }),
    })
})
export const {
    useGetAllQuizQuery,
    useAddQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation
} = quizApi