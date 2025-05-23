import { configureStore } from "@reduxjs/toolkit";
import { HeroApi } from "../../entities/Hero/api/HeroApi";
import heroDataReducer from "../../entities/Hero/api/HeroSlice";
import { SectionApi } from "../../entities/Section/api/SectionApi";
import sectionNuberReducer from "../../entities/Section/api/SectionSlice";
import { DateApi } from "../../entities/Date/api/DateApi";
import dateDataReducer from "../../entities/Date/api/DateSlice";
import dateVideoReducer from "../../entities/Date/api/VideoSlice";
import modelActiveReducer from "../../entities/Date/api/ModelSlice";
import { MemorialApi } from "../../entities/Memorial/api/MemorialApi";
import dateMemorialReducer from "../../entities/Memorial/api/MemorialSlice";


export const store = configureStore({
  reducer: {
    [HeroApi.reducerPath]: HeroApi.reducer,
    [SectionApi.reducerPath]: SectionApi.reducer,
    [DateApi.reducerPath]: DateApi.reducer,
    [MemorialApi.reducerPath]: MemorialApi.reducer,
    hero: heroDataReducer,
    section: sectionNuberReducer,
    date: dateDataReducer,
    video: dateVideoReducer,
    memorial: dateMemorialReducer,
    model: modelActiveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(HeroApi.middleware)
      .concat(SectionApi.middleware)
      .concat(DateApi.middleware)
      .concat(MemorialApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
