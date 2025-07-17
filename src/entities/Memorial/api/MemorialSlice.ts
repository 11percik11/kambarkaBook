import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemorialResponseApi } from "../model/types";

const initialState: MemorialResponseApi = {
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 25,
    totalPages: 1,
  },
};

const MemorialDataSlice = createSlice({
  name: "memorialApi",
  initialState,
  reducers: {
    setMemorial: (_, action: PayloadAction<any>) => {
      return action.payload;
    },
    addMemorial: (state, action: PayloadAction<any>) => {
      return {
        items: [...state.items, ...action.payload.items], // Объединяем массивы
        pagination: action.payload.pagination, // Берем новую пагинацию
      };
    },
    clearMemorial: () => {
      return initialState;
    },
  },
});

export const { setMemorial, addMemorial, clearMemorial } =
  MemorialDataSlice.actions;
export default MemorialDataSlice.reducer;
