import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../Redux/features/quizSlice"
import { quizApi } from "./api/quizApi/quizApi";

export const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer,
        quiz: quizSlice
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(quizApi.middleware)
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch