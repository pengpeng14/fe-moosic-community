import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
interface BoxState {
  isOpen: boolean;
}

const initialState: BoxState = {
  isOpen: false,
};

export const spotifyDialogSlice = createSlice({
  name: "Box",
  initialState,
  reducers: {
    openSpotifyDialog: (state: BoxState) => {
      console.log({ ...state, isOpen: true });
      return { ...state, isOpen: true };
    },
    closeSpotifyDialog: (state: BoxState) => {
      return { ...state, isOpen: false };
    },
  },
});

export const { openSpotifyDialog, closeSpotifyDialog } =
  spotifyDialogSlice.actions;
export const selectSpotifyDialogState = (state: RootState) => {
  return state.spotifyDialog;
};

export default spotifyDialogSlice.reducer;
