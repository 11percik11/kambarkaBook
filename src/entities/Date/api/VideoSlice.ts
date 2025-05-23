import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../model/types";

interface Video {
    video: string;
    title: string;
    date: string;
}

const initialState: Video = {
  video: '',
  title: '',
  date: '',
};

const VideoDataSlice = createSlice({
  name: "videoData",
  initialState,
  reducers: {
    setVideo: (_, action: PayloadAction<Video>) => {
      return action.payload;
    },
    claerVideo: () => {
      return initialState;
    },
  },
});

export const { setVideo, claerVideo } = VideoDataSlice.actions;
export default VideoDataSlice.reducer;
