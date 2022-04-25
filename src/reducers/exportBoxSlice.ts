import { PostEditData } from "./../interfaces/post/Posts";
import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoxState {
  isOpen: boolean;
  postData: PostEditData;
  url: string;
  message: string;
  img: string;
  toggled: boolean;
}

const initialState: BoxState = {
  isOpen: false,
  postData: {
    data: { id: "", playlists: [], img: "" },
    success: true,
    message: "",
  },
  url: "",
  message: "",
  img: "",
  toggled: false,
};

export const exportPostBoxSlice = createSlice({
  name: "ExportPostBox",
  initialState,
  reducers: {
    openExportPostBox: (
      state: BoxState,
      data: PayloadAction<{ img: string; message: string }>
    ) => {
      console.log(data.payload.img, data.payload.message);
      return {
        ...state,
        isOpen: true,
        img: data.payload.img,
        message: data.payload.message,
        toggled: true,
      };
    },
    setExportPostBoxData: (
      state: BoxState,
      data: PayloadAction<{
        isOpen: boolean;
        postData: PostEditData;
        url: string;
      }>
    ) => {
      return {
        ...state,
        isOpen: data.payload.isOpen,
        postData: data.payload.postData,
        url: data.payload.url,
      };
    },
    closeExportPostBox: (state: BoxState) => {
      return { ...state, ...initialState, toggled: true };
    },
    clearExportPostBox: (state: BoxState) => {
      return { ...state, ...initialState };
    },
  },
});

export const {
  openExportPostBox,
  closeExportPostBox,
  setExportPostBoxData,
  clearExportPostBox,
} = exportPostBoxSlice.actions;

export const selectExportPostBoxState = (state: RootState) => {
  return state.exportPostBox;
};

export default exportPostBoxSlice.reducer;
