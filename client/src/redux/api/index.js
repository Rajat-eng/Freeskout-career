import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://freeskout-career.onrender.com/api/v1",
  }),
  endpoints: () => ({}),
});
