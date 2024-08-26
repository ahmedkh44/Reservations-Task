import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  status?: string;
  date?: string;
  shift?: string;
  area?: string;
  sortBy?: "name" | "quantity"  | "all";
}

const initialState: FilterState = {};
const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FilterState>>) {
      return { ...state, ...action.payload };
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const { setFilter, resetFilter} = reservationsSlice.actions
export default reservationsSlice.reducer
