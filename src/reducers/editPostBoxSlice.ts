import { PostEditData } from "./../interfaces/post/Posts";
import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoxState {
  isOpen: boolean;
  postData: PostEditData;
  url: string;
  img: string;
  message: string;
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
  img: "",
  message: "",
  toggled: false,
};

export const editPostBoxSlice = createSlice({
  name: "EditPostBox",
  initialState,
  reducers: {
    openEditPostBox: (
      state: BoxState,
      data: PayloadAction<{ img: string; message: string }>
    ) => {
      return {
        ...state,
        isOpen: true,
        img: data.payload.img,
        message: data.payload.message,
        toggled: true,
      };
    },
    setEditPostBoxData: (state: BoxState, data: PayloadAction<BoxState>) => {
      return {
        ...state,
        isOpen: true,
        postData: data.payload.postData,
        url: data.payload.url,
        img: data.payload.img,
        message: data.payload.message,
      };
    },
    closeEditPostBox: (state: BoxState) => {
      return { ...state, ...initialState, toggled: true };
    },
    clearEditPostBox: (state: BoxState) => {
      return { ...state, ...initialState };
    },
  },
});

export const {
  openEditPostBox,
  closeEditPostBox,
  setEditPostBoxData,
  clearEditPostBox,
} = editPostBoxSlice.actions;

export const selectEditPostBoxState = (state: RootState) => {
  return state.editPostBox;
};

export default editPostBoxSlice.reducer;
