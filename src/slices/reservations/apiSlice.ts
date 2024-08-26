import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reservation } from "../../types/Reservation";

export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }), // Ensure this is your backend API
    endpoints: (builder) => ({
      getReservations: builder.query<Reservation[], void>({
        query: () => "reservations", // Ensure this points to a valid JSON endpoint
      }),
    }),
  });

export const { useGetReservationsQuery } = reservationApi;
