import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../model/types";

const initialState: ApiResponse = {
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 25,
    totalPages: 1,
  },
};

const HeroDataSlice = createSlice({
  name: "heroData",
  initialState,
  reducers: {
    setHeroes: (_, action: PayloadAction<ApiResponse>) => {
      return action.payload;
    },
    addHeroes: (state, action: PayloadAction<ApiResponse>) => {
            return {
              items: [...state.items, ...action.payload.items], // Объединяем массивы
              pagination: action.payload.pagination, // Берем новую пагинацию
            };
          },
    clearHeroes: () => {
      return initialState;
    },
  },
});

export const { setHeroes, addHeroes, clearHeroes } = HeroDataSlice.actions;
export default HeroDataSlice.reducer;
