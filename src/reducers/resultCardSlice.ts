import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IResultCard {
  type: "created" | "saved" | "deleted" | "exported";
  isOpen: boolean;
}

const initialState: IResultCard = {
  type: "created",
  isOpen: false,
};

export const resultCardSlice = createSlice({
  name: "resultCard",
  initialState,
  reducers: {
    openResultCard: (
      state: IResultCard,
      payLoad: PayloadAction<"created" | "saved" | "deleted" | "exported">
    ) => {
      return { ...state, type: payLoad.payload, isOpen: true };
    },
    closeResultCard: (state: IResultCard) => {
      return { ...state, isOpen: false };
    },
  },
});

export const { openResultCard, closeResultCard } = resultCardSlice.actions;
export default resultCardSlice.reducer;

export const selectResultCard = (state: RootState) => state.resultCard;
