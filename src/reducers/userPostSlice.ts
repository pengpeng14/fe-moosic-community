import { RootState } from "./../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Page {
  currentPage: number;
  totalPage: number;
}

interface Data {
  post: Page;
  favourite: Page;
  mood: Page;
}

const initialState: Data = {
  post: {
    currentPage: 0,
    totalPage: 0,
  },
  favourite: {
    currentPage: 0,
    totalPage: 0,
  },
  mood: {
    currentPage: 0,
    totalPage: 0,
  },
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUpGetUserPostData: (state: Data, page: PayloadAction<Page>) => {
      return {
        ...state,
        post: {
          currentPage: page.payload.currentPage,
          totalPage: page.payload.totalPage,
        },
      };
    },
    updateGetUserPostData: (state: Data, page: PayloadAction<Page>) => {
      return {
        ...state,
        post: {
          currentPage: page.payload.currentPage,
          totalPage: page.payload.totalPage,
        },
      };
    },
    setUpGetUserFavouritePostData: (state: Data, page: PayloadAction<Page>) => {
      return {
        ...state,
        favourite: {
          currentPage: page.payload.currentPage,
          totalPage: page.payload.totalPage,
        },
      };
    },
    updateGetUserFavourtiePostData: (state: Data) => {
      return {
        ...state,
        favourite: {
          currentPage: state.favourite.currentPage + 1,
          totalPage: state.favourite.totalPage,
        },
      };
    },
  },
});

export const {
  setUpGetUserPostData,
  setUpGetUserFavouritePostData,
  updateGetUserFavourtiePostData,
  updateGetUserPostData,
} = userPostsSlice.actions;

export const selectUserPostData = (state: RootState) => state.userPosts.post;
export const selectUserFavoritePost = (state: RootState) =>
  state.userPosts.favourite;

export default userPostsSlice.reducer;
