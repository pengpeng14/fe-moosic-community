import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
interface BoxState {
  isOpen: boolean;
}

const initialState: BoxState = {
  isOpen: false,
};

export const createPostBoxSlice = createSlice({
  name: "Box",
  initialState,
  reducers: {
    openCreatePostBox: (state: BoxState) => {
      return { ...state, isOpen: true };
    },
    closeCreatePostBox: (state: BoxState) => {
      return { ...state, isOpen: false };
    },
  },
});

export const { openCreatePostBox, closeCreatePostBox } =
  createPostBoxSlice.actions;

export const selectCreatePostBoxState = (state: RootState) => {
  return state.createPostBox;
};

export default createPostBoxSlice.reducer;
