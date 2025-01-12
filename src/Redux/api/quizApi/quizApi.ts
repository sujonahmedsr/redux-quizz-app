import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:5000/api`}),
    endpoints: (builder) => ({
        
    })
})
export default quizApi