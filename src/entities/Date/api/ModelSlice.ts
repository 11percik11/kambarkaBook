import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Model {
    active: boolean;
}

const initialState: Model = {
  active: true,
};

const ModelDataSlice = createSlice({
  name: "modelActive",
  initialState,
  reducers: {
    modelActive: (_, action: PayloadAction<Model>) => {
      return action.payload;
    },
    modelOff: () => {
      return initialState;
    },
  },
});

export const { modelActive, modelOff } = ModelDataSlice.actions;
export default ModelDataSlice.reducer;
