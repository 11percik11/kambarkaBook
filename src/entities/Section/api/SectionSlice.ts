import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ApiResponse } from "../model/types";

interface HeroDataSliceType {
    sectionNumber: number;
}

const initialState: HeroDataSliceType = {
  sectionNumber: 0,
};

const HeroDataSlice = createSlice({
  name: "sectionNumber",
  initialState,
  reducers: {
    setSection: (_, action: PayloadAction<HeroDataSliceType>) => {
      return action.payload;
    },
  },
});

export const { setSection } = HeroDataSlice.actions;
export default HeroDataSlice.reducer;
