import { BASE_URL } from "@/constants"
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store";
// import type { RootState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
     const state = getState() as RootState;

    const token = state.user.token ?? localStorage.getItem("token");
      
    if(token) {
       
        headers.set('authorization', `Bearer ${token}`)
    }
     
    return headers;
  }
})

const baseQueryWithRetry  = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})
