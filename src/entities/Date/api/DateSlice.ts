import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../model/types";

const initialState: ApiResponse = {
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
  },
};

const DateDataSlice = createSlice({
  name: "dateData",
  initialState,
  reducers: {
    setDate: (_, action: PayloadAction<ApiResponse>) => {
      return action.payload;
    },
    addDate: (state, action: PayloadAction<ApiResponse>) => {
        return {
          items: [...state.items, ...action.payload.items], // Объединяем массивы
          pagination: action.payload.pagination, // Берем новую пагинацию
        };
      },
    clearDate: () => {
      return initialState;
    },
  },
});

export const { setDate, addDate, clearDate } = DateDataSlice.actions;
export default DateDataSlice.reducer;
