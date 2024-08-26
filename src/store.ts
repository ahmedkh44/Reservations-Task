import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "./slices/reservations/reservationsSlice";
import { reservationApi } from "./slices/reservations/apiSlice";

export const store = configureStore ({
    reducer: {
        reservations: reservationsReducer,
        [reservationApi.reducerPath]: reservationApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(reservationApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch